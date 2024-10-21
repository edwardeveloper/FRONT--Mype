import { Injectable } from '@angular/core';

interface Report {
  name:string,
  series:{
    name: string,
    value: number
  }[]
}

@Injectable({
  providedIn: 'root'
})

export class GraphService {

  private report: Report[] = [
    {
      "name": "Cumple",
      "series": [
        {
          "name": "Planificación estratégica",
          "value": 100
        },
        {
          "name": "Soporte",
          "value": 100
        },
        {
          "name": "Operacion",
          "value": 100
        },
        {
          "name": "Seguimiento y medicion",
          "value": 100
        },
        {
          "name": "Mejora",
          "value": 100
        }
      ]
    },
  ];

  // private report: Report[] = [
  //   {
  //     "name": "Cumple",
  //     "series": [
  //       {
  //         "name": "Planificación estratégica",
  //         "value": 100
  //       },
  //       {
  //         "name": "Soporte",
  //         "value": 100
  //       },
  //       {
  //         "name": "Operacion",
  //         "value": 100
  //       },
  //       {
  //         "name": "Seguimiento y medicion",
  //         "value": 100
  //       },
  //       {
  //         "name": "Mejora",
  //         "value": 100
  //       }
  //     ]
  //   },
  //   {
  //     "name": "Cumple Parcialmente",
  //     "series": [
  //       {
  //         "name": "Planificación estratégica",
  //         "value": 100
  //       },
  //       {
  //         "name": "Soporte",
  //         "value": 100
  //       },
  //       {
  //         "name": "Operacion",
  //         "value": 100
  //       },
  //       {
  //         "name": "Seguimiento y medicion",
  //         "value": 100
  //       },
  //       {
  //         "name": "Mejora",
  //         "value": 100
  //       }
  //     ]
  //   },
  //   {
  //     "name": "No Cumple",
  //     "series": [
  //       {
  //         "name": "Planificación estratégica",
  //         "value": 100
  //       },
  //       {
  //         "name": "Soporte",
  //         "value": 100
  //       },
  //       {
  //         "name": "Operacion",
  //         "value": 100
  //       },
  //       {
  //         "name": "Seguimiento y medicion",
  //         "value": 100
  //       },
  //       {
  //         "name": "Mejora",
  //         "value": 100
  //       }
  //     ]
  //   },
  // ];

  graphSetData(data:any[]){
    // console.log(this.report)
    let contCumplimiento = 0
      let contCapitulos = 0
      data.forEach(([capitulo, totalPreguntas, completadas, c,cp,nc]) => {
          this.report[contCumplimiento].series[contCapitulos].value = (c/totalPreguntas)*100-((c/totalPreguntas)*100)%1;
          // contCumplimiento++
          // this.report[contCumplimiento].series[contCapitulos].value = (cp/totalPreguntas)*100-((cp/totalPreguntas)*100)%1;
          // contCumplimiento++
          // this.report[contCumplimiento].series[contCapitulos].value = (nc/totalPreguntas)*100-((nc/totalPreguntas)*100)%1;
          contCumplimiento=0
          contCapitulos++
      });
      // console.log(this.report)
  }

  get graphData() {
    return this.report;
  }

}
