var e:any = [];
var es:any = [];

const INSTRUCCIONES = {
	HTML: 'HTML',
	BODY: 'BODY',
	HEAD: 'HEAD',
    DIV: 'DIV',
    STYLE: 'STYLE',
	BACKGROUND: 'BACKGROUND',
	INPUT: 'INPUT',
	LABEL: 'LABEL',
	H1: 'H1',
	H2: 'H2',
	H3: 'H3',
	H4: 'H4',
	BR: 'BR',
	PARRAFO: 'PARRAFO',
	TITLE: 'TITLE',
	BUTTON: 'BUTTON'

};

const COLORES ={
    RED: 'RED',
    YELLOW: 'YELLOW',
    GREEN: 'GREEN',
    BLUE: 'BLUE',
    WHITE: 'WHITE',
    SKYBLUE: 'SKYBLUE'
};

const LERRORES2 = {

	astPrint: function (jso:any) {
		var fs = require('fs');
		try {

			fs.writeFileSync('./out/errores.json', JSON.stringify(jso, null, 2));

		} catch (er) {
			console.error(er);
			return;
		};
	},

	astPrintS: function (jso:any) {
		var fs = require('fs');
		try {

			fs.writeFileSync('./out/erroresS.json', JSON.stringify(jso, null, 2));

		} catch (er) {
			console.error(er);
			return;
		};
	},

	astErrores: function (error:any) {
		e.push(error);
		return e;
	},

	astError: function (error:any, linea:any, columna:any, tipo:any) {
		return {
			error: error,
			fila: linea,
			columna: columna,
			tipo : tipo
		}
	},

	astErroresS: function (error:any) {
		es.push(error);
		return es;
	},

	astErrorS: function (e:any, f:any, c:any, tipo:any) {
		return {
			error: e,
			fila: f,
			columna: c,
			tipo : tipo
		}
	}
};

const API2 ={
    astArchivo : function(html: any){
        return{
			HTML :html
        }
    },
    astHTML : function(content:any){
        var a ={
            html: INSTRUCCIONES.HTML,
            contenido : content
        }
        return a;
    },
    contenidohtml:function(head:any,body:any){
        var a={
            head:head,
            body:body
        };
        return a;
    },
    astHead: function (content:any){
        var a = {
            head: INSTRUCCIONES.HEAD,
            contenido: content
        }
        return a;
    },
    contenidoHead:function(content:any){
        var a={
            contenido:content
        };
        return a;
    },
    astTitle: function(content:any){
        var a = {
            title: INSTRUCCIONES.TITLE,
            contenido: content
        }
        return a;
    },
    astContenidoT: function(valor:any){
        var a= {
            valor: valor
        }
        return a;
    },
    astBody: function(atributos:any,content:any){
        var a={
            body: INSTRUCCIONES.BODY,
            atributos: atributos,
            contenido:content
        };
        return a;
    },
    astAtributos:function(color:any){
        var contenidocolor={
            instruccion:INSTRUCCIONES.BACKGROUND,
            color:color
        };
        var a={
            style: INSTRUCCIONES.STYLE,
            background:contenidocolor
        };
        return a;
    },
    astSinAtributos:function(){
        var a={
            atributos:"VACIO"
        };
        return a;
    },
    astDiv:function(atributos:any,content:any){
        var a={
            body: INSTRUCCIONES.DIV,
            atributos: atributos,
            contenido:content
        };
        return a;
    },
    astBr:function(){
        var a={
            br:INSTRUCCIONES.BR
        };
        return a;
    },
    astP:function(content:any){
        var a={
            p:INSTRUCCIONES.PARRAFO,
            contenido:content
        };
        return a;
    },
    asth1:function(content:any){
        var a={
            h1:INSTRUCCIONES.H1,
            contenido:content
        };
        return a;
    },
    asth2:function(content:any){
        var a={
            h2:INSTRUCCIONES.H2,
            contenido:content
        };
        return a;
    },
    asth3:function(content:any){
        var a={
            h3:INSTRUCCIONES.H3,
            contenido:content
        };
        return a;
    },
    asth4:function(content:any){
        var a={
            h4:INSTRUCCIONES.H4,
            contenido:content
        };
        return a;
    },
    astbutton:function(content:any){
        var a={
            h4:INSTRUCCIONES.BUTTON,
            contenido:content
        };
        return a;
    },
    astlabel:function(content:any){
        var a={
            h4:INSTRUCCIONES.LABEL,
            contenido:content
        };
        return a;
    },
    astinput:function(content:any){
        var a={
            h4:INSTRUCCIONES.INPUT,
            contenido:content
        };
        return a;
    },
    astContenidoI:function(content:any){
        var a={
            contenido:content
        };
        return a;
    }
};

module.exports.LERRORES2 = LERRORES2;
module.exports.COLORES = COLORES;
module.exports.INSTRUCCIONES = INSTRUCCIONES;
module.exports.API2 = API2;