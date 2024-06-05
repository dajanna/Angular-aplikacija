import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 constructor(private http:HttpClient){}
 url="https://63c99464904f040a96613c22.mockapi.io/v1/user";
 
 GetAll():Observable<Student[]>{
  return this.http.get<Student[]>(this.url);
 }

 delete(id: number): Observable<any> {
  return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
}
add(student:Student){
  return this.http.post(this.url, student);
}
update(id:number, student:Student){

  return this.http.put(`${this.url}/${id}`, student);

}
GetById(id:number){
  return this.http.get<Student>(`${this.url}/${id}`);

}
}
