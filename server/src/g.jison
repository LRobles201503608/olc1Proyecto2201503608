
/* Definición Léxica */
%lex

%options case-sensitive

%{
	const LERRORES	= require('./ast').LERRORES;
%}

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"String"			return 'RSTRING';
"int"		    	return 'RINT';
"double"			return 'RDOUBLE';
"boolean"			return 'RBOOLEAN';
"char"			    return 'RCHAR';
"do"                return 'DO';
"while"			    return 'WHILE';
"if"				return 'IF';
"else"				return 'ELSE';
"for"				return 'FOR';
"switch"			return 'SWITCH';
"case"				return 'CASE';
"default"			return 'DEFAULT';
"break"				return 'BREAK';
"continue"          return 'CONTINUE';
"return"            return 'RETURN';
"void"              return 'VOID';
"true"              return 'TRUE';
"false"             return 'FALSE';
"Console.Write"     return 'PRINT';
"class"             return 'RCLASS'

":"					return 'DOSP';
";"					return 'PYCOMA';
"{"					return 'LLA';
"}"					return 'LLC';
"("					return 'PARENTA';
")"					return 'PARENTC';
","					return 'COMA';

"&&"				return 'AND'
"||"				return 'OR';
"!"					return 'NOT';

"++"                return 'INCREMENTO';
"--"                return 'DECREMENTO';

"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIVIDIDO';
"^"                 return 'POT';
"%"                 return 'MOD';

"<="				return 'MENIGU';
">="				return 'MAYIGU';
"=="				return 'IG';
"!="				return 'DIF';

"<"					return 'MEN';
">"					return 'MAY';
"="					return 'IGUAL';



