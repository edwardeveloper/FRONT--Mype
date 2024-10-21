import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  // constructor() { }
  capituloGlobal: string = '';
  idContGlobal: any = 0;

  setCapituloGlobal(data: string): void {
    // this.capituloGlobal = data;
    localStorage.setItem(this.capituloGlobal, data);
  }

  getCapituloGlobal(): string | null {
    return localStorage.getItem(this.capituloGlobal);
  //  return this.capituloGlobal
  }

  setIdContGlobal(data: any): void {
    // this.capituloGlobal = data;
    localStorage.setItem(this.idContGlobal, data);
  }

  getIdContGlobal(): any | null {
    return localStorage.getItem(this.idContGlobal);
  //  return this.capituloGlobal
  }




  // private setToken(token: string): void {
  //   localStorage.setItem(this.tokenKey, token);
  // }

  // private getToken(): string | null {
  //   if(typeof window !== 'undefined'){
  //     return localStorage.getItem(this.tokenKey);
  //   }else {
  //     return null;
  //   }
  // }


}
