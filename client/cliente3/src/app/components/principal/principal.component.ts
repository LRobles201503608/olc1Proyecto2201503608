import { FormsModule } from '@angular/forms';
import { Component, OnInit, ɵConsole } from '@angular/core';
import {AnalisisService} from '../../Services/analisis.service';
import { Codigo } from 'src/app/models/Codigo';
import { HTML } from 'src/app/models/HTML';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Key } from 'protractor';
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
  datas={};

  concatexpre:boolean=false;
  traduccion:string="";
  conttabs:number=0;
  agregado:boolean=false;

  fileToUpload: File = null;

  ngOnInit() {
  }
  change(files: FileList){
    this.fileToUpload = files.item(0);
  }
  ALectura(){
    console.log(this.Code.text);
    this.analisis.AnalizarCodigo(this.Code).subscribe(
      res=>{
        this.jsonn[0]=res;
        console.log(res);
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
        //console.log(this.jsonn);
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
    //console.log(this.jsonn.length);
        //console.log(this.jsonn[0].ast.json);
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
      //console.log(this.html2);
      //console.log(this.html2.replace(/['"]+/g, ''));
  }

  AnalizarHTML(){
    const regex2 =/\"/gi
      //console.log(this.html2);
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
        this.datas=  JSON.parse(JSON.stringify(this.jsonh[0].ast.json,null,2));
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

  iniciarRecorrido(){
      //console.log(this.jsonn[0].ast.json.clases.clase);
      this.CLASSE(this.jsonn[0].ast.json.clases.clase);
  }

  CLASSE(content:any){
    //console.log(content.contenido_clase);
    this.CONTENIDO_CLASE(content.contenido_clase);
  }
  CONTENIDO_CLASE(content:any){
    for(let a=0;a<content.length;a++){
      //console.log(content);
      this.LINSTRUCCIONES(content[a]);
    }
  }
  LINSTRUCCIONES(content:any){
    //console.log(content);
    for(var key in content){
      if(key=="instruccion"){
        //console.log(content["instruccion"]);
        this.INSTRUCCION(content["instruccion"]);
      }else{
        this.LINSTRUCCIONES(content[key]);
      }
    }
  }
  INSTRUCCION(content:any){
    console.log(content);
    if(content.tipo=="DECLARACION"){
      this.DECLARACION(content.declaracion);
    }else if(content.tipo=="FUNCION"){
      this.FUNCION(content.funcion);
    }else if(content.tipo=="ASIGNACION"){
      this.ASIGNACION(content);
    }
    this.traduccion+="\n";
  }
  LDECLARACIONES(content:any){
    //console.log(content);
    if(content.length==1){
      //console.log(content[0]);
      this.DECLARACION(content[0].instruccion.declaracion);
    }else{
      this.traduccion+="var ";
      for(let i=0;i<content.length;i++){
        console.log(content[i]);
      }
    }
  }
  FUNCION(content:any){
    //console.log(content);
    this.traduccion+="def "+content.iden+"(";
    this.PARAMETROS(content.parametros);
    this.traduccion+=") \n";
    this.conttabs++;
    this.CONTENIDO_MF(content.content);
    if(content.iden=="main"&&content.parametros=="sin parametros"){
      this.traduccion+="if__name__=\"__main__\":\n\t main()\n";
    }
  }
  CONTENIDO_MF(content:any){
    //console.log(content);
    if(content=="vacio"){

    }else{
      for(let i = 0; i<content.length;i++){

        this.LINSTRUMFUNC(content[i]);
      }
    }
    this.conttabs=0;
  }
  LINSTRUMFUNC(content:any){
    //console.log(content);
    for(var key in content){
      if(key=="instruccion"){
        //console.log(content["instruccion"]);
        this.INSTRUCCION2(content["instruccion"]);
      }else if(key=="IF"){
        this.IFS(content);
      }else if(key=="WHILE"){
        this.WHILE(content);
      }else if(key=="DO_WHILE"){
        this.DOWHILE(content);
      }else if(key=="FOR"){
        this.FOR(content);
      }else if(key=="SWITCH"){
        this.SWITCH(content);
      }else if(key=="ASIGNACION"){
        this.ASIGNACION(content);
      }else if(key=="return"){
        this.RETORNO(content);
      }else if(key=="continue"){
        this.traduccion+="continue"
      }else if(key=="break"){
          this.traduccion+="break"
      }else{
        this.LINSTRUMFUNCS(content[key]);
      }
    }
  }
  LINSTRUMFUNCS(content:any){
    //console.log(content);
    for(var key in content){
      if(key=="instruccion"){
        //console.log(content["instruccion"]);
        this.INSTRUCCION2(content["instruccion"]);
      }
    }
  }
  INSTRUCCION2(content:any){
    //console.log(content);
    /*for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }*/
    if(content.tipo=="Console Write"){
      this.FPRINT(content.cwrite.valor);
    }else if(content.tipo=="DECLARACION"){
      this.DECLARACION(content.declaracion);
    }else if(content.tipo=="IF"){
      this.IFS(content);
    }else if(content.tipo=="WHILE"){
      this.WHILE(content)
    }else if(content.tipo=="DO_WHILE"){
      this.DOWHILE(content);
    }else if(content.tipo=="FOR"){
      this.FOR(content);
    }else if(content.tipo=="SWITCH"){
      this.SWITCH(content);
    }else if(content.tipo=="ASIGNACION"){
      this.ASIGNACION(content);
    }else if(content=="continue"){
      for(let j=1; j<=this.conttabs;j++){
        this.traduccion+="\t";
      }
      this.traduccion+="continue \n"
    }else if(content=="break"){
      for(let j=1; j<=this.conttabs;j++){
        this.traduccion+="\t";
      }
        this.traduccion+="break \n"
    }else if(content.tipo=="LLAMADA FUNCION"){
      console.log("sip");
      this.LLAMADAFUNCION(content.funcion);
    }else{
      this.RETORNO(content.return);
    }
  }
  LLAMADAFUNCION(content:any){
    //console.log(content);
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+=content.iden+"(";
    this.PARAMETRAJE(content.parametros);
    this.traduccion+=") \n";
  }
  PARAMETRAJE(content:any){
    for(let key=0;key<content.length;key++){
      this.PAR(content[key]);
      if((key+1>=content.length)){

      }else{
        this.traduccion+=",";
      }
    }
  }
  PAR(content:any){
    console.log(content);
    for(var key in content){
      if(key=="parametro"){
        this.traduccion+=content[key].valor;
      }
    }
  }
  ASIGNACION(content:any){
    //console.log(content);
    for(var key in content){
      if(key=="asignacion"){
        this.ASIGNA(content[key]);
      }
    }

  }
  ASIGNA(content:any){
    //console.log(content);
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    for(var key in content){
      if(key=="variables"){
        this.traduccion+=content.variables;
      }else if(key=="expresion"){
        this.traduccion+=" = ";
        this.EXPRESION(content.expresion);
      } else if(key=="aumento"){
        if(content.aumento=="++"){
          this.traduccion+="++";
        }else{
          this.traduccion+="--";
        }
      }
    }
    this.traduccion+="\n";
  }
  FOR(content:any){
    //console.log(content);
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+="for ";
    this.VARIABLE(content.variable);
    this.CONDICION(content.condicion);
    this.traduccion+="\n";
    this.conttabs++;
    this.SENTENCIAS(content.bloque_sentencias);
    this.conttabs--;
  }
  CONDICION(content:any){
    this.traduccion+=","+content.expresion2.valor+"):"
  }
  VARIABLE(content:any){
    //console.log(content);
    for(var key in content){
      if(key=="instruccion"){
        this.OBTENERVAR(content.instruccion);
      }else{
        this.VARIABLE(content[key]);
      }
    }
  }
  OBTENERVAR(content:any){
    //console.log(content);
    if(content.tipo=="ASIGNACION"){
      this.traduccion+=content.asignacion.variables+" in range("+content.asignacion.expresion.valor,"";
    }else{
      this.traduccion+=content.declaracion.variables+" in range("+content.declaracion.expresion.valor+"";
    }
  }
  SWITCH(content:any){
    //console.log(content);
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+="def switch(";
    this.EXPRESION(content.expresion);
    this.traduccion+="): \n";
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+="switcher={\n";
    this.CASES(content.cases);
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+="}\n";
  }
  CASES(content:any){
    for(var key in content){
      if(content[key].tipo=="CASE"){
        for(let j=1; j<=this.conttabs;j++){
          this.traduccion+="\t";
        }
          this.EXPRESION(content[key].expresion);
          this.traduccion+=": \n";
          this.conttabs++;
          this.SENTENCIAS(content[key].contenido_case);
          this.conttabs--;
      }else{
        for(let j=1; j<=this.conttabs;j++){
          this.traduccion+="\t";
        }
        this.traduccion+="9999999: \n";
        this.conttabs++;
        this.SENTENCIAS(content[key].contenido_case);
        this.conttabs--;
      }
    }
  }
  DOWHILE(content:any){
    console.log(content);
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+="while true: \n";
    this.conttabs++;
    this.SENTENCIAS(content.bloque_sentencias);
    this.conttabs--;
    this.traduccion+="if(";
    this.EXPRESIONDO(content.condicion);
    this.traduccion+="): \n break\n";
  }
  EXPRESIONDO(content:any){
    for(var key in content){
      //console.log(key);
      if(key=="expresion1"){
          if(content.tipo=="suma"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="+";
            this.EXPRESION(content.expresion2);
          }else if(content.tipo=="resta"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="-";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="multiplicacion"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="*";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="division"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="/";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="and"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="and ";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="or"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="or ";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="not"){
            this.traduccion+="not ";
            this.EXPRESION(content.expresion1);
          }
          else if(content.tipo=="inverso"){
            this.traduccion+="-";
            this.EXPRESION(content.expresion1);
          }
          else if(content.tipo=="mayor"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="> ";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="menor"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="< ";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="mayor igual"){
            this.EXPRESION(content.expresion1);
            this.traduccion+=">= ";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="menor igual"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="<= ";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="igual que"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="== ";
            this.EXPRESION(content.expresion2);
          }
          else if(content.tipo=="diferente"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="!= ";
            this.EXPRESION(content.expresion2);
          }
      }else if(key=="valor"){
        if(!this.agregado){
          //console.log("entra");
          this.traduccion+=content.valor+" ";
        }
      }
    }
  }
  WHILE(content:any){
    //console.log(content);
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+="while ";
    this.EXPRESION(content.condicion);
    this.traduccion+=": \n";
    this.conttabs++;
    this.SENTENCIAS(content.bloque_sentencias);
    this.conttabs++;
  }
  RETORNO(content:any){
    //console.log(content);
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    if(content.expresion=="vacio"){
      this.traduccion+="return \n";
    }else{
      this.traduccion+="return ";
      this.EXPRESION(content.expresion);
      this.traduccion+="\n";
    }
  }
  IFS(content:any){
    //console.log(content);

    for(var key in content){
      if(key=="IF"){
        this.IF(content[key]);
      }else if(key=="ELSE_IF"){
        this.ELSEIFS(content[key]);
      }else if(key=="ELSE"){
        this.ELSE(content[key]);
      }else{

      }
    }

  }
  IF(content:any){
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+="if ";
    this.EXPRESION(content.condicion);
    this.traduccion+=": \n";
    this.conttabs++;
    this.SENTENCIAS(content.sentencias);
    this.conttabs--;
  }
  ELSEIFS(content:any){

    //console.log(content);
    for(var key in content){
      this.ELSEIF(content[key].ELSE_IF);
    }
  }
  ELSEIF(content:any){
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    //console.log(content);
    this.traduccion+="elif: ";
    this.EXPRESION(content.condicion);
    this.traduccion+=": \n";
    this.conttabs++;
    this.SENTENCIAS(content.sentencias);
    this.conttabs--;
  }
  ELSE(content:any){
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    //console.log(content);
    this.traduccion+="else: \n";
    this.conttabs++;
    this.SENTENCIAS(content.sentencias);
    this.conttabs--;
  }
  SENTENCIAS(content:any){
    //console.log(content);

    if(content=="VACIO"){

    }else{
      for(var key in content){
        this.LINSTRUMFUNC(content[key]);
      }
    }
  }
  FPRINT(content:any){
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+="print("+content+") \n"
  }
  PARAMETROS(content:any){
    //console.log(content);
    if(content=="sin parametros"){

    }else{
      //console.log(content);
      for(let i=0;i<content.length;i++){
        //console.log(content[i]);
        if((i+1)==content.length){
          this.traduccion+="var "+content[i].parametro+" ";
        }else{
          this.traduccion+="var "+content[i].parametro+",";
        }
      }
    }
  }
  DECLARACION(content:any){
    //console.log(content);
    for(let j=1; j<=this.conttabs;j++){
      this.traduccion+="\t";
    }
    this.traduccion+="var "+content.variables+" = ";
    this.EXPRESION(content.expresion);
    this.traduccion+="\n"
  }

  EXPRESION(content:any){
    //console.log(content);
    for(var key in content){
      //console.log(key);
      if(key=="expresion1"){
          if(content.tipo=="suma"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="+";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }else if(content.tipo=="resta"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="-";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="multiplicacion"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="*";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="division"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="/";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="and"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="and ";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="or"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="or ";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="not"){
            this.traduccion+="not ";
            this.EXPRESION(content.expresion1);
            this.concatexpre=true;
          }
          else if(content.tipo=="inverso"){
            this.traduccion+="-";
            this.EXPRESION(content.expresion1);
            this.concatexpre=true;
          }
          else if(content.tipo=="mayor"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="> ";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="menor"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="< ";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="mayor igual"){
            this.EXPRESION(content.expresion1);
            this.traduccion+=">= ";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="menor igual"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="<= ";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="igual que"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="== ";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
          else if(content.tipo=="diferente"){
            this.EXPRESION(content.expresion1);
            this.traduccion+="!= ";
            this.EXPRESION(content.expresion2);
            this.concatexpre=true;
          }
      }else if(key=="valor"){
        if(!this.agregado){
          //console.log("entra");
          this.traduccion+=content.valor+" ";
          this.concatexpre=true;
        }
      }else if(key=="instruccion"){
        this.INSTRUCCION2(content[key]);
      }
    }
  }
}

