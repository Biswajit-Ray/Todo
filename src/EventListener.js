import { AppState } from './state.js';

import { renderTODOForm } from './todoLogic.js'; 
import { renderProjectForm } from './projectLogic.js';

import { renderTodoList, renderProjectList } from './render.js';

export function initializeEventListeners() {
    
    const projectListContainer = document.getElementById("projectList");
    
    if (projectListContainer) {
        projectListContainer.addEventListener("click", (e) => {
            
            // --- 1. HANDLE DELETE BUTTON CLICKS ---
            if (e.target.classList.contains("delete-project-btn")) {
                const card = e.target.closest(".project-card");
                if (!card) return;

                const projectName = card.dataset.name;

                if (confirm(`Are you sure you want to delete the project "${projectName}"?`)) {
                    
                    // A. Remove the project from the state
                    AppState.projects = AppState.projects.filter(p => p.name !== projectName);

                    // B. Clean up orphaned To-Dos! 
                    // (Removes this project's tag from all tasks so they don't break)
                    AppState.todos.forEach(todo => {
                        todo.descendent = todo.descendent.filter(tag => tag !== projectName);
                    });

                    // C. If they delete the project they are currently viewing, send them to "all"
                    if (AppState.currentCategory === projectName) {
                        AppState.currentCategory = "all";
                    }

                    // D. Save and re-render everything
                    AppState.saveData();
                    renderProjectList();
                    renderTodoList(); 
                }
                
                // CRITICAL: Stop the function here so it doesn't also trigger the filtering logic below!
                return; 
            }

            // --- 2. HANDLE NORMAL CARD CLICKS (FILTERING) ---
            const clickedCard = e.target.closest(".project-card");
            if (!clickedCard) return;

            // Update State
            AppState.currentCategory = clickedCard.dataset.name;

            // Re-render
            renderTodoList(); 
        });
    }

    // --- 2. Add Project Button ---
    const addProjectBtn = document.getElementById("AddProjectbtn");
    if (addProjectBtn) {
        addProjectBtn.addEventListener("click", () => {
            renderProjectForm();
        });
    }

    // --- 3. Add To-Do Button ---
    const addTodoBtn = document.getElementById("AddTodoBTN");
    if (addTodoBtn) {
        addTodoBtn.addEventListener("click", () => {
            renderTODOForm(); // Opens your To-Do form dialog
        });
    }

    // --- 4. Add Delete Button
    const todoSection = document.getElementById("todoList");

    if (todoSection) {
        todoSection.addEventListener("click", (e) => {
            // 1. Check if the clicked element is a delete button
            if (e.target.classList.contains("delete-btn")) {
                
                // 2. Find the parent card to get the data-title
                const card = e.target.closest(".todo-card");
                if (!card) return;

                const titleToDelete = card.dataset.title;

                // 3. Optional but highly recommended: Ask for confirmation
                if (confirm(`Are you sure you want to delete "${titleToDelete}"?`)) {
                    
                    // 4. Filter the task out of your AppState
                    AppState.todos = AppState.todos.filter(todo => todo.title !== titleToDelete);

                    // 5. Save to localStorage and update the UI
                    AppState.saveData();
                    renderTodoList(); 
                }
            }
        });
    }
}

//EventListener.js