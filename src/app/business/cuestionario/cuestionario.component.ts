import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { QuestionsService } from '../../core/services/questions.service';
import { QuestionsCount } from '../../interface/questions.interface';
import { Capitulo } from '../../interface/capitulo.interface';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { CommonModule, NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-cuestionario',
  standalone: true,
  imports: [NgFor,NgStyle],
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export default class cuestionarioComponent {

  preguntas: any[] = [];
  conteo: { [key: string]: number } = {};
  valorActual: string = '';
  cont : number = -1;
  tamano : number = 0;
  idSeccion : number = 0;

  constructor(private questionsService: QuestionsService,private authService: AuthService, private router: Router){}

    ngOnInit(): void {
      // this.authService.health().subscribe((data: any[]) => {
      //   console.log(data)
      // })
      // this.authService.getNumberPreguntasCuetionario().subscribe((data: any[]) => {});

      this.authService.getPreguntaCuestionarioTotal(this.authService.isGetMype()).subscribe((data: any[]) => {
        console.log(data)
        this.preguntas = data;
        console.log(this.preguntas[0])
        // this.capitulo = Array.from(new Set(data.map(item => item.pcapitulo))).map(title => ({ title }));
        // data.forEach((value) => {

          // this.tamano+=1;
          // console.log(this.c+" tamaño: " +data.length);
          // if(this.cont==-1){
          //   this.valorActual=value.pcapitulo;
          //   this.cont = 0;
          // }
          // // if(this.cont==0){this.valorActual=value.pcapitulo;}
          // if(this.valorActual==value.pcapitulo){
          //   this.cont+=1;
          // }else{
          //   this.idSeccion+=1;
          //   this.preguntas.push({
          //     id: this.idSeccion,
          //     title: this.valorActual,
          //     count: this.cont
          //   });
          //   this.cont = 1;
          //   this.valorActual=value.pcapitulo;
          // }
          // if(this.tamano == data.length){
          //   this.idSeccion+=1;
          //   this.preguntas.push({
          //     id: this.idSeccion,
          //     title: this.valorActual,
          //     count: this.cont
          //   });
          // }
            // });
            // console.log(this.preguntas);
        })
    }

    redirigirQuestions(name: string): void {
      this.questionsService.setCapituloGlobal(name);
      this.router.navigate(['/questions']);
    }

    getWidth(width: number): string {
      return `${width}%`;
    }

    }
