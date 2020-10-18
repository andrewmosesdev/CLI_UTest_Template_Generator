const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const newEmployeeInstance = [];

// Write code to use inquirer to gather information about the development team members,
inquirer
    .prompt([
        // and to create objects for each team member (using the correct classes as blueprints!)
        {
            type: "list",
            name: "role",
            message: "Enter Role:",
            choices: ["Employee", "Engineer", "Intern", "Manager"]
        },
        {
            type: "input",
            name: "name",
            message: "Enter name:",

        },
        {
            type: "number",
            name: "id",
            message: "Enter ID number:",
   
        },
        {
            type: "input",
            name: "email",
            message: "Enter email address:",

        },
        {
            type: "input",
            name: "github",
            message: "Enter GitHub URL?",
            // use when method, if function returns true, prompt Engineer specific question 
            when: answers => answers.role === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "Enter current school:",
            // use when method, if function returns true, prompt Inter specific question
            when: answers => answers.role === "Intern"
        },
        {
            type: "number",
            name: "officeNumber",
            message: "Enter office number:",
            // use when method, if function returns true, prompt Manager specific question
            when: answers => answers.role === "Manager"
        }
    ])
    .then(answers => {
        // render(answers);
        // create new instance of engineer giving values of engineer responses, then push to employees array
        const newEngineerInstance = new Engineer(answers.name, answers.email, answers.id, answers.role, answers.github);
        // console.log(newEngineerInstance);
        newEmployeeInstance.push(newEngineerInstance)

        // create new instance of manager giving values of engineer respones, then push to employees array
        const newManagerInstance = new Manager(answers.name, answers.email, answers.id, answers.role, answers.github);
        // console.log(newManagerInstance);
        newEmployeeInstance.push(newManagerInstance);

        // create new instance of engineer giving values of engineer responses, then push to employees array
        const newInternInstance = new Intern(answers.name, answers.email, answers.id, answers.role, answers.github);
        // console.log(newInternInstance);
        newEmployeeInstance.push(newInternInstance);
    })
    .catch((error) => {
        console.log(error)
    });

    // need to create a different array to push the information collected to, then pass that to render function

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
render(newEmployeeInstance);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
