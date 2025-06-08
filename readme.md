# Kanplan

A collaborative project management application that helps teams organize tasks with Kanban-style boards and automated notifications.

## Description

Kanplan is a web-based project management tool that allows users to:
- Create and join projects with password protection
- Manage tasks with different statuses (Backlog, Working, Review, Done)
- Track project progress with dashboard analytics
- Receive automatic email notifications when tasks change status
- Collaborate with team members on shared projects

## Features

- **User Authentication**: Login and registration system
- **Project Management**: Create projects or join existing ones with passwords
- **Task Management**: Add, edit, and move tasks through different workflow stages
- **Status Tracking**: Visual Kanban board with Backlog → Working → Review → Done flow
- **Dashboard Analytics**: View task completion statistics and project metrics
- **Email Notifications**: Automatic notifications when tasks are moved between statuses
- **Team Collaboration**: Assign tasks to team members and track contributors

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Email Service**: Automated notifications system
- **CORS**: Cross-origin resource sharing enabled
- **Environment**: Configurable with dotenv

## Prerequisites

Before setting up Kanplan, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) or MongoDB Atlas account
- [Git](https://git-scm.com/)

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/kanplan.git
cd kanplan
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/kanplan
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kanplan

# Server
PORT=3000
NODE_ENV=development

# Email Configuration (for notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# JWT Secret (for authentication)
JWT_SECRET=your-secret-key-here
```

### 4. Start MongoDB

If using local MongoDB:
```bash
# On macOS/Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### 5. Run the Application

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Git Workflow & Branching

### Branch Naming Convention

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - New features
- `bugfix/bug-name` - Bug fixes
- `hotfix/issue-name` - Critical fixes

### How to Create and Work with Branches

1. **Create a new feature branch:**
```bash
git checkout -b feature/task-assignment
```

2. **Make your changes and commit:**
```bash
git add .
git commit -m "Add task assignment functionality"
```

3. **Push your branch:**
```bash
git push origin feature/task-assignment
```

4. **Create a Pull Request** to merge into `develop`

5. **After approval, merge and clean up:**
```bash
git checkout develop
git pull origin develop
git branch -d feature/task-assignment
```

### Commit Message Guidelines

Use conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Example:
```bash
git commit -m "feat: add email notification system for task status changes"
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Projects
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create new project
- `POST /api/projects/join` - Join existing project

### Tasks
- `GET /api/projects/:id/tasks` - Get project tasks
- `POST /api/projects/:id/tasks` - Add new task
- `PUT /api/tasks/:id` - Update task status
- `DELETE /api/tasks/:id` - Delete task

## Project Structure

```
kanplan/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── models/               # MongoDB schemas
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── routes/               # API routes
│   ├── auth.js
│   ├── projects.js
│   └── tasks.js
├── middleware/           # Custom middleware
│   └── auth.js
├── utils/               # Utility functions
│   └── email.js
└── client/              # Frontend files (if applicable)
    ├── index.html
    ├── styles/
    └── scripts/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Follow ESLint configuration for code style
- Write unit tests for new features
- Update documentation for API changes
- Test email notifications in development mode
- Use meaningful variable and function names
- Comment complex business logic

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`

2. **Email Notifications Not Working**
   - Verify email credentials in `.env`
   - Check spam folder for test emails

3. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes: `lsof -ti:3000 | xargs kill`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please open an issue on GitHub or contact the development team.

---

**Happy Planning with Kanplan! 🚀**