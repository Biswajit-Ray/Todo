import { AppState } from './state.js';

import { renderTODOForm } from './todoLogic.js'; 
import { renderProjectForm } from './projectLogic.js';

import { renderTodoList, renderProjectList } from './render.js';

export function initializeEventListeners() {
    
    // --- 1. Project Card Clicks (Filtering) ---
    const projectListContainer = document.getElementById("projectList");
    
    if (projectListContainer) {
        projectListContainer.addEventListener("click", (e) => {
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
}

//EventListener.js