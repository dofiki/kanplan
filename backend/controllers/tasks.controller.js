import Task from "../models/tasks.model.js";
import Project from "../models/projects.model.js";

export const createTask = async(req,res)=>{
    try{
        const {name, description, contributors, projectLink, category} = req.body;
        const {projectId} = req.params;
        const userId = req.user._id; 

        //  Check if the project exists or not
        const project = await Project.findById(projectId);
        if(!project) return res.status(404).json({error:"Project not found"});

        //  Check if the user is a part of the project or not
        if(!project.users.includes(userId)){
            return res.status(403).json({error: "You are not a member of this project"})
        }

        const newTask = new Task({
            name,
            description,
            projectLink,
            category,
            contributors: [userId],
        })

        await newTask.save();

        // Add task to the project it belongs to
        project.tasks.push(newTask._id);
        await project.save(); // Added: save the project

        // replaces the ObjectId references in the contributors
        // field with the actual user documents from the database.
        await newTask.populate("contributors", "fullname username"); // Fixed: space-separated

        res.status(201).json(newTask); 
    
    }catch(error){
        console.log("Error in createTask controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getProjectTasks = async(req,res)=>{
    try{
        const {projectId} = req.params;
        const userId = req.user._id;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        if (!project.users.includes(userId)) {
            return res.status(403).json({ error: "You are not a member of this project" });
        }

         //SELECT * FROM tasks 
        // WHERE _id IN ('507f1f77bc', '608a2b88de', '712c3c99a') -> {_id:{$in:project.tasks}}
        const tasklist = await Task.find({_id:{$in: project.tasks}}) 
            .populate('contributors', 'fullname username')
            .sort({ createdAt: -1});

        res.status(200).json(tasklist);
    }catch(error){
        res.status(500).json({error: "Internal server error"});
    }
}