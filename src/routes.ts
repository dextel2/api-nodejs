import { login, register } from "./controller/authenticate";
import { findByEmail } from "./controller/users";
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
	*               username:
	*                 type: string
	*     responses:
	*       '200':
	*         description: Successful registration
	*       '400':
	*         description: Invalid request
	*/

	app.post('/auth/register', register);


	/**
* @openapi
* /auth/login:
*   post:
*     tags:
*       - Authentication
*     description: Login an exsting user
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
*         description: Successful login
*       '400':
*         description: Invalid request
*       '403':
*         description: Forbidden
*/
	app.post('/auth/login', login);

	/**
	* @openapi
	* /users/findByEmail/:
	*   get:
	*     tags:
	*       - User
	*     summary: Get a user by email
	*     description: Get a user by email
	*     parameters:
	*       - in: query
	*         name: email
	*         schema:
	*           type: string
	*         required: true
	*         description: The email of the user to retrieve
	*     responses:
	*       '200':
	*         description: Success
	*       '400':
	*         description: Bad request
	*       '403':
	*         description: Forbidden
	*/
	app.get('/users/findByEmail/', findByEmail);

};

export default routes;