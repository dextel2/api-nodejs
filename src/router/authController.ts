import { register } from "../controller/authenticate";
import express from "express";

export default (router: express.Router) => {
	router.post('/auth/register', register);
};