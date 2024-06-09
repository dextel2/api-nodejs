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
const port = 9090;

app.use(cors({ credentials: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const DATABASE = 'mongodb+srv://karankey:Welcome11@cluster0.mkaewnx.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(DATABASE)
	.then(() => logger.info('DB Connected'))
	.catch(() => logger.warn('Something went wrong'));
mongoose.connection.on('error', (error: Error) => logger.error(error));

app.listen(port, async () => {
	logger.info(`App is running at http://localhost:${port}`);

	routes(app);

	swaggerDocs(app, port);
});