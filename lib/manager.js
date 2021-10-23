
const Employee = require("./employee");

class Manager extends Employee {

  constructor(name, id, email, manOffice) {

    super(name, id, email);
    this.manOffice = manOffice;

  }

  getManOffice() {
      
    return this.manOffice;

  }

  getJob() {

    return "Manager";

  }
}

module.exports = Manager;