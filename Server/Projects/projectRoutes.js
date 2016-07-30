var Project = require('./projectModel');
var User = require('../users/userModel');
var jwt = require('jwt-simple');
var secret = process.env.SECRET || 'whatyoudontlikefalafel';

module.exports = {
  //get tasks
  getTasks: function (req, res) {
    var id = req.params.id;
    Project.findById(id, function(err, project) {
      if (err) {
        res.send(500);
      } else {
        res.json(project.tasks);
      }
    });
  },

  addTask: function (req, res) {
    var id = req.params.id;
    var newTask = req.body;

    Project.findById(id, function (err, project) {
      if (err) {
        res.send(404);
      } else {
        project.tasks.push(newTask);
        project.save();
        res.json(newTask);
      }
    });
  },
  // Id still needed but needs to be in the JSON
  updateTask: function (req, res) {
    var updates = req.body;
    var projectId = req.params.id;
    var taskId = updates._id;

    Project.findById(projectId, function(err, project) {
      project.tasks.forEach(function (task, i) {
        var id = task._id.toString();

        if (id === taskId) {
          project.tasks[i] = updates;
          project.save();
          res.json(updates);
        }
      });
    });
  },

  createProject: function (req, res) {
    var projectName = req.body.projectName;
    var username = jwt.decode(req.headers['x-access-token'], secret).username;

    Project.create({ name: projectName, tasks: [], users: [username] }, function (err, project) {
      if (err) {
        res.send(201);
      } else {
        res.json(project);
      }
    });
  },

  getProject: function (req, res) {
    var id = req.params.id;

    Project.findById(id, function(err, project) {
      if (err) {
        res.send(404);
      } else {
        res.json(project);
      }
    });
  },

  addUserToProject: function (req, res) {
    var id = req.params.id;
    var username = req.body.username;

    Project.findById(id, function (err, project) {
      // check whether the project exists
      if (err) {
        res.status(404).json('Project does not exist');
      } else {
        // check whether the user is already in project's users array
        if (project.users.indexOf(username) !== -1) {
          res.status(409).json('User already is included in project');
        } else {
          // check if user exists in database
          // if they don't, send an error, otherwise add user to project
          User.findOne({ username: username }, function (err, user) {
            if (!user) {
              res.status(404).json('User does not exist');
            } else {
              project.users.push(username);
              project.save();
              res.status(200).json('User added successfully');
            }
          });
        }
      }
    });
  }
}
