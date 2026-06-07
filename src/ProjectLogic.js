import { list } from "postcss";

class ProjectMaker{
    constructor(name, note=""){
        this.name= name;
        this.note=note;
    }
}

export function renderProjectForm(){

    const ProjectDialog= document.createElement('dialog');
    ProjectDialog.innerHTML=
    `
    <form id="ProjectForm">
        <div><label for="projectName">Name:</label><input id="projectName" type="text" required></div>
        <div><label for="ProjectNote">Notes</label><input type="text" id="ProjectNote" placeholder="(Optional)"></div>
        <button type="button" id="projectcloseBTN">Close</button>
        <button type="reset"  id="projectResetBTN">Reset</button>
        <button type="submit" id="projectSubmitBTN">Submit</button>
    </form>
    `
    document.body.appendChild(ProjectDialog);

    ProjectDialog.showModal();

    const closeBTN= document.getElementById("projectcloseBTN");
    closeBTN.addEventListener("click", ()=>{
        ProjectDialog.close();
        ProjectDialog.remove();
    })
    
    const ProjectForm= ProjectDialog.querySelector("#ProjectForm");    
    ProjectForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let name= document.getElementById("projectName").value;
    let array= [];
    const newProject= new ProjectMaker(name, note);
    
    const listString= localStorage.getItem("listOfProjects");
    const listArray= listString?JSON.parse(listString): [];
    listArray.push(newProject);
    localStorage.setItem("listOfProjects", JSON.stringify(listArray));
    
    ProjectDialog.close();
    ProjectDialog.remove();
    })
}