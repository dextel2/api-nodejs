import { register } from "./controller/authenticate";
import { Express, Request, Response } from "express";

const routes = (app: Express) => {
	/**
	  * @openapi
	  * /healthcheck:
	  *  get:
	  *     tags:
	  *     - Healthcheck
	  *     description: Responds if the app is up and running
	  *     responses:
	  *       200:
	  *         description: App is up and running
	  */
	app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));


	/**
	* @openapi
	* /auth/register:
	*   post:
	*     tags:
	*       - Authentication
	*     description: Register a new user
	*     requestBody:
	*       required: true
	*       content:
	*         application/json:
	*           schema:
	*             type: object
	*             properties:
	*               email:
	*                 type: string
	*               password:
	*                 type: string
	*     responses:
	*       '200':
	*         description: Successful registration
	*       '400':
	*         description: Invalid request
	*/

	app.post('/auth/register', register);

};

export default routes;