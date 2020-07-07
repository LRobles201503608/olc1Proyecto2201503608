import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {AnalisisService} from '../../Services/analisis.service';
import { Codigo } from 'src/app/models/Codigo';
import { HTML } from 'src/app/models/HTML';
declare const JSONViewer:any;
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(public analisis:AnalisisService) { }
  Code:Codigo={
    text:''
  };
  CodeH:HTML={
    text:''
  };
  codigo:string="";
  jsonn:any[]=[];
  convertido:string="";
  convertido2:string="";
  html:string="";
  html2:string="";
  jsonh:any[]=[];
  data={};
  ngOnInit() {
  }
  ALectura(){
    console.log(this.Code.text);
    this.analisis.AnalizarCodigo(this.Code).subscribe(
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
  Aprueba(){
    this.analisis.ArchivoPrueba().subscribe(
      res=>{
        this.jsonn[0]=res;
        console.log(this.jsonn);
        this.volverJson();
        this.TreeJSON();
      },
      err=>{
        this.convertido="EXISTE UN ERROR";
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
        this.html2=this.html2.replace(/['\\]+/g, '');
        this.CodeH.text=this.html2;
        this.data=  JSON.parse(JSON.stringify(this.jsonn[0].ast.json.clases,null,2));
  }

  AJSON(){
      const regex2 =/\"/gi
      console.log(this.html2);
      console.log(this.html2.replace(/['"]+/g, ''));
  }

  AnalizarHTML(){
    const regex2 =/\"/gi
      console.log(this.html2);
      console.log(this.html2.replace(/['"]+/g, ''));
    this.analisis.AnalizarHtml(this.CodeH).subscribe(
      res=>{
        this.jsonh[0]=res;
        console.log(this.jsonn);
        this.volverJSON2();
      },
      err=>{
        console.error(err);
      }
    );
  }

  volverJSON2(){
        console.log(this.jsonh.length);
        console.log(this.jsonh[0].ast.json);
        this.convertido2=JSON.stringify(this.jsonh[0].ast.json).toString();
  }

  TreeJSON(){
    var jsonObj = {};
    var jsonViewer = new JSONViewer();
    jsonViewer.showJSON(this.convertido);

  }

  async ShowErrors(){
    const data = await fetch('http://localhost:3000/errores');
    const json = await data.json();
    console.log(json);

    const data2 = await fetch('http://localhost:3000/erroresSin');
    const json2 = await data2.json();
    console.log(json2);

    let tbl2 = document.getElementById("errores");
    let filas_e = "";
    let con_errores = 0;
    for (let i = 0; i < json.length; i++) {
        con_errores++;
        filas_e += "<tr ><td>" + con_errores + "</td>" +"<td>" + json[i]["error"] + "</td>" + "<td>" + json[i]["tipo"] + "<td>" + json[i]["fila"] + "</td>" + "<td>" + json[i]["columna"]  + "</tr>";
    }
    for (let i = 0; i < json2.length; i++) {
      con_errores++;
      filas_e += "<tr ><td>" + con_errores + "</td>" +"<td>" + json2[i]["error"] + "</td>" + "<td>" + json2[i]["tipo"] + "<td>" + json2[i]["fila"] + "</td>" + "<td>" + json2[i]["columna"]  + "</tr>";
  }
    tbl2.innerHTML = filas_e;
  }

  async ShowVariables(){
    const data = await fetch('http://localhost:3000/variables');
    const json = await data.json();
    console.log(json);
    let tbl2 = document.getElementById("variables");
    let filas_e = "";
    let con_errores = 0;
    for (let i = 0; i < json.length; i++) {
      con_errores++;
      filas_e += "<tr ><td>" + con_errores + "</td>" +"<td>" + json[i]["tipo"] + "</td>" + "<td>" + json[i]["nombre"] + "<td>" + json[i]["fila"] + "</td>" + "</tr>";
    }
    tbl2.innerHTML = filas_e;
  }
}

