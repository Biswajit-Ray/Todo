// motivationLogic.js

// 1. A bank of productivity and coding quotes
const quotes = [
    "“The secret of getting ahead is getting started.” — Mark Twain",
    "“First, solve the problem. Then, write the code.” — John Johnson",
    "“Amateurs sit and wait for inspiration, the rest of us just get up and go to work.” — Stephen King",
    "“Make it work, make it right, make it fast.” — Kent Beck",
    "“Focus on being productive instead of busy.” — Tim Ferriss",
    "“It always seems impossible until it's done.” — Nelson Mandela",
    "“Small daily improvements over time lead to stunning results.” — Robin Sharma"
];

// 2. A function to pick a random quote and render it
export function renderMotivation() {
    const motivationContainer = document.getElementById("motivation");
    
    // Safety check in case the HTML element is missing
    if (!motivationContainer) return;

    // Pick a random index based on the length of the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    // Inject it into the HTML
    motivationContainer.innerHTML = `<em>${selectedQuote}</em>`;
}