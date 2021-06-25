export interface Letra {
  id: number;
  cliente: string;
  f_inicial: Date;
  f_final: Date;
  f_descuento: Date;
  v_nominal: number;
  t_tasa: string;
  tasa: number;
  retenciones: number;
  comentario: string;
}
