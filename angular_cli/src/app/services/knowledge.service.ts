import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {


  url_API = 'http://localhost/api'
  constructor(private http: HttpClient) { }
  getKnowledge(){
    return this.http.get<any[]>(`${this.url_API}/knowledges`);
  }

}
