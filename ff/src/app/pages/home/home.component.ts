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
import * as moment from 'moment';

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
  isInfoMode = false;
  isFiltering = false;
  TEA_SC: number = 0;
  Numero_Dias: number = 0;
  Tasa_EfectD: number = 0;
  Tasa_descontada_Dias: number = 0;
  Descuento_D: number = 0;
  Reten: number = 0;
  Costes_Iniciales_T: number = 0;
  Valor_neto: number = 0;
  Valor_Total_Rec: number = 0;
  Costes_Finales_T: number = 0;
  Valor_Total_En: number = 0;
  TCEA: number = 0;
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

  infoItem(element: any): void {
    console.log(element);
    this.letraData = _.cloneDeep(element);
    this.isInfoMode = true;
    this.TEA_SC = this.letraData.tasa;
    var f1 = moment(this.letraData.f_final)
    var f2 = moment(this.letraData.f_descuento)
    this.Numero_Dias = f1.diff(f2, 'days');
    this.Tasa_EfectD = Math.pow((1+this.letraData.tasa),(this.Numero_Dias/360)) - 1;
    this.Tasa_descontada_Dias = this.letraData.tasa/(1+this.letraData.tasa);
    this.Descuento_D = this.letraData.v_nominal * this.Tasa_descontada_Dias;
    this.Reten = this.letraData.retenciones;
    this.Valor_neto = this.letraData.v_nominal - (this.letraData.v_nominal*this.Tasa_descontada_Dias);
    this.Valor_Total_Rec = this.Valor_neto - this.Reten;
    this.Valor_Total_En = this.letraData.v_nominal - this.Reten;
    this.TCEA = Math.pow((this.Valor_Total_En/this.Valor_Total_Rec), (360/this.Numero_Dias)) -1;
    console.log(this.Tasa_descontada_Dias)
    console.log(this.Valor_neto, this.Reten)
    console.log(this.Valor_Total_Rec, this.Valor_Total_En);
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

  getDiff(item: any): void {
    var f1 = moment(item.f_final)
    var f2 = moment(item.f_descuento)

    console.log(f1.diff(f2, 'days'));
  }

}

