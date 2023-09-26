import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  login(endpoint: string,payload: {}){
   return this.http.post(`${this.baseUrl}${endpoint}`,payload).pipe(
    map((res: any) => {
      return res
    })
   )
  }
  validateUser(endpoint:string,id:string){
    return this.http.post(`${this.baseUrl}${endpoint}`,id).pipe(
      map((res: any) => {
        return res
      })
     )
  }
  sendMail(endpoint:string,payload: any){
    return this.http.post(`${this.baseUrl}${endpoint}`, payload).pipe(
      map((res: any) => {
        return res
      })
     );
  }
  getmails(endpoint:string){
    const user: any = localStorage?.getItem('user');
    const headers: any = new Headers({id: user})
    return this.http.get(`${this.baseUrl}${endpoint}`,{headers: headers}).pipe(
      map((res: any) => {
        return res
      })
     );
  }
  
}
