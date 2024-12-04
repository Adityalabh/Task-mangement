import express from "express";
import { addTask, deleteTask, editTask, getAllTask, getTaskById, markTaskCompleted } from "../controllers/taskControl.js";
const router = express.Router();

router.route('/addTask').post(addTask);
router.route('/editTask/:id').put(editTask);
router.route('/deleteTask/:id').delete(deleteTask);
router.route('/statusUpdate/:id').post(markTaskCompleted);
router.route('/myTask').get(getAllTask);
router.route('/taskById/:id').get(getTaskById);
export default router;