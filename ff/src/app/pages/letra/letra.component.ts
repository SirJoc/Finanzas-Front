import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LetrasApiService } from '../../services/letras-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import {Letra} from "../../models/letra";
import {Tasa} from "../../models/tasa";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.css']
})
export class LetraComponent implements OnInit {
  @ViewChild('letraForm', { static: false })
  letraForm!: NgForm;
  isEditMode = false;
  letraId!: number;
  letraData: Letra = {} as Letra;
  t_tasas: Tasa[] = [
    {value: 'Efectiva', viewValue: 'Efectiva'},
    {value: 'Nominal', viewValue: 'Nominal'}
  ];

  defaultLetra: Letra = { id: 0, cliente: '', f_inicial: new Date(), f_final: new Date(), f_descuento: new Date(), v_nominal: 0,
    t_tasa: '', tasa: 0, retenciones: 0, comentario: ''};
  constructor(private datePipe: DatePipe, private letrasApi: LetrasApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.letraId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveLetra(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetLetra();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToLetras(): void {
    this.router.navigate(['/letras'])
      .then(() => console.log(this.route.url) );
  }
  resetLetra(): void {
    this.letraData = this.defaultLetra;
  }
  retrieveLetra(id: number): void {
    this.letrasApi.getLetraById(id)
      .subscribe((response: Letra) => {
        this.letraData = {} as Letra;
        this.letraData = _.cloneDeep(response);
        console.log(response);
        console.log(this.letraData);
      });
  }
  addLetra(): void {
    const newLetra = {cliente: this.letraData.cliente, f_inicial: this.letraData.f_inicial,
      f_final: this.letraData.f_final,f_descuento: this.letraData.f_descuento, v_nominal: this.letraData.v_nominal,
      t_tasa: this.letraData.t_tasa, tasa: this.letraData.tasa/100, retenciones: this.letraData.retenciones,
      comentario: this.letraData.comentario};
    this.letrasApi.addLetra(newLetra)
      .subscribe(() => {
        this.navigateToLetras();
      });
  }
  cancelEdit(): void {
    this.navigateToLetras();
  }

  updateLetra(): void {
    this.letrasApi.updateLetra(this.letraData.id, this.letraData as Letra)
      .subscribe(response => {
        console.log(response);
      });
    this.navigateToLetras();
  }
  onSubmit(): void {
    if (this.letraForm.form.valid) {
      console.log(this.letraData);
      if (this.isEditMode) {
        this.updateLetra();
      } else {
        this.addLetra();
      }
    } else {
      console.log('Invalid Data');
    }
  }

}
