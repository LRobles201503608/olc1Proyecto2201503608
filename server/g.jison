
/* Definición Léxica */
%lex

%options case-sensitive

%{
	
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
.	                {}				

/lex

%{
	
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
%start inicio

%% /* Definición de la gramática */

inicio
    : l_ins EOF {
		return $1;
	}
;

l_ins
    : l_ins ins {}
    | ins {}
;

ins
    : varaible PYCOMA {}
    | metodos_funciones {}
;    

variable 
    : declaracion {}
    | asignacion {}
;

declaracion
    : tipo ldeclaracion {}
;

ldeclaracion
    : ldeclaracion COMA IDENTIFICADOR IGUAL expresion {}
    | ldeclaracion COMA IDENTIFICADOR {}
    | IDENTIFICADOR IGUAL expresion {}
    | IDENTIFICADOR {}
;

asignacion
    : IDENTIFICADOR IGUAL expresion {}
    | actualizar {}
;

tipo
    : RINT {}
    | RCHAR {}
    | RBOOLEAN {}
    | RDOUBLE {}
    | RSTRING {}
    | VOID {}
    | error {}
;

actualizar
    : IDENTIFICADOR INCREMENTO {}
    | IDENTIFICADOR DECREMENTO {}
    | error {}
;

expresion
    : MENOS expresion %prec UMENOS {}
    | ENTERO {}
    | CHAR {}
    | TRUE {}
    | FALSE {}
    | DECIMAL {}
    | CADENA {}
    | IDENTIFICADOR {}
    | actualizar {}
    | expresion MAS expresion {}
    | expresion menos expresion {}
    | expresion POR expresion {}
    | expresion DIVIDIDO expresion {}
    | expresion POT expresion {}
    | expresion MOD expresion {}
    | PARENTA expresion PARENTC {}
    | expresion AND expresion {}
    | expresion OR expresion {}
    | NOT expresion {}
    | expresion DIF expresion {}
    | expresion MAYIGU expresion {}
    | expresion MENIGU expresion {}
    | expresion MAY expresion {}
    | expresion MEN expresion {}
    | llamada_metodo {}
    | error {}
;

llamada_metodo 
    :  IDENTIFICADOR PARENTA PARENTC {}
    | IDENTIFICADOR PARENTA parametros PARENTC
    | error {}
;

metodos_funciones
    : tipo IDENTIFICADOR PARENTA parametros PARENTC LLA instrucciones_funciones LLC {}
    | tipo IDENTIFICADOR PARENTA parametros PARENTC LLA LLC {}
    | tipo IDENTIFICADOR PARENTA PARENTC LLA instrucciones_funciones LLC {}
    | tipo IDENTIFICADOR PARENTA PARENTC LLA LLC { }
    | error {}
;

parametros 
    : parametros COMA definicion_parametros {}
    | definicion_parametros {}
;

definicion_parametros
    : tipo IDENTIFICADOR {}
    | error {}
;

instrucciones_funciones
    : instrucciones_funciones instru_f {}
    | instru_f {}
;    

instru_f
    : varaible PYCOMA {}
    | sentencias {}
    | BREAK PYCOMA {}
    | CONTINUE PYCOMA {}
    | retorno PYCOMA{}
    | imprimir PYCOMA{}
    | error {}
;

sentencias
    : sentenciafor {}
    | sentenciawhile {}
    | sentenciadowhile {}
    | sentenciaif {}
    | sentenciaswitch {}
;

sentenciafor
    : FOR PARENTA varaible PYCOMA expresion PYCOMA asignacion PARENTC cuerposentencia {}
;

sentenciawhile
    :   WHILE PARENTA expresion PARENTC cuerposentencia {}
;

sentenciadowhile
    :   DO cuerposentencia WHILE PARENTA expresion PARENTC {}
;

sentenciaif 
    : IF PARENTA expresion PARENTC cuerposentencia selse {}
    | IF PARENTA expresion PARENTC cuerposentencia selseif {}
    | IF PARENTA expresion PARENTC cuerposentencia {}
    | IF PARENTA expresion PARENTC cuerposentencia selseif selse {}
;

selse
    : ELSE cuerposentencia {}
;

selseif 
    : selseif sinosi {}
    | sinosi {}
;

sinosi 
    : ELSE IF PARENTA expresion PARENTC cuerposentencia {}
;

sentenciaswitch
    : SWITCH PARENTA expresion PARENTC LLA listacase LLC {}
;

listacase
    : listacase cases {}
    | cases {}
;

cases
    : CASE expresion DOSP instrucciones_funciones {}
    | CASE expresion DOSP {}
    | DEFAULT DOSP instrucciones_funciones {}
    | DEFAULT DOSP {}
;

cuerposentencia
    : LLA instrucciones_funciones LLC {}
    | LLA LLC {}
;

retorno
    : RETURN expresion {}
;

imprimir
    : PRINT PARENTA CADENA PARENTC {}
;
