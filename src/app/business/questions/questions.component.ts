import { Component,signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { QuestionsService } from '../../core/services/questions.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { stdin } from 'process';
import { CuestionarioInterface } from '../../interface/cuestionario.interface';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export default class QuestionsComponent {
  capituloName: string | null = ''
  idCont : number = 0
  idMype : number = 0
  preguntas: any[] =[]
  cuestionario: CuestionarioInterface[] = []
  cuestionarioTemp: CuestionarioInterface[] = []
  idPregunta: string = ''

  constructor(private questionsService: QuestionsService,private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    // obtengo el nombre del capitulo
    this.capituloName = this.questionsService.getCapituloGlobal();
    // obtengo las preguntas para dicho titulo y guardo en localstorage el id de la pregunta
    this.authService.getPreguntaByCapituloService(this.capituloName).subscribe((data1: any[]) => {
      this.preguntas = data1;
      // id de la pregunta
      this.questionsService.setIdContGlobal(data1[this.idCont].idpregunta);
        this.authService.getMypeCorreoService(this.authService.isGetUser()).subscribe((data2: any) => {
          // id de la Mype
          this.authService.isSetMype(data2.idmype);
          // consultar cuestionario para la empresa actual
          this.authService.getCuestionarioService(this.authService.isGetMype()).subscribe((data3:CuestionarioInterface[]) => {
            // asignar cuestionario local
            this.cuestionario = data3;
            console.log(this.cuestionario);
            this.form.set(new FormGroup(
              {
                pregunta_idpregunta:new FormControl(this.preguntas[this.idCont].idpregunta),
                mype_idmype:new FormControl(this.authService.isGetMype()),
                pprespuestas:new FormControl('222',Validators.required),
                ppnotas : new FormControl(''),
                ppobservaciones: new FormControl('')
              }
            ));

            for (const item of this.cuestionario) {
              // obtener los resultados de la pregunta actual para pintarlos en pantalla
              if (item.pregunta_idpregunta === this.preguntas[this.idCont].idpregunta) {
                this.cuestionarioTemp.push(
                  item
                );
                this.form.set(new FormGroup(
                  {
                    pregunta_idpregunta:new FormControl(this.preguntas[this.idCont].idpregunta),
                    mype_idmype:new FormControl(this.cuestionarioTemp[0].mype_idmype),
                    pprespuestas:new FormControl(this.cuestionarioTemp[0].pprespuestas,Validators.required),
                    ppnotas : new FormControl(this.cuestionarioTemp[0].ppnotas),
                    ppobservaciones: new FormControl(this.cuestionarioTemp[0].ppobservaciones)
                  }
                ));
                break; // Detiene el bucle al encontrar la coincidencia
              }
            }
            // this.cdr.detectChanges()

          })

        });
    });

  }

  form = signal<FormGroup>(
    new FormGroup(
      {
        pregunta_idpregunta:new FormControl(this.questionsService.getIdContGlobal()),
        mype_idmype:new FormControl(this.authService.isGetMype()),
        pprespuestas:new FormControl('1111',Validators.required),
        ppnotas : new FormControl(''),
        ppobservaciones: new FormControl('')
      }
    )
  );

  onSubmit(){
      if (this.form().valid) {
        console.warn(this.form().value)
          const datos = this.form().value;
          // guardar cuestionario
          console.log("antes de guardar");
          this.authService.guardarCuestionarioService(datos).subscribe((data1: CuestionarioInterface[]) => {
            console.log("2");
            // actualizar contador y idpregunta
            this.idCont++;
            console.log("contador:::"+this.idCont);
            this.questionsService.setIdContGlobal(this.preguntas[this.idCont].idpregunta);
            //obtener los cuestionarios que tenga la empresa actual
            console.log("antes2");
            this.authService.getCuestionarioService(this.authService.isGetMype()).subscribe((data2:CuestionarioInterface[]) => {
              console.log("despues3");
              // asignar cuestionario local
              this.cuestionario = data2;
              // actualizar por defecto el formulario
              for (const item of this.cuestionario) {
                // obtener los resultados de la pregunta actual para pintarlos en pantalla
                if (item.pregunta_idpregunta === this.preguntas[this.idCont].idpregunta) {
                  this.cuestionarioTemp.push(
                    item
                  );
                  break; // Detiene el bucle al encontrar la coincidencia
                }
              }

              if(this.cuestionarioTemp.length > 0){
                this.form.set(new FormGroup(
                  {
                    pregunta_idpregunta:new FormControl(this.cuestionarioTemp[0].pregunta_idpregunta),
                    mype_idmype:new FormControl(this.cuestionarioTemp[0].mype_idmype),
                    pprespuestas:new FormControl(this.cuestionarioTemp[0].pprespuestas,Validators.required),
                    ppnotas : new FormControl(this.cuestionarioTemp[0].ppnotas),
                    ppobservaciones: new FormControl(this.cuestionarioTemp[0].ppobservaciones)
                  }
                ));
                this.cuestionarioTemp = []
              }else{
                this.form.set(new FormGroup(
                  {
                    pregunta_idpregunta:new FormControl(this.preguntas[this.idCont].idpregunta),
                    mype_idmype:new FormControl(this.authService.isGetMype()),
                    pprespuestas:new FormControl('',Validators.required),
                    ppnotas : new FormControl(''),
                    ppobservaciones: new FormControl('')
                  }
                ));
              }

            });
        });
      }
      console.warn(this.form().value);
  }

  next(){
    // console.log(this.preguntas.length)
    if(this.idCont<this.preguntas.length-1){
      this.idCont++;
      this.questionsService.setIdContGlobal(this.preguntas[this.idCont].idpregunta);

      for (const item of this.cuestionario) {
        // obtener los resultados de la pregunta actual para pintarlos en pantalla
        if (item.pregunta_idpregunta === this.preguntas[this.idCont].idpregunta) {
          this.cuestionarioTemp.push(
            item
          );
          break; // Detiene el bucle al encontrar la coincidencia
        }
      }

      if(this.cuestionarioTemp.length > 0){
        this.form.set(new FormGroup(
          {
            pregunta_idpregunta:new FormControl(this.cuestionarioTemp[0].pregunta_idpregunta),
            mype_idmype:new FormControl(this.cuestionarioTemp[0].mype_idmype),
            pprespuestas:new FormControl(this.cuestionarioTemp[0].pprespuestas,Validators.required),
            ppnotas : new FormControl(this.cuestionarioTemp[0].ppnotas),
            ppobservaciones: new FormControl(this.cuestionarioTemp[0].ppobservaciones)
          }
        ));
        this.cuestionarioTemp = []
      }else{
        this.form.set(new FormGroup(
          {
            pregunta_idpregunta:new FormControl(this.preguntas[this.idCont].idpregunta),
            mype_idmype:new FormControl(this.authService.isGetMype()),
            pprespuestas:new FormControl('',Validators.required),
            ppnotas : new FormControl(''),
            ppobservaciones: new FormControl('')
          }
        ));
      }

    }
  }

  previous(){
    if(this.idCont>=1){
      this.idCont--;
      this.questionsService.setIdContGlobal(this.preguntas[this.idCont].idpregunta);

      for (const item of this.cuestionario) {
        // obtener los resultados de la pregunta actual para pintarlos en pantalla
        if (item.pregunta_idpregunta === this.preguntas[this.idCont].idpregunta) {
          this.cuestionarioTemp.push(
            item
          );
          break; // Detiene el bucle al encontrar la coincidencia
        }
      }

      if(this.cuestionarioTemp.length > 0){
        this.form.set(new FormGroup(
          {
            pregunta_idpregunta:new FormControl(this.cuestionarioTemp[0].pregunta_idpregunta),
            mype_idmype:new FormControl(this.cuestionarioTemp[0].mype_idmype),
            pprespuestas:new FormControl(this.cuestionarioTemp[0].pprespuestas,Validators.required),
            ppnotas : new FormControl(this.cuestionarioTemp[0].ppnotas),
            ppobservaciones: new FormControl(this.cuestionarioTemp[0].ppobservaciones)
          }
        ));
        this.cuestionarioTemp = []
      }else{
        this.form.set(new FormGroup(
          {
            pregunta_idpregunta:new FormControl(this.preguntas[this.idCont].idpregunta),
            mype_idmype:new FormControl(this.authService.isGetMype()),
            pprespuestas:new FormControl('',Validators.required),
            ppnotas : new FormControl(''),
            ppobservaciones: new FormControl('')
          }
        ));
      }

    }
  }






}
