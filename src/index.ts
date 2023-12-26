import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from 'mongoose';
import routes from './routes';
import logger from "./utils/log";
import swaggerDocs from './utils/swagger';

const app = express();
const port = 8080;

app.use(cors({
	credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const DATABASE = 'mongodb+srv://yash:lRjqFnM9j1PJYDzn@cluster0.ymgkfim.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(DATABASE)
	.then(() => console.log('DB Connected'))
	.catch(() => console.warn('Something went wrong'));
mongoose.connection.on('error', (error: Error) => console.log(error));

app.listen(port, async () => {
	logger.info(`App is running at http://localhost:${port}`);

	routes(app);

	swaggerDocs(app, port);
});