// Player status and inventory
let player = {
    name: prompt("Enter your name:"),
    health: 100,
    hunger: 0,
    thirst: 0,
    inventory: [],
    location: "Main Hosting Room"
};

const riddles = [
    {
        question: "What is the output of: typeof NaN?",
        choices: ["'number'", "'NaN'", "'undefined'", "'object'"],
        answer: 0
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        choices: ["var", "let", "const", "define"],
        answer: 2
    },
    {
        question: "What is the correct syntax for an arrow function?",
        choices: [
            "function =>() {}",
            "() -> {}",
            "() => {}",
            "() => []"
        ],
        answer: 2
    }
];

// Utility functions
function alertStatus() {
    alert(`${player.name}'s Status:\nHealth: ${player.health}\nHunger: ${player.hunger}\nThirst: ${player.thirst}\nInventory: ${player.inventory.join(", ") || "None"}`);
}

function updateStatus() {
    player.health -= 5;
    player.hunger += 5;
    player.thirst += 5;
    if (player.health <= 0) {
        alert("You died!");
        throw new Error("Game Over");
    }
}

function askRiddle() {
    let riddle = riddles[Math.floor(Math.random() * riddles.length)];
    let userAnswer = prompt(`${riddle.question}\n${riddle.choices.map((c, i) => `${i + 1}. ${c}`).join('\n')}`);
    return parseInt(userAnswer) - 1 === riddle.answer;
}

// Main Hosting Room
function mainHostingRoom() {
    alert("You are in the Main Hosting Room. There is food and water, but you must solve a JavaScript riddle to access it.");
    if (askRiddle()) {
        alert("Correct! You can take one bottle of water and one food.");
        player.inventory.push("water", "food");
    } else {
        alert("Wrong answer! No food or water for you.");
    }
    chooseNextAction();
}

// Food/Drink usage
function eatOrDrink() {
    let choice = prompt("Type 'eat' to eat or 'drink' to drink.");
    if (choice === "eat" && player.inventory.includes("food")) {
        player.hunger -= 20;
        player.inventory.splice(player.inventory.indexOf("food"), 1);
    } else if (choice === "drink" && player.inventory.includes("water")) {
        player.thirst -= 20;
        player.inventory.splice(player.inventory.indexOf("water"), 1);
    } else {
        alert("You don't have that!");
    }
    chooseNextAction();
}

// Corridor path
function corridor() {
    let choice = prompt("You find 3 rooms. Type '1', '2', or '3'. Type 'back' to return.");
    if (choice === "1") {
        alert("You found a pink object.");
        player.inventory.push("pink object");
    } else if (choice === "2") {
        if (prompt("A monster! Fight or run?").toLowerCase() === "fight") {
            let damage = player.inventory.includes("weapon") ? 10 : 30;
            player.health -= damage;
            alert(`You fought bravely. Lost ${damage} health.`);
        } else {
            player.health -= 40;
            alert("You ran and lost 40 health.");
        }
    } else if (choice === "3") {
        alert("You solved a puzzle! It tells you: there’s a phone on the first floor.");
    }
    updateStatus();
    chooseNextAction();
}

// Kitchen path
function kitchen() {
    let box = prompt("You see two boxes. Choose '1' or '2'. Only one can be opened.");
    if (box === "1") {
        alert("It hurt you! -20 health.");
        player.health -= 20;
    } else {
        alert("You found a key!");
        player.inventory.push("key");
    }
    updateStatus();
    chooseNextAction();
}

// Stairs path
function stairs() {
    let path = prompt("Choose 'cellar' or 'first floor'.");
    if (path === "cellar") cellar();
    else if (path === "first floor") firstFloor();
}

function cellar() {
    if (prompt("Heavy door here. Use 'key' or 'open'?") === "key") {
        if (player.inventory.includes("key")) {
            alert("You used the key and opened the door. You found a tunnel!");
            if (prompt("Enter the tunnel? yes/no") === "yes") {
                alert("Tunnel leads you home. You win!");
                return;
            }
        } else {
            alert("You don’t have the key.");
        }
    } else {
        if (player.health > 80) {
            alert("You forced the door open and found a tunnel. You win!");
        } else {
            alert("You got exhausted and died.");
            throw new Error("Game Over");
        }
    }
    updateStatus();
    chooseNextAction();
}

function firstFloor() {
    let room = prompt("Choose room '1', '2', or '3'.");
    if (room === "1") {
        if (prompt("A monster! Fight or run?").toLowerCase() === "fight") {
            let damage = player.inventory.includes("weapon") ? 10 : 30;
            player.health -= damage;
            alert(`You fought. Lost ${damage} health.`);
        } else {
            player.health -= 40;
            alert("You ran and lost 40 health.");
        }
    } else if (room === "2") {
        if (player.inventory.includes("pink object")) {
            alert("The unicorn sees the pink object and takes you home. You win!");
            return;
        } else {
            alert("The unicorn does nothing.");
        }
    } else if (room === "3") {
        let item = prompt("Choose what to check: 'bed', 'closet', 'table'");
        if (item === "bed") {
            alert("You found a phone! You call home. You win!");
            return;
        } else {
            alert("Nothing here.");
        }
    }
    updateStatus();
    chooseNextAction();
}

// Game loop controller
function chooseNextAction() {
    let action = prompt("Where do you go? Type 'status', 'eat', 'corridor', 'kitchen', 'stairs', or 'back'.");

    switch (action) {
        case "status":
            alertStatus();
            break;
        case "eat":
            eatOrDrink();
            break;
        case "corridor":
            corridor();
            break;
        case "kitchen":
            kitchen();
            break;
        case "stairs":
            stairs();
            break;
        case "back":
            alert("You go back to the hall.");
            break;
        default:
            alert("Invalid choice.");
    }

    chooseNextAction();
}

// Start the game
mainHostingRoom();
