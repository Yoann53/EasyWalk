/**
 * @author Yoann GAUCHARD
 */

//User Class

//constructor
function User(id,login,password,username) {
	this.id = id;
    this.login = login;
    this.password = password;
    this.username = username;
}

//methods
User.prototype.persist = function() {
	var curUser = {
		id:this.id,
		login:this.login,
		password:this.password,
		username:this.username
	}
	Ti.App.Properties.setString('curUser', JSON.stringify(curUser));
}

//accessors
User.prototype.getId = function() {
    return this.id;
};

User.prototype.setId= function(id) {
    this.id = id;
};

User.prototype.getLogin = function() {
    return this.login;
};

User.prototype.setLogin = function(login) {
    this.login = login;
};

User.prototype.getPassword = function() {
    return this.password;
};

User.prototype.setPassword = function(password) {
    this.password = password;
};


User.prototype.getUsername = function() {
    return this.username;
};

User.prototype.setUsername = function(username) {
    this.username = username;
};

module.exports = User;