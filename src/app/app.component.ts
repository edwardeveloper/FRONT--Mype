import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CuestionarioComponent } from './business/component/cuestionario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'NTC 6001:2017';

  constructor( private authService: AuthService) {

  }

  ngOnInit(): void {
   if(this.authService.isAuthenticated()) {
    this.authService.autoRefreshToken()
   }
  }
}
