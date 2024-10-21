import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {
  razonsocial: string = '';
  nit: number = 0;
  password: string = '';
  tipoempresa: string = '';
  sector: string = '';
  direccion: string = '';
  telefono: number = 0;
  correo: string = '';
  confirmpassword: string = '';

  rol: string = 'MYPE';

  constructor(private authService: AuthService, private router: Router){}

  register(): void {
    // console.log("aqui va 1");
    // console.log("aqui va 2:::"+this.telefono +" pass: "+this.sector);
    this.authService.register(this.correo, this.password, this.rol, this.razonsocial, this.nit, this.tipoempresa, this.sector,this.telefono, this.direccion).subscribe({
      next: (response)=> {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;

    // console.log("aqui va 3:::"+payload.role);
        if(role === 'admin') {
          this.router.navigate(['/dashboard'])
        }else {
          this.router.navigate(['/cuestionario'])
        }
      },
      error: (err) => console.error('register failed', err)
    })
  }
}
