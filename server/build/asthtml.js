"use strict";
var e = [];
var es = [];
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
const COLORES = {
    RED: 'RED',
    YELLOW: 'YELLOW',
    GREEN: 'GREEN',
    BLUE: 'BLUE',
    WHITE: 'WHITE',
    SKYBLUE: 'SKYBLUE'
};
const LERRORES2 = {
    astPrint: function (jso) {
        var fs = require('fs');
        try {
            fs.writeFileSync('./out/errores.json', JSON.stringify(jso, null, 2));
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
            fs.writeFileSync('./out/erroresS.json', JSON.stringify(jso, null, 2));
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
const API2 = {
    astArchivo: function (html) {
        return {
            HTML: html
        };
    },
    astHTML: function (content) {
        var a = {
            html: INSTRUCCIONES.HTML,
            contenido: content
        };
        return a;
    },
    contenidohtml: function (head, body) {
        var a = {
            head: head,
            body: body
        };
        return a;
    },
    astHead: function (content) {
        var a = {
            head: INSTRUCCIONES.HEAD,
            contenido: content
        };
        return a;
    },
    contenidoHead: function (content) {
        var a = {
            contenido: content
        };
        return a;
    },
    astTitle: function (content) {
        var a = {
            title: INSTRUCCIONES.TITLE,
            contenido: content
        };
        return a;
    },
    astContenidoT: function (valor) {
        var a = {
            valor: valor
        };
        return a;
    },
    astBody: function (atributos, content) {
        var a = {
            body: INSTRUCCIONES.BODY,
            atributos: atributos,
            contenido: content
        };
        return a;
    },
    astAtributos: function (color) {
        var contenidocolor = {
            instruccion: INSTRUCCIONES.BACKGROUND,
            color: color
        };
        var a = {
            style: INSTRUCCIONES.STYLE,
            background: contenidocolor
        };
        return a;
    },
    astSinAtributos: function () {
        var a = {
            atributos: "VACIO"
        };
        return a;
    },
    astDiv: function (atributos, content) {
        var a = {
            body: INSTRUCCIONES.DIV,
            atributos: atributos,
            contenido: content
        };
        return a;
    },
    astBr: function () {
        var a = {
            br: INSTRUCCIONES.BR
        };
        return a;
    },
    astP: function (content) {
        var a = {
            p: INSTRUCCIONES.PARRAFO,
            contenido: content
        };
        return a;
    },
    asth1: function (content) {
        var a = {
            h1: INSTRUCCIONES.H1,
            contenido: content
        };
        return a;
    },
    asth2: function (content) {
        var a = {
            h2: INSTRUCCIONES.H2,
            contenido: content
        };
        return a;
    },
    asth3: function (content) {
        var a = {
            h3: INSTRUCCIONES.H3,
            contenido: content
        };
        return a;
    },
    asth4: function (content) {
        var a = {
            h4: INSTRUCCIONES.H4,
            contenido: content
        };
        return a;
    },
    astbutton: function (content) {
        var a = {
            h4: INSTRUCCIONES.BUTTON,
            contenido: content
        };
        return a;
    },
    astlabel: function (content) {
        var a = {
            h4: INSTRUCCIONES.LABEL,
            contenido: content
        };
        return a;
    },
    astinput: function (content) {
        var a = {
            h4: INSTRUCCIONES.INPUT,
            contenido: content
        };
        return a;
    },
    astContenidoI: function (content) {
        var a = {
            contenido: content
        };
        return a;
    }
};
module.exports.LERRORES2 = LERRORES2;
module.exports.COLORES = COLORES;
module.exports.INSTRUCCIONES = INSTRUCCIONES;
module.exports.API2 = API2;
