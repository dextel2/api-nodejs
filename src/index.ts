import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from 'mongoose';
import Bluebird from "bluebird";

const app = express();

app.use(cors({
	credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
	console.log('Server running on port http://localhost:8080');
});



const DATABASE = 'mongodb+srv://yash:lRjqFnM9j1PJYDzn@cluster0.ymgkfim.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(DATABASE)
	.then(() => console.log('DB Connected'))
	.catch(() => console.warn('Something went wrong'));
mongoose.connection.on('error', (error: Error) => console.log(error));
