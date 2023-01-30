import express from 'express';
import {deleteJob, getAllJobs, getJob, postJob, updateJob} from '../controllers/job.js';
const router = express.Router();


//POST
router.post("/", postJob);
//DELETE
router.delete("/:id", deleteJob);
//UPDATE
router.put("/:id", updateJob);
//GET
router.get("/:id", getJob);
//GET ALL
router.get("/", getAllJobs);


export default router;