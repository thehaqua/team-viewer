const Employee = require("./employee");

class Engineer extends Employee {

  constructor(name, id, email, engHub) {

    super(name, id, email);
    this.engHub = engHub;

  }

  getEngHub() {

    return this.engHub;

  }

  getJob() {

    return "Engineer";

  }
}

module.exports = Engineer;