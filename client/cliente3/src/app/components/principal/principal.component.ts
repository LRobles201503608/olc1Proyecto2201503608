import { Component, OnInit } from '@angular/core';
import {AnalisisService} from '../../Services/analisis.service';
import { Codigo } from 'src/app/models/Codigo';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(public analisis:AnalisisService) { }
  jsonn:any=[];
  ngOnInit() {
  }
  Aprueba(){
    this.analisis.ArchivoPrueba().subscribe(
      res=>{
        this.jsonn=res;
        console.log(this.jsonn.ast.json);

      },
      err=>{
        console.error(err);
      }
    );
  }


  volverJson(){

  }
}
