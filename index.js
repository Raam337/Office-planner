const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team_list = [];
const characteristic = {
    Engineer:"GitHub",
    Manager:"Office Number",
    Intern:"School",
}

inquirer.prompt([
    {
        type:"input",
        name:"name",
        message:"Enter manager name",
    },
    {
        type:"input",
        name:"id",
        message:"Enter manager's ID",
    },
    {
        type:"input",
        name:"email",
        message:"Enter manager's email",
    },
    {
        type:"input",
        name:"office",
        message:"Enter manager's office number",
    }
]).then( (ans)=>{
    team_list.push(new Manager(ans.name, ans.id, ans.email, ans.office));
    addMember();
    
});

function addMember(){
    inquirer.prompt([
        {   type:"list",
            name:"action",
            message:"Select action:",
            choices:["1. Add an engineer","2. Add an intern","3. Finish building the team"]
            },
    ]).then( (choice)=>{
        switch (choice.action[0]) {
            case `1`:
                memberPrompt("Engineer");
                break;
            case `2`:
                memberPrompt("Intern");
                break;
            case `3`:
                console.log("Finished team building");
                const finalHTML = render(team_list);
                fs.writeFile(outputPath,finalHTML,()=>{});
                break;
        }

    })
}

function memberPrompt(member){
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:`Enter ${member} name`,
        },
        {
            type:"input",
            name:"id",
            message:`Enter ${member}'s ID`,
        },
        {
            type:"input",
            name:"email",
            message:`Enter ${member}'s email`,
        },
        {
            type:"input",
            name:"extra",
            message:`Enter ${member}'s ${characteristic[member]}`,
        }
    ]).then( (ans)=>{
        team_list.push(new roleClasses[member](ans.name, ans.id, ans.email, ans.extra));
        console.log(team_list);
        addMember();
        
    })
}

const roleClasses = {
    Engineer,
    Intern
}