\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';
\'[a-zA-Z]\'            return 'CHAR';
(_?[a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';


<<EOF>>				return 'EOF';
.	                { $$ = LERRORES.astErrores(LERRORES.astError(yytext , yylloc.first_line , yylloc.first_column, "Lexico")); LERRORES.astPrint($$);}				

/lex

%{
	const OPERACION	= require('./ast').OPERACION;
	const TIPO 		= require('./ast').TIPO;
	const API	= require('./ast').API;
	const LERRORES	= require('./ast').LERRORES;
    var tr = "";
    var imprimir = "";
%}


%left OR
%left AND
%left DIF IG
%left MENIGU MAYIGU MENQUE MAYQUE
%left MAS MENOS
%left POR DIVIDIDO
%left POT MOD
%right NOT
%left UMENOS
%start s

%% /* Definición de la gramática */

s
    : inicio EOF {
        return $1;
        }
;

inicio
    : clase {
		$$ = API.astArchivo ($1,tr,imprimir);
	}
;

clase
    : RCLASS IDENTIFICADOR LLA l_ins LLC {$$ = API.astClase($2 , $4) ;}
;

l_ins
    : l_ins ins {$1.push($2);  $$ = $1;}
    | ins {$$ = [$1];}
;

ins
    : variable PYCOMA {$$=$1; tr+=";";}
    | metodos_funciones {$$=$1;}
;    

variable 
    : declaracion {$$=$1;}
    | asignacion {$$=$1;}
;

declaracion
    : ldeclaracion {$$=$1;}
;

ldeclaracion
    : ldeclaracion COMA id2 {$1.push($3); $$ = $1; tr+=",";}
    | id {$$ = API.astListaDecla($1);}
;

id
    : tipo IDENTIFICADOR IGUAL expresion { $$ = API.astDeclaracion( $1 , $2 , $4 ); tr+=" var "+$2+"= "+$4;}
    | tipo IDENTIFICADOR {$$ = API.astDeclaNoVal($1,[$2]); tr+=" var "+$2;}
;

id2
    : IDENTIFICADOR IGUAL expresion {$$ = API.astAsignacion($1,$3); tr+=$1+" = ";}
    | IDENTIFICADOR {$$ = API.astIden($1); tr+=$1}
;

asignacion
    : IDENTIFICADOR IGUAL expresion {$$ = API.astAsignacion($1,$3);tr+=$1+"=";}
    | actualizar {$$=$1;}
;

tipo
    : RINT {$$ = API.astTipo(TIPO.ENTERO)}
    | RCHAR {$$ = API.astTipo(TIPO.CARACTER)}
    | RBOOLEAN {$$ = API.astTipo(TIPO.BOOLEANO)}
    | RDOUBLE {$$ = API.astTipo(TIPO.DOUBLE)}
    | RSTRING {$$ = API.astTipo(TIPO.STRING)}
    | VOID {$$ = API.astTipo(TIPO.VOID)}
    | error {$$ = LERRORES.astErroresS(RECOPILACION_ERRORES.astErrorS($1 , @1.first_line, @1.first_column, "Sintactico")); LERRORES.astPrintS($$);}
;

actualizar
    : IDENTIFICADOR INCREMENTO {$$=astIncreDecre($1,$2); tr+=$1+"++";}
    | IDENTIFICADOR DECREMENTO {$$=astIncreDecre($1,$2); tr+=$1+"--";}
    | error {$$ = LERRORES.astErroresS(RECOPILACION_ERRORES.astErrorS($1 , @1.first_line, @1.first_column, "Sintactico")); LERRORES.astPrintS($$);}
;

expresion
    : MENOS expresion %prec UMENOS {$$ = API.expresionU($2, OPERACION.NEGATIVO); tr+="-";}
    | ENTERO {$$ = API.nuevoValor(Number($1), TIPO.ENTERO); tr+=$1;}
    | CHAR {$$ = API.nuevoValor($1, TIPO.CARACTER); tr+=$1;}
    | TRUE {$$ = API.nuevoValor($1, TIPO.BOOLEANO); tr+=$1;}
    | FALSE {$$ = API.nuevoValor($1, TIPO.BOOLEANO); tr+=$1;}
    | DECIMAL {$$ = API.nuevoValor(Number($1), TIPO.DOUBLE); tr+=$1;}
    | CADENA {$$ = API.nuevoValor($1, TIPO.STRING); tr+=$1;}
    | IDENTIFICADOR {$$ = API.nuevoValor($1, TIPO.IDENTIFICADOR); tr+=$1;}
    | actualizar {$$=$1;}
    | expresion MAS expresion {$$ = API.expresion($1, $3, OPERACION.SUMA); tr+="+";}
    | expresion menos expresion {$$ = API.expresion($1, $3, OPERACION.RESTA); tr+="-";}
    | expresion POR expresion {$$ = API.expresion($1, $3, OPERACION.MULTIPLICACION);tr+="*";}
    | expresion DIVIDIDO expresion {$$ = API.expresion($1, $3, OPERACION.DIVISION);tr+="/";}
    | expresion POT expresion {$$ = API.expresion($1, $3, OPERACION.POTENCIA); tr+="^";}
    | expresion MOD expresion {$$ = API.expresion($1, $3, OPERACION.MODULO); tr+="%";}
    | PARENTA expresion PARENTC {$$=$2; tr+="("+$2+")";}
    | expresion AND expresion {$$ = API.expresion($1, $3, OPERACION.AND);tr+="and";}
    | expresion OR expresion {$$ = API.expresion($1, $3, OPERACION.OR);tr+="or";}
    | NOT expresion {$$ = API.expresionU($2, OPERACION.NOT);tr+="!";}
    | expresion DIF expresion {$$ = API.expresion($1, $3, OPERACION.NO_IGUAL);}
    | expresion MAYIGU expresion {$$ = API.expresion($1, $3, OPERACION.MAYOR_IGUAL);}
    | expresion MENIGU expresion {$$ = API.expresion($1, $3, OPERACION.MENOR_IGUAL);}
    | expresion MAY expresion {$$ = API.expresion($1, $3, OPERACION.MAYOR);}
    | expresion MEN expresion {$$ = API.expresion($1, $3, OPERACION.MENOR);}
    | expresion IG expresion {$$ = API.expresion($1, $3, OPERACION.IGUAL_IGUAL);}
    | llamada_metodo {$$=$1;}
    | error {$$ = LERRORES.astErroresS(RECOPILACION_ERRORES.astErrorS($1 , @1.first_line, @1.first_column, "Sintactico")); LERRORES.astPrintS($$);}
;

llamada_metodo 
    : IDENTIFICADOR PARENTA parametros PARENTC {$$ = API.astLlamadaM($1 , $3);}
    | error {$$ = LERRORES.astErroresS(RECOPILACION_ERRORES.astErrorS($1 , @1.first_line, @1.first_column, "Sintactico")); LERRORES.astPrintS($$);}
;

metodos_funciones
    : tipo IDENTIFICADOR PARENTA parametros PARENTC LLA instrucciones_funciones LLC {$$ = API.astFuncion($1 , $2, $4, $7);}
    | tipo IDENTIFICADOR PARENTA parametros PARENTC LLA LLC {$$ = API.astFuncion($1 , $2, $4, "vacio");}
    | tipo IDENTIFICADOR PARENTA PARENTC LLA instrucciones_funciones LLC {$$ = API.astFuncion($1 , $2, "sin parametros", $6);}
    | tipo IDENTIFICADOR PARENTA PARENTC LLA LLC {$$ = API.astFuncion($1 , $2, "sin parametros", "vacio");}
    | error {$$ = LERRORES.astErroresS(RECOPILACION_ERRORES.astErrorS($1 , @1.first_line, @1.first_column, "Sintactico")); LERRORES.astPrintS($$);}
;

parametros 
    : parametros COMA definicion_parametros {$1.push($3); $$ = $1;}
    | definicion_parametros {$$ = API.astListaP($1);}
;

definicion_parametros
    : tipo IDENTIFICADOR {$$=API.astParametro( $1 , $2);}
    | error {$$ = LERRORES.astErroresS(RECOPILACION_ERRORES.astErrorS($1 , @1.first_line, @1.first_column, "Sintactico")); LERRORES.astPrintS($$);}
;

instrucciones_funciones
    : instrucciones_funciones instru_f {$1.push($2);  $$ = $1;}
    | instru_f {$$ = [$1];}
;    

instru_f
    : variable PYCOMA {$$=$1;}
    | sentencias {$$=$1;}
    | BREAK PYCOMA {$$ = API.astBreak($1);}
    | CONTINUE PYCOMA {$$ = API.astContinue($1);}
    | retorno PYCOMA{$$=$1;}
    | imprimir PYCOMA{$$=$1;}
    | error {$$ = LERRORES.astErroresS(RECOPILACION_ERRORES.astErrorS($1 , @1.first_line, @1.first_column, "Sintactico")); LERRORES.astPrintS($$);}
;

sentencias
    : sentenciafor {$$=$1;}
    | sentenciawhile {$$=$1;}
    | sentenciadowhile {$$=$1;}
    | sentenciaif {$$=$1;}
    | sentenciaswitch {$$=$1;}
    | error {$$ = LERRORES.astErroresS(RECOPILACION_ERRORES.astErrorS($1 , @1.first_line, @1.first_column, "Sintactico")); LERRORES.astPrintS($$);}
;

sentenciafor
    : FOR PARENTA variable PYCOMA expresion PYCOMA asignacion PARENTC cuerposentencia 
    {$$=API.astFor($3,$5,$7,$9);}
;

sentenciawhile
    :   WHILE PARENTA expresion PARENTC cuerposentencia 
    {$$=API.astWhile($3,$5);}
;

sentenciadowhile
    :   DO cuerposentencia WHILE PARENTA expresion PARENTC {$$=API.astDoWhile($5,$2);}
;

sentenciaif 
    : IF PARENTA expresion PARENTC cuerposentencia {$$ = API.astIf($3, $5);} 
    | IF PARENTA expresion PARENTC cuerposentencia selse {$$=API.astElseC(API.astIf($3, $5),$6);}
    | IF PARENTA expresion PARENTC cuerposentencia selseif {$$ = API.astElseifC(API.astIf($3, $5) , $6);}
    | IF PARENTA expresion PARENTC cuerposentencia selseif selse {$$ = API.astIfCompleto(API.astIf($3, $5) , $6, $7);}
;

selse
    : ELSE cuerposentencia {$$ = API.astElse($2);}
;

selseif 
    : selseif sinosi { $1.push($2); $$ = $1;}
    | sinosi {$$ = API.astelif($1);}
;

sinosi 
    : ELSE IF PARENTA expresion PARENTC cuerposentencia {$$ = API.astElseif( $4, $6);}
;

sentenciaswitch
    : SWITCH PARENTA expresion PARENTC LLA listacase LLC {$$ = API.astSwitch($3,$6);}
;

listacase
    : listacase cases {$1.push($2); $$ = $1;}
    | cases {$$ = API.astCases($1);}
;

cases
    : CASE expresion DOSP instrucciones_funciones { $$ = API.astCase($2,$4);}
    | CASE expresion DOSP { $$ = API.astCase($2,"/");}
    | DEFAULT DOSP instrucciones_funciones {$$ = API.astDefault($3);}
    | DEFAULT DOSP {$$ = API.astDefault("/");}
;

cuerposentencia
    : LLA instrucciones_funciones LLC {$$=$2;}
    | LLA LLC {$$="/"}
;

retorno
    : RETURN expresion {$$ = API.astReturn(TIPO.ENTERO , $2);}
;

imprimir
    : PRINT PARENTA CADENA PARENTC {$$=API.astConsoleWrite($3); imprimir+=$3+"\n";}
;
