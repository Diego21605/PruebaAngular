import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  constructor(private http : HttpClient) { }

  GetAll() : Observable<any> {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts`);
  }

  GetOne(id : number) : Observable<any> {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  Post(body : any) : Observable<any> {
    return this.http.post(`https://jsonplaceholder.typicode.com/posts`, body);
  }

  Put(id : number, body : any) : Observable<any> {
    return this.http.put(`https://jsonplaceholder.typicode.com/posts/${id}`, body);
  }

  Delete(id : number) : Observable<any> {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
