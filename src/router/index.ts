import express from "express";
import authController from "./authController";

const router = express.Router();

export default (): express.Router => {
	authController(router);
	return router;
};