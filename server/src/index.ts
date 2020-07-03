import express,{application, Application} from 'express';
import  { Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const parser = require('./g').parser;
var fs = require('fs');
import indexRoutes from './Routes/indexRoutes';

class Server{
    public app:Application;
    constructor (){
        this.app=express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port',process.env.PORT || 3000 );
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    routes():void{
        this.app.use('/',indexRoutes);
        this.app.get('/api/datos', function(req, res){
            let json2 =  {
                name: "JUAN LUIS ROBLES MOLINA",
                carne: "201503608"
            }
            console.log("JUAN LUIS ROBLES MOLINA 201503608");
           return res.json(json2);
        });
        this.app.post('/Analizador', async function(req,res){
                let entrada = fs.readFileSync('C:\\Users\\jlrob\\OneDrive\\Documentos\\Cosas U\\compi\\Proyecto 2\\olc1Proyecto2201503608\\server\\entrada.txt');
                //let archivoEnt = req.body.text;
                const json = analisis(entrada.toString());
    
                let resp = {
                    mensaje :"ANALISIS TERMINADO",
                    ast: json
                };
                console.log(json);
                return res.json(resp);
            }
        );
        this.app.get('/GAnalisis', async function(req,res){
            let entrada = fs.readFileSync('C:\\Users\\jlrob\\OneDrive\\Documentos\\Cosas U\\compi\\Proyecto 2\\olc1Proyecto2201503608\\server\\entrada.txt');
            //let archivoEnt = req.body.text;
            const json = analisis(entrada.toString());

            let resp = {
                mensaje :"ANALISIS TERMINADO",
                ast: json
            };
            console.log(json);
            return res.json(resp);
        });
        this.app.get('/erroresL', cors(), (request, response) => {
            let lexicos = {};
            let sintacticos = {};
            fs.readFile('./out/errores.json', 'utf-8', (err:any, data:any) => {
              if (err) {
                let carga = {
                  status: 'error'
                };
                lexicos = carga;
              } else {
                lexicos = JSON.parse(data);
                response.json(lexicos);
              }
            });
          });

    }
    start(): void {
        this.app.listen(this.app.get('port'),() => {

            console.log("server on port ",this.app.get('port'));
           
           });
    }

}

function analisis(entrada:String) {
    try{
        let analizador = parser.parse(entrada.toString());

        let resp={
            status : "ANALISIS CORRECTO",
            json: analizador
        }
        return resp;
    }catch(e){
        let error = {
            json : "error"
        }
        return error;
    }
}
const server = new Server();
server.start();