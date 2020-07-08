var e:any = [];
var es:any = [];

var v:any=[];
var vs:any=[];

const TIPO = {
	ENTERO: 'int',
    iden: 'id',
    STRING: 'string',
    BOOLEANO: 'boolean',
    CARACTER: 'char',
    DOUBLE: 'double',
    VOID: 'void'
};

const OPERACION = {
	SUMA: 'suma',
    RESTA: 'resta',
    MULTIPLICACION: 'multiplicacion',
    DIVISION: 'division',
    POTENCIA: 'potencia',
    MODULO: 'modulo',
    NEGATIVO: 'inverso',
    MAYOR: 'mayor',
    MENOR: 'menor',
    MAYOR_IGUAL: 'mayor igual',
    MENOR_IGUAL: 'menor igual',
    IGUAL_IGUAL: 'igual que',
    NO_IGUAL: 'diferente',
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    CONCATENACION: 'concatenar'
};

const INSTRUCCION = {
	CONSOLE: 'CONSOLE_WRITE',
	WHILE: 'WHILE',
	DECLARACION: 'DECLARACION',
	ASIGNACION: 'ASIGNACION',
	IF: 'IF',
	IF_ELSE: 'ELSE IF',
	ELSE: 'ELSE',
	FOR: 'FOR',
	SWITCH: 'SWITCH',
	SWITCH_OP: 'SWITCH_OP',
	SWITCH_DEF: 'SWITCH_DEF',
	DCLASE: 'Declaracion de Clase',
	METODO: 'METODO',
	FUNCION: 'FUNCION',
	DO_WHILE: 'DO_WHILE'

};

const CASEDEF = {
	CASE: 'CASE',
	DEFAULT: 'DEFAULT'
};

const LVariables ={
	astPrintS: function (jso:any) {
		var fs = require('fs');
		try {

			fs.writeFileSync('./build/out/listavariables.json', JSON.stringify(jso, null, 2));

		} catch (er) {
			console.error(er);
			return;
		};
	},
	astVariables: function (error:any) {
		vs.push(error);
		return vs;
	},

	astVariabless: function (e:any, f:any, c:any, valor:any) {
		return {
			tipo: e,
			fila: f,
			nombre: c,
			valor : valor
		}
	}
};

