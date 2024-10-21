import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule,Color, ScaleType } from '@swimlane/ngx-charts';
import { GraphService } from './graph.service';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [ CommonModule, NgxChartsModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export default class resultadosComponent {

    view: [number, number] = [1000, 600];
    report: any[] = []
    graph: any[] = []

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


  constructor(private authService: AuthService, private graphService: GraphService,private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.authService.getCuestionarioReporteService(this.authService.isGetMype()).subscribe((data: any[])=>{
      this.report = data;
      this.graphService.graphSetData(data)
      this.graphService.graphData
      this.cdr.detectChanges();
    });
  }

  onSelect(event: any) {
    console.log(event);
  }

  get graphData(){
    return this.graphService.graphData
  }

}
