"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const parser = require('./g').parser;
const parser2 = require('./g2').parser;
var fs = require('fs');
const indexRoutes_1 = __importDefault(require("./Routes/indexRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.get('/api/datos', function (req, res) {
            let json2 = {
                name: "JUAN LUIS ROBLES MOLINA",
                carne: "201503608"
            };
            console.log("JUAN LUIS ROBLES MOLINA 201503608");
            return res.json(json2);
        });
        this.app.post('/Analizador', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                //let entrada = fs.readFileSync('C:\\Users\\jlrob\\OneDrive\\Documentos\\Cosas U\\compi\\Proyecto 2\\olc1Proyecto2201503608\\server\\entrada.txt');
                let archivoEnt = req.body.text;
                console.log(archivoEnt);
                const json = analisis(archivoEnt);
                let resp = {
                    mensaje: "ANALISIS TERMINADO",
                    ast: json
                };
                console.log(json);
                return res.json(resp);
            });
        });
        this.app.post('/Analizadorhtml', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                //let archivoEnt = fs.readFileSync('C:\\Users\\jlrob\\OneDrive\\Documentos\\Cosas U\\compi\\Proyecto 2\\olc1Proyecto2201503608\\server\\entrada.txt');
                let archivoEnt = req.body.text;
                console.log(archivoEnt);
                const json2 = analisishtml(archivoEnt);
                let resp = {
                    mensaje: "ANALISIS TERMINADO",
                    ast: json2
                };
                console.log(json2);
                return res.json(resp);
            });
        });
        this.app.get('/GAnalisis', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let entrada = fs.readFileSync('C:\\Users\\jlrob\\OneDrive\\Documentos\\Cosas U\\compi\\Proyecto 2\\olc1Proyecto2201503608\\server\\entrada.txt');
                //let archivoEnt = req.body.text;
                const json = analisis(entrada.toString());
                let resp = {
                    mensaje: "ANALISIS TERMINADO",
                    ast: json
                };
                console.log(json);
                return res.json(resp);
            });
        });
        this.app.get('/variables', cors_1.default(), (request, response) => {
            let lexicos = {};
            fs.readFile('./build/out/listavariables.json', 'utf-8', (err, data) => {
                if (err) {
                    let carga = {
                        status: 'error'
                    };
                    lexicos = carga;
                }
                else {
                    lexicos = JSON.parse(data);
                    return response.json(lexicos);
                }
            });
        });
        this.app.get('/errores', cors_1.default(), (request, response) => {
            let lexicos = {};
            fs.readFile('./build/out/erroresl.json', 'utf-8', (err, data) => {
                if (err) {
                    let carga = {
                        status: 'error'
                    };
                    lexicos = carga;
                }
                else {
                    lexicos = JSON.parse(data);
                    return response.json(lexicos);
                }
            });
        });
        this.app.get('/erroresSin', cors_1.default(), (request, response) => {
            let lexicos = {};
            fs.readFile('./build/out/erroresSin.json', 'utf-8', (err, data) => {
                if (err) {
                    let carga = {
                        status: 'error'
                    };
                    lexicos = carga;
                }
                else {
                    lexicos = JSON.parse(data);
                    return response.json(lexicos);
                }
            });
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("server on port ", this.app.get('port'));
        });
    }
}
function analisis(entrada) {
    try {
        let analizador = parser.parse(entrada.toString());
        let resp = {
            status: "ANALISIS CORRECTO",
            json: analizador
        };
        console.log(resp);
        return resp;
    }
    catch (e) {
        console.error(e);
        let error = {
            json: "error"
        };
        console.log(e);
        return error;
    }
}
function analisishtml(entrada) {
    try {
        let analizador = parser2.parse(entrada.toString());
        let resp = {
            status: "ANALISIS CORRECTO",
            json: analizador
        };
        return resp;
    }
    catch (e) {
        console.error(e);
        let error = {
            json: "error"
        };
        return error;
    }
}
const server = new Server();
server.start();
