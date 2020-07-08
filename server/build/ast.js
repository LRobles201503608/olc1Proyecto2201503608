"use strict";
var e = [];
var es = [];
var v = [];
var vs = [];
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
const LVariables = {
    astPrintS: function (jso) {
        var fs = require('fs');
        try {
            fs.writeFileSync('./build/out/listavariables.json', JSON.stringify(jso, null, 2));
        }
        catch (er) {
            console.error(er);
            return;
        }
        ;
    },
    astVariables: function (error) {
        vs.push(error);
        return vs;
    },
    astVariabless: function (e, f, c, valor) {
        return {
            tipo: e,
            fila: f,
            nombre: c,
            valor: valor
        };
    }
};
const LERRORES = {
    astPrint: function (jso) {
        var fs = require('fs');
        try {
            fs.writeFileSync('./build/out/erroresl.json', JSON.stringify(jso, null, 2));
        }
        catch (er) {
            console.error(er);
            return;
        }
        ;
    },
    astPrintS: function (jso) {
        var fs = require('fs');
        try {
            fs.writeFileSync('./build/out/erroresSin.json', JSON.stringify(jso, null, 2));
        }
        catch (er) {
            console.error(er);
            return;
        }
        ;
    },
    astErrores: function (error) {
        e.push(error);
        return e;
    },
    astError: function (error, linea, columna, tipo) {
        return {
            error: error,
            fila: linea,
            columna: columna,
            tipo: tipo
        };
    },
    astErroresS: function (error) {
        es.push(error);
        return es;
    },
    astErrorS: function (e, f, c, tipo) {
        return {
            error: e,
            fila: f,
            columna: c,
            tipo: tipo
        };
    }
};
const API = {
    astArchivo: function (clases, traduccion, print) {
        return {
            clases: clases,
            traduccion: traduccion,
            print: print
        };
    },
    astClase: function (iden, content) {
        var cclass = {
            iden: iden,
            contenido_clase: content
        };
        return {
            tipo: INSTRUCCION.DCLASE,
            clase: cclass,
        };
    },
    astMetodo: function (tipo, iden, parametros, content) {
        var a = {
            iden: iden,
            tipo: tipo,
            parametros: parametros,
            content: content
        };
        var b = {
            tipo: INSTRUCCION.FUNCION,
            funcion: a
        };
        return {
            instruccion: b
        };
    },
    astFuncion: function (tipo, iden, parametros, content) {
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
        };
    },
    astListaP: function (iden) {
        var lista_id = [];
        lista_id.push(iden);
        return lista_id;
    },
    astParametro: function (tipo, iden) {
        return {
            tipo_dato: tipo,
            parametro: iden
        };
    },
    astListaDecla: function (iden) {
        var lista_decla = [];
        lista_decla.push(iden);
        return lista_decla;
    },
    astDeclaracion: function (tipo, iden, expresion) {
        var a = {
            tipo_dato: tipo,
            variables: iden,
            expresion: expresion
        };
        var b = {
            tipo: INSTRUCCION.DECLARACION,
            declaracion: a
        };
        return {
            instruccion: b
        };
    },
    astDeclaNoVal: function (tipo, idenes) {
        var a = {
            tipo_dato: tipo,
            variables: idenes
        };
        var b = {
            tipo: INSTRUCCION.DECLARACION,
            declaracion: a
        };
        return {
            instruccion: b
        };
    },
    astListaI: function (iden) {
        var lista_id = [];
        lista_id.push(iden);
        return lista_id;
    },
    astIden: function (iden) {
        return {
            iden: iden
        };
    },
    astIdenWval: function (iden, expresion) {
        return {
            iden: iden,
            expresion: expresion
        };
    },
    astTipo: function (tipo) {
        var a = {
            type: tipo
        };
        return {
            tipod: a
        };
    },
    astAsignacion: function (iden, expresion) {
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
        };
    },
    astIncreDecre: function (iden, aumento) {
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
        };
    },
    astWhile: function (condicion, content) {
        var a = {
            tipo: INSTRUCCION.WHILE,
            condicion: condicion,
            bloque_sentencias: content
        };
        return {
            instruccion: a
        };
    },
    astFor: function (variable, condicion, aumento, content) {
        var a = {
            tipo: INSTRUCCION.FOR,
            variable: variable,
            condicion: condicion,
            bloque_sentencias: content,
            aumento: aumento
        };
        return {
            instruccion: a
        };
    },
    astIfC(ifs) {
        var a = {
            tipo: INSTRUCCION.IF,
            IF: ifs
        };
        return a;
    },
    astIf: function (condicion, content) {
        return {
            condicion: condicion,
            sentencias: content
        };
    },
    astElseifC: function (rif, elseIf) {
        var a = {
            tipo: INSTRUCCION.IF,
            IF: rif,
            ELSE_IF: elseIf
        };
        return {
            instruccion: a
        };
    },
    astRif: function (rif) {
        var a = {
            tipo: INSTRUCCION.IF,
            IF: rif
        };
        return {
            instruccion: a
        };
    },
    astElseC: function (rif, relse) {
        var a = {
            tipo: INSTRUCCION.IF,
            IF: rif,
            ELSE: relse
        };
        return {
            instruccion: a
        };
    },
    astIfCompleto: function (rif, relif, relse) {
        var a = {
            tipo: INSTRUCCION.IF,
            IF: rif,
            ELSE_IF: relif,
            ELSE: relse
        };
        return {
            instruccion: a
        };
    },
    astelif: function (elsif) {
        var elsei = [];
        elsei.push(elsif);
        return elsei;
    },
    astElseif: function (condicion, content) {
        var a = {
            condicion: condicion,
            sentencias: content
        };
        return {
            ELSE_IF: a
        };
    },
    astElse: function (content) {
        return {
            sentencias: content
        };
    },
    astSwitch: function (expresion, casos) {
        var a = {
            tipo: INSTRUCCION.SWITCH,
            expresion: expresion,
            cases: casos
        };
        return {
            instruccion: a
        };
    },
    astCases: function (caso) {
        var casos = [];
        casos.push(caso);
        return casos;
    },
    astCase: function (expresion, content) {
        return {
            tipo: CASEDEF.CASE,
            expresion: expresion,
            contenido_case: content
        };
    },
    astDefault: function (content) {
        return {
            tipo: CASEDEF.DEFAULT,
            contenido_case: content
        };
    },
    astDoWhile: function (condicion, content) {
        var a = {
            tipo: INSTRUCCION.DO_WHILE,
            condicion: condicion,
            bloque_sentencias: content
        };
        return {
            instruccion: a
        };
    },
    expresion: function (operandoIzq, operandoDer, tipo) {
        return {
            expresion1: operandoIzq,
            expresion2: operandoDer,
            tipo: tipo
        };
    },
    expresionU: function (operando, tipo) {
        return {
            expresion1: operando,
            expresion2: undefined,
            tipo: tipo
        };
    },
    nuevoValor: function (valor, tipo) {
        return {
            tipo: tipo,
            valor: valor
        };
    },
    astBreak: function (brk) {
        return {
            instruccion: brk
        };
    },
    astContinue: function (cont) {
        return {
            instruccion: cont
        };
    },
    astReturn: function (tipo, rtn) {
        var a = {
            tipo: tipo,
            expresion: rtn
        };
        var b = {
            return: a
        };
        return {
            instruccion: b
        };
    },
    astLlamadaM: function (iden, variables) {
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
        };
    },
    astValores: function (valor) {
        var valores = [];
        valores.push(valor);
        return valores;
    },
    astValor: function (exp) {
        return {
            parametro: exp
        };
    },
    astConsoleWrite: function (contenido) {
        var a = {
            valor: contenido
        };
        var b = {
            tipo: "Console Write",
            cwrite: a
        };
        return {
            instruccion: b
        };
    }
};
module.exports.OPERACION = OPERACION;
module.exports.INSTRUCCION = INSTRUCCION;
module.exports.TIPO = TIPO;
module.exports.API = API;
module.exports.CASEDEF = CASEDEF;
module.exports.LERRORES = LERRORES;
module.exports.LVariables = LVariables;
