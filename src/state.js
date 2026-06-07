export const AppState = {
    // 1. The actual data
    projects: [],
    todos: [],
    currentCategory: "all",

    // 2. A method to load everything from localStorage ONCE when the app starts
    loadData() {
        const storedProjects = localStorage.getItem("listOfProjects");
        const storedTodos = localStorage.getItem("listOfTodos");

        this.projects = storedProjects ? JSON.parse(storedProjects) : [];
        this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    },

    // 3. A method to save the current state back to localStorage
    saveData() {
        localStorage.setItem("listOfProjects", JSON.stringify(this.projects));
        localStorage.setItem("listOfTodos", JSON.stringify(this.todos));
    }
};
