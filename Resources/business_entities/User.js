/**
 * @author Yoann GAUCHARD
 */

//User Class

//constructor
function User(login,password,username) {
    this.login = login;
    this.password = password;
    this.username = username;
}

//accessors
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