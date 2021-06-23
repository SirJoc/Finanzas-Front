import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import * as _ from 'lodash';
import {Letra} from "../../models/letra";
import {LetrasApiService} from "../../services/letras-api.service";
import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('letraForm', { static: false }) letraForm!: NgForm;
  letraData: Letra;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'cliente', 'f_inicial', 'f_final', 'f_descuento', 'v_nominal', 't_tasa', 'tasa', 'retenciones', 'descuento', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isEditMode = false;
  isFiltering = false;

  constructor(private datePipe: DatePipe, private letrasApi: LetrasApiService, private router: Router) {
    this.letraData = {} as Letra;
  }

  ngOnInit(): void {

    this.getAllLetras();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isFiltering = !!filterValue;
  }
  getAllLetras(): void {
    this.letrasApi.getAllLetras().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  editItem(element: any): void {
    console.log(element);
    this.letraData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.letraForm.resetForm();
  }
  deleteItem(id: number): void {
    this.letrasApi.deleteLetra(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addLetra(): void {
    const newLetra = {cliente: this.letraData.cliente, f_inicial: this.datePipe.transform(this.letraData.f_inicial, "dd-MM-yyyy" ),
      f_final: this.letraData.f_final,f_descuento: this.letraData.f_descuento, v_nominal: this.letraData.v_nominal,
      t_tasa: this.letraData.t_tasa, tasa: this.letraData.tasa, retenciones: this.letraData.retenciones,
      d: this.letraData.d, descuento: this.letraData.descuento, comentario: this.letraData.comentario};

    this.letrasApi.addLetra(newLetra).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateLetra(): void {
    this.letrasApi.updateLetra(this.letraData.id, this.letraData)
      .subscribe((response: Letra) => {
        this.dataSource.data = this.dataSource.data.map((o: any) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }

  onSubmit(): void {
    if (this.letraForm.form.valid) {
      if (this.isEditMode) {
        this.updateLetra();
      } else {
        this.addLetra();
      }
    } else {
      console.log('Invalid Data');
    }
  }

  navigateToAddLetra(): void {
    this.router.navigate(['/letras/new'])
      .then(() => console.log('Navigated to New Letra'));
  }

  navigateToEditLetra(letraId: number): void {
    this.router.navigate([`/letras/${letraId}`])
      .then(() => console.log('Navigated to Edit Letra'));
  }

  refresh(): void {
    console.log('about to reload');
    this.getAllLetras();
  }
}

