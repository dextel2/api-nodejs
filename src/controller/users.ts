import { getUserByEmail } from '../db/users';
import express from 'express';

export async function findByEmail(req: express.Request, res: express.Response) {
	try {
		const email = req.query.email;
		console.log(JSON.stringify(req.query.email, null, 2));
		if (typeof email !== 'string') {
			return res.sendStatus(400);
		}

		const user = await getUserByEmail(email).select('+authentication');

		if (!user) {
			return res.sendStatus(404);
		}

		return res.status(200).json(user).end();
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
}
