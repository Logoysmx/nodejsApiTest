import express, { Application } from 'express';
// import indexRoutes from './routes/index.routes';
import clothingStokRoutes from './test.routes';
import morgan from 'morgan';
import cors from 'cors';

class Server {
    app: Application;

    constructor() {        
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        let options:cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: function(origin, callback) {
                const whiteList = ['http://localhost:4200', 'http://localhost', 'http://localhost:8000', 'http://localhost:4201', 'https://amazinghobbies.mx', 'https://store.amazinghobbies.mx'];
                if (typeof origin !== 'undefined') {
                    if (whiteList.indexOf(origin) !== -1 || !origin) {
                        callback(null, true);
                    } else {
                        callback(new Error('Not allowed by CORS'));
                    }                     
                } else {
                    callback(null, true);
                    // callback(new Error('Not allowed by CORS'));
                }
            },
            preflightContinue: false
        };        
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(morgan('dev'));
        this.app.use(cors(options));
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: false
        }));
    }

    routes(): void {
        this.app.use('/api', clothingStokRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();
