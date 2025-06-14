import Project from '../models/projects.model.js';
import User from '../models/users.model.js';
import bcrypt from 'bcryptjs';

export const createProject = async (req, res) => {
	try {
		const { projectName, password } = req.body;
		const userId = req.user._id;

		//hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//create new project
		const newProject = new Project({
			projectName: projectName,
			password: hashedPassword,
			users: [userId],
		});

		if (newProject) {
			//save new project
			await newProject.save();

			//push project into user's project list
			await User.findByIdAndUpdate(userId, {
				$addToSet: { projects: newProject._id },
			});

			res.status(201).json(newProject);
		}
	} catch (error) {
		console.log('Error in PRJCTRL: CREATE: ', error.message);
		res.status(500).json({ error: 'Internal Server Error At PRJCTRL: CREATE' });
	}
};

export const joinProject = async (req, res) => {
	try {
		const { projectName, password } = req.body;
		const userId = req.user._id;

		//find project
		const projectToJoin = await Project.findOne({ projectName });
		if (!projectToJoin) {
			return res.status(404).json({ error: 'No Project Found' });
		}

		//compare passwords
		const isPasswordSame = await bcrypt.compare(
			password,
			projectToJoin.password
		);
		if (!isPasswordSame) {
			return res.status(401).json({ error: 'Incorrect Password' });
		}

		//add user to project's users list of not already there
		if (!projectToJoin.users.includes(userId)) {
			projectToJoin.users.push(userId);
			await projectToJoin.save();
		}

		//add project to user's project list
		await User.findByIdAndUpdate(userId, {
			$addToSet: { projects: projectToJoin._id },
		});

		res.status(200).json(projectToJoin);
	} catch (error) {
		console.log('Error in PRJCTRL: JOIN: ', error.message);
		res.status(500).json({ error: 'Internal Server Error at PRJCTRL: JOIN' });
	}
};

export const getUserProjects = async (req, res) => {
	try {
		const userId = req.user._id;
		const userWithProjects = await User.findById(userId).populate('projects');

		if (!userWithProjects) {
			return res.status(404).json({ error: 'User Not Found' });
		}

		res.status(200).json(userWithProjects.projects);
	} catch (error) {
		console.log('Error in PRJCTRL: GET: ', error.message);
		res.status(500).json({ error: 'Internal Server Error at PRJCTRL: GET' });
	}
};

export const getProjectUsers = async (req, res) => {
	try {
		const { projectId } = req.params;
		const projectWithUsers = await Project.findById(projectId).populate(
			'users'
		);

		if (!projectWithUsers) {
			return res.status(404).json({ error: 'No Project Found' });
		}
		res.status(200).json(projectWithUsers.users);
	} catch (error) {
		console.log('Error in PRJCTRL: GET USERS: ', error.message);
		res
			.status(500)
			.json({ error: 'Internal Server Error at PRJCTRL: GET USERS' });
	}
};
