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
  jsonn:any[]=[];
  convertido:string="";
  html:string="";
  html2:string="";
   async juasjuas() {

    const data= await fetch('http://localhost:3000/GAnalisis');
    const json = await data.json();
    console.log(json);
    this.convertido=JSON.stringify(json).toString();
    console.log(this.convertido);
  }

  ngOnInit() {
  }
  Aprueba(){
    this.analisis.ArchivoPrueba().subscribe(
      res=>{
        this.jsonn[0]=res;
        console.log(this.jsonn);
        this.volverJson();

      },
      err=>{
        console.error(err);
      }
    );
  }

  volverJson(){
    console.log(this.jsonn.length);
        console.log(this.jsonn[0].ast.json);
        this.convertido=JSON.stringify(this.jsonn[0].ast.json.clases).toString();
        const regex = /\\n/gi;
        const regex2 =/\"/gi
        this.html=JSON.stringify(this.jsonn[0].ast.json.print).toString().replace(regex,"\n");
        this.html2=this.html.replace(/['"]+/g, '');
  }

  AJSON(){
      const regex2 =/\"/gi
      console.log(this.html2);
      console.log(this.html2.replace(/['"]+/g, ''));
  }
}
