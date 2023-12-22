import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

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

const DB_USERNAME = `${process.env.DATABASE}`.replace('<username>', process.env.CLUSTER_USERNAME);
const DB_PASSWORD = `${process.env.DATABASE}`.replace('<password>', process.env.CLUSTER_PASSWORD);

const DATABASE = 'mongodb+srv://yash:lRjqFnM9j1PJYDzn@cluster0.ymgkfim.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(DATABASE, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

