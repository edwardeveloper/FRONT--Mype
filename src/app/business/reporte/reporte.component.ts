import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NgFor } from '@angular/common';
import {ReportInterface} from './dataReporte'
import { SeccionInterface } from './seccionReporte';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { GraphService } from '../resultados/graph.service';
import { MypeInterface } from './mypeData';
import { EstadisticasPreguntasPorMypeInterface } from './EstadisticasPreguntasPorMype';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [NgFor,NgxChartsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})

export default class ReporteComponent {

  multi: ReportInterface[] = [{
    "capitulo": 'string',
    "cumple": 0,
    "cumpeParcialmente": 0,
    "nocumple": 0
  }];

  razonSocial: string = ''
  descripcionEmpresa: string = ''
  reportTemp: any[] = []
  reportTempComplete: any[] = []
  reportMypeTemp: any[] = []
  report: any[] = []
  reportEstadisticas: any[] = []
  capitulo: any[] = ["3. Planificación estratégica","4. Soporte","5. Operación","6. Seguimiento y medición","7. Mejora"]

  porcentajeProcesosSeleccion: number = 0
  porcentajeTalentoHumano: number = 0
  porcentajeRecursosFisicos: number = 0
  porcentajeInformacion: number = 0
  primerCompras: number = 0
  porcentajeFinanciera: number = 0
  porcentajeComercial: number = 0
  porcentajePlanificacionProcesos: number = 0
  porcentajeDiseñoDesarrolloProductosServicios: number = 0
  porcentajeControlSalidaConforme: number = 0
  porcentajeSatisfaccionCliente: number = 0
  porcentajeAutoevaluacion: number = 0
  porcentajeAccionesCorrectivas: number = 0

  view: [number, number] = [1000, 600];
  graph: any[] = []

  seccionBuscada: any[] = []

    // options
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Capitulo';
    yAxisLabel: string = 'Porcentaje 0-100%';
    autoScale:boolean = true
    yAxisMinScale: number = 100;
    rangeFillOpacity: number = 0;

    colorScheme: Color = {
      name: 'myScheme',
      group: ScaleType.Ordinal,
      selectable: false,
      domain: ['#1ee30e', '#abc8f7', '#f089ab']
    };

  constructor(private authService: AuthService, private graphService: GraphService,private cdr: ChangeDetectorRef){
    // Object.assign(this.graph, { multi })
  }

  ngOnInit(): void {

    this.authService.getCuestionarioSeccionService(this.authService.isGetMype()).subscribe((data: any[])=>{
      this.reportTemp = data
    })

    this.authService.getCuestionarioSeccionItemService(this.authService.isGetMype()).subscribe((data: any[])=>{
      this.reportTempComplete = data
      console.log(data)
    })

    this.authService.getReporteMype(this.authService.isGetMype()).subscribe((data: any[])=>{
      this.reportMypeTemp = data
    })

    this.authService.getCuestionarioReporteService(this.authService.isGetMype()).subscribe((data: any[])=>{
      this.report = data;
      // console.log(data)
      this.graphService.graphSetData(data)
      this.graphService.graphData
      this.cdr.detectChanges();

    });

    this.authService.getMypeService(this.authService.isGetMype()).subscribe((data: MypeInterface)=>{
      this.razonSocial = data.mrazonSocial
      this.descripcionEmpresa = data.mdescripcionEmpresa
    })

    this.authService.getEstadisticasPreguntasPorMypeControllerService(this.authService.isGetMype()).subscribe((data: any[])=>{
      this.reportEstadisticas = data
      console.log( data)
    })

  }

  getSeccion(capitulo:string): any{
    let seccion = ''
    // console.log(this.reportTemp)
    // this.seccionBuscada =  this.reportTemp.find(obj => obj[0] === capitulo && obj[1].length >5);
    // console.log(this.seccionBuscada)
    // seccion += seccionBuscada[1]+": "+this.getReporteSeccion(seccionBuscada[1])
      this.reportTemp.forEach(([cap, secc, item, totalPreguntas, completadas, c,cp,nc]) => {
        if(capitulo === cap && secc.length >5){
          seccion += "/"+secc
        }
        if(capitulo === cap && secc.length < 5){
          seccion = cap
        }
      })
    return seccion;
  }

  getReporteSeccion(seccion: string){
    let seccionReporte = ''
    let arrayElementos = seccion.split("/")
    let i = 0
    arrayElementos.forEach(elemento => {
      this.reportMypeTemp.forEach(repo => {
        if(repo.rseccion === elemento){
          seccionReporte += elemento+": "+repo.rrseccion
        }
      })

    });

    return seccionReporte
  }

  onSelect(event: any) {
    // console.log(event);
  }

  get graphData(){
    return this.graphService.graphData
  }

   formateaValor(arrayReport: any[]) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    let result: number = 0
    let preguntas = 0
    let cumple = 0
    arrayReport.forEach(element => {
      preguntas += element[1]
      cumple += element[3]
    });
    result = cumple/preguntas*100

    return isNaN(result) ? result : result.toFixed(0);
  }

  formatearValorIndividual(result: number){
    return isNaN(result) ? result : result.toFixed(0);
  }

}
