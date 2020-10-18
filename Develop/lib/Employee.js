// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;

    }
    getRole() {
        return "Employee";
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
        // return 100
    }
    getEmail() {
        return this.email;
        // return "test@test.com"
    }
};

module.exports = Employee;