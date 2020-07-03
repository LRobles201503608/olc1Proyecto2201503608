import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Codigo } from '../models/Codigo';
@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  constructor(private http:HttpClient) { }

  ArchivoPrueba(){
    return this.http.get('http://localhost:3000/GAnalisis');
  }
  AnalizarCodigo(codigo:Codigo){
    return this.http.post('http://localhost:3000/Analizador',codigo);
  }
}
