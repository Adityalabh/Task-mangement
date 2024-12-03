import express from "express";
import { addTask, deleteTask, editTask, getAllTask, getTaskById, markTaskCompleted } from "../controllers/taskControl.js";
import { isAuthenticate } from "../utils/auth.js";
const router = express.Router();

router.route('/addTask').post(isAuthenticate,addTask);
router.route('/editTask/:id').put(isAuthenticate,editTask);
router.route('/deleteTask/:id').delete(isAuthenticate,deleteTask);
router.route('/statusUpdate/:id').post(isAuthenticate,markTaskCompleted);
router.route('/myTask/:id').get(isAuthenticate,getAllTask);
router.route('/taskById/:id').get(isAuthenticate,getTaskById);
export default router;