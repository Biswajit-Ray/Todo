console.log("index.js working nice and smooth");
import { renderProjectForm } from "./ProjectLogic.js";
import { renderTODOForm } from "./TodoLogic.js";

const newProjectBTN= document.getElementById('AddProjectbtn');
newProjectBTN.addEventListener("click", (e)=>{

    renderProjectForm();
});

const newTODObtn= document.getElementById('AddTODObtn');
newTODObtn.addEventListener('click', (e)=>{
    renderTODOForm();
})

const names = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Ethan",
  "Fiona",
  "George",
  "Hannah",
  "Ian",
  "Julia"
];

if(!localStorage.getItem("listOfProjects")) localStorage.setItem("listOfProjects", JSON.stringify(names))