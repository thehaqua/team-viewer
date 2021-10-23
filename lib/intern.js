const Employee = require("./employee");

class Intern extends Employee {

  constructor(name, id, email, intSchool) {

    super(name, id, email);
    this.intSchool = intSchool;

  }

  getIntSchool() {

    return this.intSchool;

  }

  getJob() {

    return "Intern";

  }
}

module.exports = Intern;