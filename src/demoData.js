// A quick helper to always generate dates relative to "today" so the demo never looks old!
const getFutureDate = (daysAhead) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString().split('T')[0];
};

export const demoProjects = [
    { name: "Portfolio Build 🚀", note: "Tasks for getting this app ready for GitHub" },
    { name: "Health & Fitness 🏃", note: "Marathon prep and meal tracking" },
    { name: "Household 🏠", note: "Chores and upcoming bills" }
];

export const demoTodos = [
    {
        title: "Clean up CSS for final push",
        priority: 1000, // High priority
        dueDate: getFutureDate(1),
        description: "Make sure all the media queries are working and the frosted glass looks good on mobile.",
        descendent: ["all", "Ian", "Portfolio Build 🚀"]
    },
    {
        title: "Write an awesome README.md",
        priority: 500,
        dueDate: getFutureDate(3),
        description: "Include screenshots, list of technologies used (Vanilla JS, CSS Grid), and instructions on how to run it.",
        descendent: ["all", "Ian", "Portfolio Build 🚀"]
    },
    {
        title: "Meal prep for the week",
        priority: 200,
        dueDate: getFutureDate(0), // Due today!
        description: "Chicken, rice, and broccoli. Keep it simple.",
        descendent: ["all", "Ian", "Health & Fitness 🏃"]
    },
    {
        title: "Register for the 10k race",
        priority: 800,
        dueDate: getFutureDate(14),
        description: "Early bird pricing ends soon, don't forget to register!",
        descendent: ["all", "Ian", "Health & Fitness 🏃"]
    },
    {
        title: "Call the plumber",
        priority: 1000,
        dueDate: getFutureDate(2),
        description: "The sink in the guest bathroom is still leaking.",
        descendent: ["all", "Ian", "Household 🏠"]
    }
];