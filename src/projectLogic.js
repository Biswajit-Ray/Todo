import { AppState } from './state.js';

export class ProjectMaker {
    constructor(name, note = "") {
        this.name = name;
        this.note = note;
    }
}

export function renderProjectForm() {

    const ProjectDialog = document.createElement('dialog');
    ProjectDialog.innerHTML =
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

    const closeBTN = document.getElementById("projectcloseBTN");
    closeBTN.addEventListener("click", () => {
        ProjectDialog.close();
        ProjectDialog.remove();
    })
    
    const ProjectForm = ProjectDialog.querySelector("#ProjectForm");    
    ProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let name = document.getElementById("projectName").value;
        let note = document.getElementById("ProjectNote").value;
        
        const newProject = new ProjectMaker(name, note);
        
        // --- 2. THE NEW STATE METHOD ---
        AppState.projects.push(newProject); // Add the new project to the array in state
        AppState.saveData();                // Tell the state to save itself to localStorage
        renderProjectList();                // Update the UI instantly
        // -------------------------------
        
        ProjectDialog.close();
        ProjectDialog.remove();
    })
}

// (Your renderProjectList function should also be in this file as we updated it earlier!)