import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { EstadisticasPreguntasPorMypeInterface } from '../../business/reporte/EstadisticasPreguntasPorMype';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // auth
  private LOGIN_URL = 'http://localhost:8080/api/v1/auth/login';
  private REGISTER_URL = 'http://localhost:8080/api/v1/auth/register';
  private REFRESH_URL = 'http://localhost:8080/api/v1/auth/refresh';

  // preguntas
  private PREGUNTAS_URL = 'http://localhost:8080/preguntas/list';
  private CUESTIONARIO_URL = 'http://localhost:8080/cuestionario/list';
  private CUESTIONARIOTOTAL_URL = 'http://localhost:8080/cuestionario/informe/';
  private HEALTH_URL = 'http://localhost:8080/api/v1/auth/health';
  private PREGUNTAXCAPITULO_URL = 'http://localhost:8080/preguntas/capitulo';
  private REGISTRARCUESTIONARIO_URL = 'http://localhost:8080/cuestionario/';
  private PYMECORREO_URL = 'http://localhost:8080/mype/mail/';
  private CUESTIONARIOLIST_URL = 'http://localhost:8080/cuestionario/list/';
  private CUESTIONARIOREPORTE_URL = 'http://localhost:8080/cuestionario/reporte/';
  private CUESTIONARIOREPORTESECCION_URL = 'http://localhost:8080/cuestionario/reporteseccion/';
  private CUESTIONARIOREPORTESECCIONITEM_URL = 'http://localhost:8080/cuestionario/reporte/seccion/item/';
  private PYME_URL = 'http://localhost:8080/mype/';
  private SECCIONRESPORTE_URL = 'http://localhost:8080/gemini/reporte/';
  private SECCION_RESPORTE_URL = 'http://localhost:8080/reporte/';
  private EstadisticasPreguntasPorMypeController_URL = 'http://localhost:8080/gemini/reporte/estadisticas/preguntas/mype/';

  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private idUserGoblal = 'idUser';
  private idMypeGoblal = 'idMype';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(correo: string, password: string, rol: string): Observable<any>{
    return this.httpClient.post<any>(this.LOGIN_URL, {correo, password, rol}).pipe(
      tap(response => {
        if(response.token){
          // console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken();
        }
      })
    )
  }

  register(correo:string, password:string, rol:string, razonsocial:string, nit:number, tipoempresa:string, sector:string, telefono:number, direccion:string): Observable<any>{
    // console.log("correo: "+correo,"pass: " +password, "rol: "+rol,"razon: "+ razonsocial, "nit: "+nit, "tipo: "+tipoempresa, "sector: "+sector,"telefono: "+ telefono);
    return this.httpClient.post<any>(this.REGISTER_URL, {correo, password, rol, razonsocial, nit, tipoempresa, sector, telefono,direccion}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken();
        }
      })
    );
  }

  getPreguntas(): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.PREGUNTAS_URL, {headers}).pipe(response => response);
  }


  getNumberPreguntasCuetionario(): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.CUESTIONARIO_URL, {headers}).pipe(response => response);
  }

  getPreguntaCuestionarioTotal(pyme: number): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.CUESTIONARIOTOTAL_URL+pyme, {headers}).pipe(response => response);
  }

  health(): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.HEALTH_URL,{headers}).pipe(response => response);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else {
      return null;
    }
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  private getRefreshToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.refreshTokenKey);
    }else {
      return null;
    }
  }

  refreshToken(): Observable<any>{
    const refreshToken  = this.getRefreshToken()
    return this.httpClient.post<any>(this.REFRESH_URL, {refreshToken}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken()
        }
      })
    )
  }

  autoRefreshToken(): void {
    const token = this.getToken();
    if(!token){
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    const timeout = exp - Date.now() - (60 * 1000);

    setTimeout(() => {
      this.refreshToken().subscribe()
    }, timeout);

  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  isSetUser(): void{
    const token = this.getToken();
    if(token){
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = payload.sub;
      // console.log(payload.sub)
      localStorage.setItem(this.idUserGoblal, user);
    }
  }

  isGetUser(): string | null {
     return localStorage.getItem(this.idUserGoblal);
  }

  isSetMype(mype: string): void{
      localStorage.setItem(this.idMypeGoblal, mype);
  }

  isGetMype(): number {
     return Number(localStorage.getItem(this.idMypeGoblal));
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }

  getPreguntaByCapituloService(capitulo: string | null): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(this.PREGUNTAXCAPITULO_URL,capitulo,{headers}).pipe(response => response);
  }

  guardarCuestionarioService(cuestionario: any[]): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<any>(this.REGISTRARCUESTIONARIO_URL,cuestionario,{headers}).pipe(response => response);
  }

  getMypeCorreoService(correo: string | null): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.PYMECORREO_URL+correo,{headers}).pipe(response => response);
  }

  getCuestionarioService(pregunta: number): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.CUESTIONARIOLIST_URL+pregunta,{headers}).pipe(response => response);
  }

  getCuestionarioReporteService(pregunta: number): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.CUESTIONARIOREPORTE_URL+pregunta,{headers}).pipe(response => response);
  }

  getCuestionarioSeccionService(pyme: number): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.CUESTIONARIOREPORTESECCION_URL+pyme,{headers}).pipe(response => response);
  }

  getCuestionarioSeccionItemService(pyme: number): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.CUESTIONARIOREPORTESECCIONITEM_URL+pyme,{headers}).pipe(response => response);
  }

  getMypeService(pyme: number): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.PYME_URL+pyme,{headers}).pipe(response => response);
  }

  getReporteSeccion(seccion: string):  any{//Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = {
      seccion: seccion,
      mype: this.idMypeGoblal
    };
    return data.seccion
    // return this.httpClient.post<any>(this.SECCIONRESPORTE_URL,data,{headers}).pipe(response => response);
  }

  getReporteMype(mype: number): Observable<any>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return data.seccion
    return this.httpClient.get<any>(this.SECCION_RESPORTE_URL+mype,{headers}).pipe(response => response);
  }

  getEstadisticasPreguntasPorMypeControllerService(mype: number): Observable<EstadisticasPreguntasPorMypeInterface[]>{
    const token = this.getToken();  // Obtén el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return data.seccion
    return this.httpClient.get<any>(this.EstadisticasPreguntasPorMypeController_URL+mype,{headers}).pipe(response => response);
  }
}
