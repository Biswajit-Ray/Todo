import { AppState } from './state.js';

function projectcardMaker(name, note){
    const card = document.createElement("div");
    card.classList.add("project-card");
    
    card.dataset.name = name; 

    const projectName = document.createElement("h4");
    projectName.classList.add("projectName");
    projectName.textContent = `${name}`;
    
    const projectNote = document.createElement("p");
    projectNote.classList.add("projectNote");
    if(note){
        projectNote.textContent = `${note}`;
    }else{
        projectNote.textContent = 'No notes attached to this project';
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-project-btn", "delete-btn");
    deleteBtn.textContent = "Delete Project";

    // Append the new button along with the text
    card.append(projectName, projectNote, deleteBtn)

    return card;
}


export function renderProjectList() {
    // 1. Sort projects dynamically based on how many To-Dos they have!
    const sortedProjects = [...AppState.projects].sort((a, b) => {
        
        // Count tasks belonging to project 'a'
        const aCount = AppState.todos.filter(todo => 
            todo.descendent.includes(a.name)
        ).length;
        
        // Count tasks belonging to project 'b'
        const bCount = AppState.todos.filter(todo => 
            todo.descendent.includes(b.name)
        ).length;

        // Sort descending: highest task count goes to the top
        return bCount - aCount; 
    });

    const AddProject = document.getElementById("AddProjectbtn");
    let cardContainer = document.querySelector(".card-container");
    
    if (!cardContainer) {
        cardContainer = document.createElement('div');
        cardContainer.classList.add("card-container");
        if (AddProject) {
            AddProject.insertAdjacentElement("beforebegin", cardContainer);
        }
    }

    cardContainer.innerHTML = "";

    // 2. Loop through your newly sorted array
    for(let item of sortedProjects){
        const nodecard = projectcardMaker(item.name, item.note);
        cardContainer.appendChild(nodecard);
    }
}

function todocardMaker(title, dueDate, priority, description) {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    // CRITICAL: We store the title here so the Delete Listener can find it!
    card.dataset.title = title;

    const todoTitle = document.createElement("h4");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = `${title}`;
    
    const todoMeta = document.createElement("p");
    todoMeta.classList.add("todo-meta");
    todoMeta.innerHTML = `<strong>Due:</strong> ${dueDate}`;

    const todoDesc = document.createElement("p");
    todoDesc.classList.add("todo-desc");
    if (description) {
        todoDesc.textContent = `${description}`;
    } else {
        todoDesc.textContent = 'No description provided.';
    }

    // THE DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete Task";

    // Append the delete button along with everything else
    card.append(todoTitle, todoMeta, todoDesc, deleteBtn);

    return card;
}


export function renderTodoList() {  
    
    const currentCategory = AppState.currentCategory;

    const displayCategory = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);

    const projectNameSpan = document.getElementById("ProjectName");
    if (projectNameSpan) projectNameSpan.textContent = displayCategory;

    const allTodos = AppState.todos;
    
    const filteredList = allTodos.filter(todo => todo.descendent.includes(currentCategory));
    const sortedFilteredList = filteredList.sort((a,b) => a.priority - b.priority);

    const AddTodoBTN = document.getElementById("AddTodoBTN");
    let cardContainer = document.querySelector(".todo-card-container");
    
    if (!cardContainer) {
        cardContainer = document.createElement('div');
        cardContainer.classList.add("todo-card-container");
        if (AddTodoBTN) {
            AddTodoBTN.insertAdjacentElement("beforebegin", cardContainer);
        }
    }
    
    cardContainer.innerHTML = ""; 

    console.log(`Showing To-Dos for category: ${currentCategory}`);

    for (let item of sortedFilteredList) {
        const nodecard = todocardMaker(item.title, item.dueDate, item.priority, item.description);
        cardContainer.appendChild(nodecard);
    }
}