const LERRORES = {

	astPrint: function (jso:any) {
		var fs = require('fs');
		try {

			fs.writeFileSync('./build/out/erroresl.json', JSON.stringify(jso, null, 2));

		} catch (er) {
			console.error(er);
			return;
		};
	},

	astPrintS: function (jso:any) {
		var fs = require('fs');
		try {

			fs.writeFileSync('./build/out/erroresSin.json', JSON.stringify(jso, null, 2));

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
}

const API ={
    astArchivo : function(clases: any,traduccion:any,print:any){
        return{
			clases :clases,
			traduccion: traduccion,
			print: print
        }
    },
    astClase : function(iden:any, content:any){
        var cclass = {
			iden: iden,
			contenido_clase: content
		};
		return {
			tipo: INSTRUCCION.DCLASE,
			clase: cclass,
		}
    },
    astMetodo: function (tipo:any, iden:any, parametros:any, content:any) {
		var a = {
			iden: iden,
			tipo: tipo,
			parametros: parametros,
			content: content
		};
		var b = {
			tipo: INSTRUCCION.FUNCION,
			funcion: a
		}
		return {
			instruccion: b
		}
    },
    astFuncion: function (tipo:any, iden:any, parametros:any, content:any) {
		var b = {
			iden: iden,
			tipo: tipo,
			parametros: parametros,
			content: content
		};
		var a = {
			tipo: INSTRUCCION.FUNCION,
			funcion: b
		};
		return {
			instruccion: a
		}
	},
    astListaP: function (iden:any) {
		var lista_id = [];
		lista_id.push(iden);
		return lista_id;
	},
	astParametro: function (tipo:any, iden:any) {
		return {
			tipo_dato: tipo,
			parametro: iden
		}
    },
    astListaDecla: function(iden:any){
        var lista_decla = [];
		lista_decla.push(iden);
		return lista_decla;
    },
    astDeclaracion: function (tipo:any, iden:any, expresion:any) {
		var a = {
			tipo_dato: tipo,
			variables: iden,
			expresion: expresion
		};

		var b = {
			tipo: INSTRUCCION.DECLARACION,
			declaracion: a
		}

		return {
			instruccion: b
		}
    },
    astDeclaNoVal: function (tipo:any, idenes:any) {
		var a = {
			tipo_dato: tipo,
			variables: idenes
		};

		var b = {
			tipo: INSTRUCCION.DECLARACION,
			declaracion: a
		}

		return {
			instruccion: b
		}
    },
    astListaI: function (iden:any) {
		var lista_id = [];
		lista_id.push(iden);
		return lista_id;
	},

	astIden: function (iden:any) {
		return {
			iden: iden
		}
	},
	astIdenWval : function(iden:any,expresion:any){
		return{
			iden:iden,
			expresion:expresion
		}
    },
	astTipo :function(tipo:any){
		var a={
			type : tipo
		}
		return {
			 tipod: a
		}
    },
	astAsignacion: function (iden:any, expresion:any) {
		var a = {
			variables: iden,
			expresion: expresion
		};

		var b = {
			tipo: INSTRUCCION.ASIGNACION,
			asignacion: a
		};
		return {
			instruccion: b
		}

	},
	astIncreDecre: function(iden:any, aumento:any){
		var a = {
			variables: iden,
			aumento: aumento
		};
		var b = {
			tipo: INSTRUCCION.ASIGNACION,
			asignacion: a
		};
		return {
			instruccion: b
		}
	},

	astWhile: function (condicion:any, content:any) {
		var a = {
			tipo: INSTRUCCION.WHILE,
			condicion: condicion,
			bloque_sentencias: content
		};
		return {
			instruccion: a
		}
    },
    astFor: function (variable:any, condicion:any, aumento:any, content:any) {
		var a = {
			tipo: INSTRUCCION.FOR,
			variable: variable,
			condicion: condicion,
			bloque_sentencias: content,
			aumento: aumento
		};
		return {
			instruccion: a
		}
	},
	astIfC(ifs:any){
		var a={
			tipo:INSTRUCCION.IF,
			IF:ifs
		}
		return a;
	},
    astIf: function (condicion:any, content:any) {
		return {		
			condicion: condicion,
			sentencias: content
		}
	},

	astElseifC: function (rif:any, elseIf:any) {
		var a = {
			tipo: INSTRUCCION.IF,
			IF: rif,
			ELSE_IF: elseIf
		};
		return {
			instruccion: a
		}
	},

	astRif: function (rif:any) {
		var a = {
			tipo: INSTRUCCION.IF,
			IF: rif
		};
		return {
			instruccion: a
		}
	},

	astElseC: function (rif:any, relse:any) {
		var a = {
			tipo: INSTRUCCION.IF,
			IF: rif,
			ELSE: relse
		};
		return {
			instruccion: a
		}
	},

	astIfCompleto: function (rif:any, relif:any, relse:any) {
		var a = {
			tipo: INSTRUCCION.IF,
			IF: rif,
			ELSE_IF: relif,
			ELSE: relse
		};
		return {
			instruccion: a
		}
	},

	astelif: function (elsif:any) {
		var elsei = [];
		elsei.push(elsif);
		return elsei;
	},

	astElseif: function (condicion:any, content:any) {
		var a = {
			condicion: condicion,
			sentencias: content
		}
		return {
			ELSE_IF: a
		}
	},

	astElse: function (content:any) {
		return {
			sentencias: content
		}
	},

	astSwitch: function (expresion:any, casos:any) {
		var a = {
			tipo: INSTRUCCION.SWITCH,
			expresion: expresion,
			cases: casos

		}
		return {
			instruccion: a
		}
	},

	astCases: function (caso:any) {
		var casos = [];
		casos.push(caso);
		return casos;
	},

	astCase: function (expresion:any, content:any) {
		return {
			tipo: CASEDEF.CASE,
			expresion: expresion,
			contenido_case: content
		}
	},

	astDefault: function (content:any) {
		return {
			tipo: CASEDEF.DEFAULT,
			contenido_case: content
		}
	},

	astDoWhile: function (condicion:any, content:any) {
		var a = {
			tipo: INSTRUCCION.DO_WHILE,
			condicion: condicion,
			bloque_sentencias: content

		}
		return {
			instruccion: a
		}
    },
    expresion: function (operandoIzq:any, operandoDer:any, tipo:any) {
		return {
			expresion1: operandoIzq,
			expresion2: operandoDer,
			tipo: tipo
		}
	},


	expresionU: function (operando:any, tipo:any) {
		return {
			expresion1: operando,
			expresion2: undefined,
			tipo: tipo
		}
	},

	nuevoValor: function (valor:any, tipo:any) {
		return {
			tipo: tipo,
			valor: valor
		}
	},

	astBreak: function (brk:any) {
		return {
			instruccion: brk
		}
	},

	astContinue: function (cont:any) {
		return {
			instruccion: cont
		}
	},

	astReturn: function (tipo:any, rtn:any) {
		var a = {
			tipo: tipo,
			expresion: rtn
		}
		var b = {
			return: a
		}

		return {
			instruccion: b
		}
    },
    astLlamadaM: function (iden:any, variables:any) {
		var a = {
			iden: iden,
			parametros: variables
		};
		var b = {
			tipo: "LLAMADA FUNCION",
			funcion: a
		};
		return {
			instruccion: b
		}
	},

	astValores: function (valor:any) {
		var valores = [];
		valores.push(valor);
		return valores;
	},

	astValor: function (exp:any) {
		return {
			parametro: exp
		}
    },
    astConsoleWrite: function (contenido:any) {
		var a = {
			valor: contenido
		}
		var b = {
			tipo: "Console Write",
			cwrite: a
		}


		return {
			instruccion: b
		}
	}
}
module.exports.OPERACION = OPERACION;
module.exports.INSTRUCCION = INSTRUCCION;
module.exports.TIPO = TIPO;
module.exports.API = API;
module.exports.CASEDEF = CASEDEF;
module.exports.LERRORES = LERRORES;
module.exports.LVariables=LVariables;