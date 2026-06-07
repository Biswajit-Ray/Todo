import { AppState } from './state.js';
import { renderTodoList } from "./render.js";

export function hello() { 
    console.log("Hello!"); 
}

export class TodoMaker {
    // Added a default value to parentProject so it doesn't break if left empty
    constructor(title, priority, dueDate, description, projectArray = [], parentProject = "Ian") {
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.description = description;
        this.descendent = [...new Set(["all", parentProject, ...projectArray])]; 
    }
}

export function getDaysDifference(dueDate) {
    const date1 = new Date(dueDate);
    const date2 = new Date();
    
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    
    const diffsinMS = date1 - date2;
    const daysinMS = 1000 * 3600 * 24;
    
    return diffsinMS / daysinMS;
}

export function priorityCalculator(days, urgency) {
    const safeDays = days === 0 ? 1 : Math.abs(days);
    return Math.floor((urgency / (safeDays * safeDays)) * 1000);
}

export function renderTODOForm() {
    const TODODialog = document.createElement('dialog');
    TODODialog.innerHTML = `
    <form id="todo-form">
        <fieldset class="todo-fieldset">
            <legend>Please enter your todo's details:</legend>
            <div class="todoformElement">
                <label for="todo-title">Title</label><input id="todo-title" type="text" required>
            </div>
            <div class="todoformElement">
                <label for="dueDate">Date</label><input id="dueDate" type="date" required>
            </div>
            <div class="todoformElement">
                <fieldset>
                    <legend>Select urgency of your Task</legend>
                    <div><input type="radio" id="extreme" name="urgency" value="10000" required><label for="extreme">Extreme💀</label></div>
                    <div><input type="radio" id="high" name="urgency" value="8"><label for="high">High😫</label></div>
                    <div><input type="radio" id="medium" name="urgency" value="4"><label for="medium">Medium👍</label></div>
                    <div><input type="radio" id="low" name="urgency" value="2"><label for="low">Low😎</label></div>
                </fieldset>
            </div>
            <div class="todoformElement">
                <label for="description">Description</label><textarea placeholder="I will fail the exams if it doesn't get done." id="description"></textarea>
            </div>
            <div class="todoformElement">
                <fieldset id="formProjectSelections">
                    <legend>Assign to Projects</legend>
                    </fieldset>
            </div>
            <div class="todoformElement">
                <button type="button" id="closeBTN">Close</button>
                <button type="reset" id="ResetBTN">Reset</button>
                <button type="submit" id="submitbtn">Submit</button>
            </div>
        </fieldset>
    </form>
    `;

    // 1. Get the fieldset we just created in the HTML above
    const Selections = TODODialog.querySelector("#formProjectSelections");

    // 2. Create the scrollable wrapper class for our CSS
    const optionsWrapper = document.createElement("div");
    optionsWrapper.classList.add("project-options-container");

    // 3. Gather your projects (We include "all" as the default option)
    const allOptions = ["all", ...AppState.projects.map(project => project.name)];

    // 4. Loop through and create the checkboxes
    for (let projectName of allOptions) {
        const optionDiv = document.createElement("div");

        const checkboxBtn = document.createElement("input");
        checkboxBtn.type = "checkbox"; 
        checkboxBtn.name = "projectAssignment";
        checkboxBtn.value = projectName;
        // Generate a safe ID without spaces
        checkboxBtn.id = `form-proj-${projectName.replace(/\s+/g, '-')}`; 
        
        // Check "all" by default
        if (projectName === "all") checkboxBtn.checked = true;

        const optionLabel = document.createElement("label");
        optionLabel.htmlFor = checkboxBtn.id;
        optionLabel.textContent = projectName === "all" ? "All Tasks 🌍" : projectName;

        // Append inputs to the mini-container
        optionDiv.append(checkboxBtn, optionLabel);
        
        // Append the mini-container to the WRAPPER (Not the fieldset directly!)
        optionsWrapper.appendChild(optionDiv);
    }

    // 5. Append the fully loaded wrapper into the fieldset
    Selections.appendChild(optionsWrapper);

    document.body.appendChild(TODODialog);
    TODODialog.showModal();

    const closeBTN = TODODialog.querySelector("#closeBTN");
    closeBTN.addEventListener("click", () => {
        TODODialog.close();
        TODODialog.remove();
    });
    
    const TODOForm = TODODialog.querySelector("#todo-form");    
    TODOForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const title = TODODialog.querySelector("#todo-title").value;
        const dueDate = TODODialog.querySelector("#dueDate").value;
        const description = TODODialog.querySelector("#description").value;
        
        // This continues to work perfectly since we kept input[type="checkbox"]
        const selectedProjectsArray = Array.from(
            TODODialog.querySelectorAll('input[type="checkbox"]:checked')
        ).map(cb => cb.value);

        const urgency = Number(TODODialog.querySelector('input[name="urgency"]:checked').value);
    
        const daysLeft = getDaysDifference(dueDate);
        const calculatedPriority = priorityCalculator(daysLeft, urgency);

        const newTODO = new TodoMaker(title, calculatedPriority, dueDate, description, selectedProjectsArray);
        
        // SAVE TO STATE & RE-RENDER
        AppState.todos.push(newTODO); 
        AppState.saveData();          
        renderTodoList();             
        
        TODODialog.close();
        TODODialog.remove();
    });
}