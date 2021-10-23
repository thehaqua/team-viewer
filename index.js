const fs = require("fs");
const inquier = require("inquirer");

let Engineer = require("./lib/engineer.js");
let Intern = require("./lib/intern.js");
let Manager = require("./lib/manager.js");

let job = "Manager";

let jobs = [];

let newJob = {
    type: "list",
    name: "newJob",
    message: "Who is your next team member?",
    choices: ["Engineer", "Intern", "None"],
};

function jobQ(e) {
    return (questions = [
        {
            name: "name",
            message: `Enter ${e}'s name.`,
        },
        {
            name: "id",
            message: `Enter ${e}'s employee ID.`,
        },
        {
            name: "email",
            message: `Please enter ${e}'s email address.`,
        },
    ])

}

let uniqueQ = [
    {
        name: "manOffice",
        message: "What number is the manager's office?",
    },
    {
        name: "engHub",
        message: "What is the engineer's Github username?",
    },
    {
        name: "intSchool",
        message: "Where does the intern go to school?"
    },
]

function inqStart() {
    let baseQ = [];
    switch (job) {

        case "Manager":
            inqManager = jobQ(job);
            baseQ = [...inqManager, uniqueQ[0], newJob];
            inquier.prompt(baseQ).then((answers) => {
                let manager = new Manager(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.manOffice
                );
                job = answers.newJob
                jobs.push(jobJumbo(manager));
                inqStart();
            })
            break;

        case "Engineer":
            inqEngineer = jobQ(job);
            baseQ = [...inqEngineer, uniqueQ[1], newJob];
            inquier.prompt(baseQ).then((answers) => {
                let engineer = new Engineer(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.engHub
                );
                job = answers.newJob
                jobs.push(jobJumbo(engineer));
                inqStart();
            })
            break;

        case "Intern":
            inqIntern = jobQ(job);
            baseQ = [...inqIntern, uniqueQ[2], newJob];
            inquier.prompt(baseQ).then((answers) => {
                let intern = new Intern(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.intSchool
                );
                job = answers.newJob
                jobs.push(jobJumbo(intern));
                inqStart();
            })
            break;

        case "None":
            jobPage();
            break;
    }

}
  


function jobJumbo(a) {

    let jobType = "";
    let jobUniqueType = "";
    let jobUnique = "";

    if (a instanceof Manager) {

        jobType = a.getJob();
        jobUniqueType = "Office Number: ";
        jobUnique = a.getManOffice();

    }
    else if (a instanceof Engineer) {

        jobType = a.getJob();
        jobUniqueType = "GitHub Username: ";
        let gitUser = a.getEngHub();
        jobUnique = `<a href="https://github.com/${gitUser}">${gitUser}</a>`

    }
    else if (a instanceof Intern) {

        jobType = a.getJob();
        jobUniqueType = "School: ";
        jobUnique = a.getIntSchool();

    }
    else {

        return;

    }

    let jumbotron =
        `
    <div class="card">
    <div class="card-header">
      <h4 class="name">${a.name}</h4>
      <h4 class="job"> ${jobType}</h4>
    </div>
    <ul class="list-group">
      <li class="list-group-item eId">ID: ${a.id}</li>
      <li class="list-group-item eEmail">Email: <a href="mailto:${a.email}">${a.email}</a></li>
      <li class="list-group-item eUnique">${jobUniqueType}${jobUnique}</li>
    </ul>
  </div>
        `

    return jumbotron;

}

function jobPage() {

    fs.readFile("./src/index.html", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            let finishTeam = jobs.toString().replace(/, /g, "");
            let result = data.toString().replace("<img>", finishTeam);
            fs.writeFile("./dist/index.html", result, "utf8", function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Team page finished.")
                }
            });
            fs.copyFile('./src/style.css', './dist/style.css', (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

function start() {
    inqStart();
}

start();