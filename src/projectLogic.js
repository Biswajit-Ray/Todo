import { AppState } from './state.js'; 
import { renderProjectList } from './render.js'

export class ProjectMaker {
    constructor(name, note = "") {
        this.name = name;
        this.note = note;
    }
}

export function renderProjectForm() {
    const projectDialog = document.createElement('dialog');
    
    projectDialog.innerHTML = `
    <form id="ProjectForm">
        <h3 style="margin-bottom: 2rem; color: var(--dominant-color);">New Project</h3>
        
        <div class="projectformElement" style="margin-bottom: 1.5rem;">
            <label for="new-project-name">Name</label>
            <input id="new-project-name" type="text" placeholder="e.g. Work, Gym, Travel" required>
        </div>

        <div class="projectformElement" style="margin-bottom: 1.5rem;">
            <label for="new-project-note">Note</label>
            <textarea id="new-project-note" placeholder="What is this project about?"></textarea>
        </div>

        <div class="projectformElement">
            <button type="button" id="closeProjBTN">Close</button>
            <button type="submit">Create Project</button>
        </div>
    </form>
    `;

    document.body.appendChild(projectDialog);
    projectDialog.showModal();

    // Close logic
    const closeBtn = projectDialog.querySelector("#closeProjBTN");
    closeBtn.addEventListener("click", () => {
        projectDialog.close();
        projectDialog.remove();
    });

    // Submit logic
    const form = projectDialog.querySelector("#ProjectForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        //Scope the search safely inside the form we just submitted
        const name = form.querySelector("#new-project-name").value;
        const note = form.querySelector("#new-project-note").value;

        // Save logic
        AppState.projects.push({ name, note });
        AppState.saveData();
        
        renderProjectList();

        projectDialog.close();
        projectDialog.remove();
    });
}