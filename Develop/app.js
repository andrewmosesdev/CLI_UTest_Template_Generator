const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
// promisify since using async/await
const newAppendFile = util.promisify(fs.appendFile)

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// create empty array "employees" to push employee instances to
const employees = [];

// create prompts for questions to be asked
const questionPrompts = [

// choose an employee type, name, email, and id
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
// engineer specific question utilizing when method
{
    type: "input",
    name: "github",
    message: "Enter GitHub URL:",
    when: answers => {
        return answers.role === "Engineer"
    }    
},
// intern specific question utilizing when method
{
    type: "input",
    name: "school",
    message: "Enter current school:",
    when: answers => {
        return answers.role === "Intern"
    }
},
// manager specific question utilizing when method
{
    type: "number",
    name: "officeNumber",
    message: "Enter office number:",
    when: answers => {
        return answers.role === "Manager"
    }
},
// confirm prompt to create another employee instance or end prompt
{
    type: "confirm",
    name: "repeatPrompt",
    message: "Would you like to add another employee?",
    default: true,
}];

// run function to begin prompt
buildTeam();

// async function to begin prompt and create team.html
async function buildTeam() {
    // await inquirer prompt to ask questions
    await inquirer
    .prompt(questionPrompts)
    .then(answers => {

        // create new instance of engineer giving values of engineer responses, then push to employees array
        if(answers.role === "Engineer") {
        const newEngineerInstance = new Engineer(answers.name, answers.id, answers.email, answers.github);
        // console.log(newEngineerInstance);
        employees.push(newEngineerInstance)
        } 
        else if(answers.role === "Manager") {
        // create new instance of manager giving values of engineer respones, then push to employees array
        const newManagerInstance = new Manager(answers.name, answers.id, answers.email,  answers.officeNumber);
        // console.log(newManagerInstance);
        employees.push(newManagerInstance);
        } 
        else if(answers.role === "Intern") {
        // create new instance of intern giving values of engineer responses, then push to employees array
        const newInternInstance = new Intern(answers.name, answers.id, answers.email, answers.school);
        // console.log(newInternInstance);
        employees.push(newInternInstance);
        }
        // create a new employee instance if desired, or end the prompt sequence
        if(answers.repeatPrompt) {
            buildTeam()
        } else {
            // otherwise, console.log and append new employee instances to team.html
            console.log("Your team has been created.");
            // console.log(employees);
            newAppendFile("team.html", render(employees))
        }
    })
    .catch((error) => {
        console.log(error)
    });
    
};