

export function hello() { 
    console.log("Hello!"); 
}


export class TodoMaker {
    
    constructor(title, priority, dueDate, description, projectArray = [], parentProject="Ian") {
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.description = description;
        this.descendent = [...new Set(["all", parentProject, ...projectArray])]; 
        this.checklist = false;
    }

    checked() {
        this.checklist = true;
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
            <legend>Please enter your todo's details</legend>
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
                    <div><input type="radio" id="medium" name="urgency" value="4"><label for="medium">medium👍</label></div>
                    <div><input type="radio" id="low" name="urgency" value="2"><label for="low">low😎</label></div>
                </fieldset>
            </div>
            <div class="todoformElement">
                <label for="description">Description</label><textarea placeholder="I will fail the exams if it doesn't get done." id="description"></textarea>
            </div>
            <div class="todoformElement">
                <select name="projectList" id="projectList" multiple>

                </select>
            </div>
            <div class="todoformElement">
                <button type="button" id="closeBTN">Close</button>
                <button type="reset" id="ResetBTN">Reset</button>
                <button type="submit" id="submitbtn">Submit</button>
            </div>
        </fieldset>
    </form>
    `;

    const Selections= TODODialog.querySelector("#projectList");

    const listString= localStorage.getItem("listOfProjects");
    const listArray= JSON.parse(listString);
    console.log(listArray);
    for (let item of listArray) {
        const div = document.createElement("div");
        div.innerHTML = `<input type="checkbox" id="${item}" value="${item}">
                     <label for="${item}">${item}</label>`;
        Selections.appendChild(div);
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
        
        
        const title = TODODialog.querySelector("#todo-title").value;
        const dueDate = TODODialog.querySelector("#dueDate").value;
        const description = TODODialog.querySelector("#description").value;
        const projectDropdown = TODODialog.querySelector("#projectList");
        const selectedProjectsArray = Array.from(
            TODODialog.querySelectorAll(
                'input[type="checkbox"]:checked')).map(
                    cb => cb.value);

        const urgency = Number(TODODialog.querySelector('input[name="urgency"]:checked').value);
    
        const daysLeft = getDaysDifference(dueDate);
        const calculatedPriority = priorityCalculator(daysLeft, urgency);

       
        const projectArray = selectedProjectsArray; 
        const newTODO = new TodoMaker(title, calculatedPriority, dueDate, description, projectArray);
        
        localStorage.setItem(title, JSON.stringify(newTODO));
        
        TODODialog.close();
        TODODialog.remove();
    });
}

export const defaultList = [];