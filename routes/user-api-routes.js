// Detail routes to User management
var db = require("../models");
// Routes
module.exports = function(app) {
	// route to render userForm.handlebars file
	app.get("/userForm", function(req, res) {
		res.render("userForm");
	});
	// Existing user login
	app.post("/login", function(req, res) {
		console.log(req.body);
		res.redirect("/member");
	});
	// Show the signed in user details
	app.get("/userForm/:id", function(req, res) {
		db.users.findOne({
			where: {
				id: req.params.id
			},
			include: [db.myFridges]
		}).then(function(data) {
			res.json(data);
		});
	});
	// Creating a user
	app.post("/userForm/add", function(req, res) {
		console.log(req.body);
		db.users.create(req.body
			// {
			//     name: req.body.name,
			//     email: req.body.email,
			//     password: req.body.password,
			//     budget: req.body.budget
			// }
		).then(function() {
			res.redirect("/member");
		}).catch(function(error) {
			console.log(error);
		});
	}); 
	// Updating a user
	app.put("/userForm/update/:id", function(req, res) {
			var condition = "id = " + req.params.id;
			console.log("condition", condition);
			db.users.update({
				password: req.body.password
			}, {
				where: {
					id: condition
				}
			}).then(function() {
				res.redirect("/member");
			});
		})
		// Deleting a user
	app.delete("/userForm/:id", function(req, res) {
		db.users.destroy({
			where: {
				id: req.params.id
			}
		}).then(function() {
			res.render("index");
		});
	});
};