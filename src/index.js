import { AppState } from './state.js';
import { renderProjectList, renderTodoList } from './render.js'; 
import { initializeEventListeners } from './EventListener.js';
import { renderMotivation } from './motivationLogic.js';
import { seedDemoData } from './state.js';

import "./style.css";

seedDemoData();

// --- Boot Sequence ---
AppState.loadData();

// Render the UI
renderMotivation();
renderProjectList();
renderTodoList(); 

initializeEventListeners();