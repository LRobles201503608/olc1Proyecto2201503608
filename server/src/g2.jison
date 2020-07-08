/* Definición Léxica */
%lex

%options case-insensitive

%{
	const LERRORES2	= require('./ast').LERRORES2;
%}

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"<html>"			return 'HTMLA';
"</html>"			return 'HTMLC';
"<head>"			return 'HEADA';
"</head>"			return 'HEADC';
"<title>"			return 'TITLEA';
"</title>"			return 'TITLEC';
"body"			    return 'RBODY';
"</body>"			return 'BODYC';
"style"			    return 'RSTYLE';
"backgroud"			return 'RBACKGROUND';
"yellow"			return 'RYELLOW';
"green"			    return 'RGREEN';
"blue"			    return 'RBLUE';
"red"			    return 'RRED';
"white"			    return 'RWHITE';
"skyblue"			return 'RSKYBLUE';
"div"			    return 'RDIV';
"</div>"			return 'DIVC';
"<br>"			    return 'RBR';
"<p>"			    return 'RPA';
"</p>"			    return 'RPC';
"<h1>"			    return 'H1A';
"</h1>"			    return 'H1C';
"<h2>"			    return 'H2A';
"</h2>"			    return 'H2C';
"<h3>"			    return 'H3A';
"</h3>"			    return 'H3C';
"<h4>"			    return 'H4C';
"</h4>"			    return 'H4C';
"<button>"		    return 'BUTTONA';
"</button>"			return 'BUTTONC';
"<label>"			return 'LABELA';
"</label>"			return 'LABELC';
"<input>"			return 'INPUTA';
"</input>"		    return 'INPUTC';

"<"					return 'MENOR';
">"					return 'MAYOR';
"="					return 'IGUAL';
":"					return 'DOSP';
"\""			    return 'COMILLAD';

(' '?_?[a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';

<<EOF>>				return 'EOF';
.	                { $$ = LERRORES2.astErrores(LERRORES.astError(yytext , yylloc.first_line , yylloc.first_column, "Lexico")); LERRORES.astPrint($$);}							

/lex

%{
	const COLORES 		= require('./asthtml').COLORES;
	const API2	= require('./asthtml').API2;
	const LERRORES2	= require('./asthtml').LERRORES2;
%}

%left UMENOS
%start s

%% /* Definición de la gramática */

s 
    :   inicio EOF{return $1;}
;

inicio
    : HTMLA contenidohtml HTMLC {$$=API2.astHTML($2);}
;

contenidohtml
    : head body {$$=API2.contenidohtml($1,$2);}
;

head
    : HEADA contenidohead HEADC {$$=API2.astHead($2);}
;

contenidohead
    : TITLEA contenidotitle TITLEC {$$=API2.astTitle($2);}
;

contenidotitle
    : IDENTIFICADOR {$$=API2.astContenidoT($1);}
    | {$$=API2.astContenidoT("Vacio");}
;

body
    : MENOR RBODY atributosbodydiv MAYOR contenidobody BODYC {$$=API2.astBody($3,$5);}
;

atributosbodydiv
    : RSTYLE IGUAL IDENTIFICADOR DOSP color  {$$=API2.astAtributos($5);}
    | {$$=API2.astSinAtributos();}
;

color
    : RYELLOW {$$=COLORES.YELLOW;}
    | RGREEN {$$=COLORES.GREEN;}
    | RBLUE {$$=COLORES.BLUE;}
    | RRED {$$=COLORES.RED;}
    | RWHITE {$$=COLORES.WHITE;}
    | RSKYBLUE {$$=COLORES.SKYBLUE;}
;

contenidobody
    : contenidobody lcontenido {$1.push($2);  $$ = $1;}
    | lcontenido {$$ = [$1];}
;

lcontenido
    : div {$$=$1;}
    | br {$$=$1;}
    | p {$$=$1;}
    | hs {$$=$1;}
    | button {$$=$1;}
    | label {$$=$1;}
    | input {$$=$1;}
;

div
    :  MENOR RDIV atributosbodydiv MAYOR contenidobody DIVC {$$=API2.astDiv($3,$5);}
;

br
    : RBR {$$=API2.astBr();}
;

p
    : RPA IDENTIFICADOR RPC {$$=API2.astP($2);}
;

hs
    : H1A IDENTIFICADOR H1C {$$=API2.asth1($2);}
    | H2A IDENTIFICADOR H2C {$$=API2.asth2($2);}
    | H3A IDENTIFICADOR H3C {$$=API2.asth3($2);}
    | H4A IDENTIFICADOR H4C {$$=API2.asth4($2);}
;

button
    : BUTTONA IDENTIFICADOR BUTTONC {$$=API2.astbutton($2);}
;

label
    : LABELA IDENTIFICADOR LABELC {$$=API2.astlabel($2);}
;

input
    : INPUTA {$$=API2.astinput("CAJA INPUT");}
;

contenidoinput
    :   IDENTIFICADOR {$$=API2.astContenidoI($1);}
    | {$$=API2.astContenidoI("Vacio");}
;