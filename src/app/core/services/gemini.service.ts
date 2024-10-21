// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class GeminiService {
//   private apiUrl = 'https://vertexai.googleapis.com/v1/projects/sound-utility-434722-i8/locations/global/models/gemini-1.5-flash-001:generateText';
//   private apiKey = 'AIzaSyC60IkPIMIIe2_qBu_0OCcS7pfu8mzjSoc';

//   constructor(private http: HttpClient) {}

//   generateText(prompt: string) {
//     const headers = new HttpHeaders({
//       'Authorization': 'Bearer ' + this.apiKey,
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': 'http://localhost:4200',
//       'Access-Control-Allow-Methods': 'POST',
//       'Access-Control-Allow-Headers': 'Content-Type'
//     });

//     const body = {
//       prompt: prompt,
//       // Otros parámetros de configuración
//     };

//     return this.http.post<any>(this.apiUrl, body, { headers }).pipe(response => response);
//   }
// }
