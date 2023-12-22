import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from 'mongoose';
import router from './router';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app = express();

app.use(cors({
	credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
	console.log('Server running on port http://localhost:8080/api/v1/');
});

// Swagger configuration
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Learninig.API',
			version: '1.0.0',
		},
		servers: [
			{
				url: 'http://localhost:8080/api/v1/',
			},
		],
	},
	// Path to the API docs
	apis: ['./router'], // Adjust the path based on your file structure
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api/v1/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));



const DATABASE = 'mongodb+srv://yash:lRjqFnM9j1PJYDzn@cluster0.ymgkfim.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(DATABASE)
	.then(() => console.log('DB Connected'))
	.catch(() => console.warn('Something went wrong'));
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/api/v1/', router());