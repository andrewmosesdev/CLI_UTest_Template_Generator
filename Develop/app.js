const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const questionPrompts = [
{
    type: "list",
    name: "role",
    message: "Choose role to add to team:",
    choices: ["Engineer", "Intern", "Manager"],
},
{
    type: "input",
    name: "name",
    message: "Enter name:",
    // when: answers => answers.role === "Engineer" || answers.role === "Intern" || answers.role === "Manager"

},
{
    type: "input",
    name: "email",
    message: "Enter email address:",
    // when: answers => answers.role === "Engineer" || answers.role === "Intern" || answers.role === "Manager"

},
{
    type: "number",
    name: "id",
    message: "Enter ID number:",
    // when: answers => answers.role === "Engineer" || answers.role === "Intern" || answers.role === "Manager"

},
{
    type: "input",
    name: "github",
    message: "Enter GitHub URL:",
    when: answers => {
        return answers.role === "Engineer"
    }    
},
{
    type: "input",
    name: "school",
    message: "Enter current school:",
    when: answers => {
        return answers.role === "Intern"
    }
},
{
    type: "number",
    name: "officeNumber",
    message: "Enter office number:",
    when: answers => {
        return answers.role === "Manager"
    }
},
{
    type: "confirm",
    name: "repeatPrompt",
    message: "Would you like to add another employee?",
    default: true,
}];

buildTeam();

async function buildTeam() {
// Write code to use inquirer to gather information about the development team members,
await inquirer
    .prompt(questionPrompts)
    .then(answers => {

        // create new instance of engineer giving values of engineer responses, then push to employees array
        if(answers.role === "Engineer") {
        const newEngineerInstance = new Engineer(answers.name, answers.email, answers.id, answers.role, answers.github);
        // console.log(newEngineerInstance);
        employees.push(newEngineerInstance)
        } 
        else if(answers.role === "Manager") {
        // create new instance of manager giving values of engineer respones, then push to employees array
        const newManagerInstance = new Manager(answers.name, answers.email, answers.id, answers.role, answers.officeNumber);
        // console.log(newManagerInstance);
        employees.push(newManagerInstance);
        } 
        else if(answers.role === "Intern") {
        // create new instance of intern giving values of engineer responses, then push to employees array
        const newInternInstance = new Intern(answers.name, answers.email, answers.id, answers.role, answers.school);
        // console.log(newInternInstance);
        employees.push(newInternInstance);
        }
        // create a new employee instance if desired, or end the prompt sequence
        if(answers.repeatPrompt) {
            buildTeam()
        } else {
            console.log("Your team has been created.");
            console.log(employees);
        }
    })
    .catch((error) => {
        console.log(error)
    });
    
};

    // need to create a different array to push the information collected to, then pass that to render function

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// fs.appendFile(render(employees));

render(employees)

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
