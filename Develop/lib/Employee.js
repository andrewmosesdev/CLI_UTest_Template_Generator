// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, email, id, role) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.role = role;


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