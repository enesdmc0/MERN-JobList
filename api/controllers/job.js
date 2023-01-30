import Job from '../models/Job.js';

// POST JOB
export const postJob = async (req, res) => {
    const newJob = new Job(req.body);
    try{
        if (!newJob.job || !newJob.priority){
            return res.status(404).json("All fields are required!");
        }
        const savedJob = await newJob.save();
        res.status(200).json(savedJob);
    }catch (err){
        console.log(err);
    }
}

// DELETE JOB
export const deleteJob = async (req, res) => {
    try{
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json("Job has been deleted...");
    }catch (err){
        console.log(err);
    }
}

// UPDATE JOB
export const updateJob = async (req,res) => {
    try{
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedJob);
    }catch (err){
        console.log(err);
    }
}

// GET JOB
export const getJob = async (req, res) => {
    try{
        const job = await Job.findById(req.params.id);
        res.status(200).json(job);
    }catch (err){
        console.log(err);
    }
}

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
   try{
       const allJobs = await Job.find();
       res.status(200).json(allJobs);
   }catch (err){
       console.log(err);
   }
}