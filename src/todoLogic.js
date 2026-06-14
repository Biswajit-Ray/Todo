import { AppState } from './state.js';
import { renderTodoList } from "./render.js";

export function hello() { 
    console.log("Hello!"); 
}

export class TodoMaker {

    constructor(title, priority, dueDate, description, projectArray = [], urgency = 4) {
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.description = description;
        this.urgency = urgency; // Now this works
        this.descendent = [...new Set(["all", ...projectArray])]; 
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

// 1. Accept the optional taskToEdit parameter
export function renderTODOForm(taskToEdit = null) {
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

    const Selections = TODODialog.querySelector("#formProjectSelections");
    const optionsWrapper = document.createElement("div");
    optionsWrapper.classList.add("project-options-container");

    const allOptions = AppState.projects.map(project => project.name);

    for (let projectName of allOptions) {
        const optionDiv = document.createElement("div");

        const checkboxBtn = document.createElement("input");
        checkboxBtn.type = "checkbox"; 
        checkboxBtn.name = "projectAssignment";
        checkboxBtn.value = projectName;
        checkboxBtn.id = `form-proj-${projectName.replace(/\s+/g, '-')}`; 

        const optionLabel = document.createElement("label");
        optionLabel.htmlFor = checkboxBtn.id;
        optionLabel.textContent = projectName;

        optionDiv.append(checkboxBtn, optionLabel);
        optionsWrapper.appendChild(optionDiv);
    }

    Selections.appendChild(optionsWrapper);

    // --- PRE-FILL LOGIC FOR EDITING ---
    if (taskToEdit) {
        // Change text to reflect "Edit" mode
        TODODialog.querySelector("legend").textContent = "Edit your task:";
        TODODialog.querySelector("#submitbtn").textContent = "Update Task";

        // Pre-fill text and dates
        TODODialog.querySelector("#todo-title").value = taskToEdit.title;
        TODODialog.querySelector("#dueDate").value = taskToEdit.dueDate;
        TODODialog.querySelector("#description").value = taskToEdit.description;

        // Pre-select the correct urgency (Fallback to '4' / Medium for older tasks)
        const savedUrgency = taskToEdit.urgency || 4; 
        const urgencyRadio = TODODialog.querySelector(`input[name="urgency"][value="${savedUrgency}"]`);
        if (urgencyRadio) urgencyRadio.checked = true;

        // Pre-check the correct project boxes
        const checkboxes = TODODialog.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            if (taskToEdit.descendent.includes(cb.value)) {
                cb.checked = true;
            }
        });
    }

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
        
        // Grab current values from the form
        const title = TODODialog.querySelector("#todo-title").value;
        const dueDate = TODODialog.querySelector("#dueDate").value;
        const description = TODODialog.querySelector("#description").value;
        const urgency = Number(TODODialog.querySelector('input[name="urgency"]:checked').value);
        const selectedProjectsArray = Array.from(
            TODODialog.querySelectorAll('input[type="checkbox"]:checked')
        ).map(cb => cb.value);
    
        const daysLeft = getDaysDifference(dueDate);
        const calculatedPriority = priorityCalculator(daysLeft, urgency);

        // --- SPLIT SAVE LOGIC (UPDATE vs CREATE) ---
        if (taskToEdit) {
            // Update the existing object directly in AppState
            taskToEdit.title = title;
            taskToEdit.dueDate = dueDate;
            taskToEdit.description = description;
            taskToEdit.urgency = urgency;
            taskToEdit.priority = calculatedPriority;
            taskToEdit.descendent = [...new Set(["all", ...selectedProjectsArray])];
        } else {
            // Create a brand new task (passing urgency as the 6th parameter)
            const newTODO = new TodoMaker(title, calculatedPriority, dueDate, description, selectedProjectsArray, urgency);
            AppState.todos.push(newTODO); 
        }
        
        // Save to LocalStorage & Refresh the UI
        AppState.saveData();          
        renderTodoList();             
        
        TODODialog.close();
        TODODialog.remove();
    });
}