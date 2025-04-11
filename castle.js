// Инициализация игрока
if (!window.player) {
    window.player = {
        name: prompt("Enter your name:"),
        health: 100,
        hunger: 0,
        thirst: 0,
        inventory: [],
        location: "Main Hosting Room"
    };
} else {
    player.health = player.health ?? 100;
    player.hunger = player.hunger ?? 0;
    player.thirst = player.thirst ?? 0;
    player.inventory = player.inventory ?? [];
    player.location = player.location ?? "Main Hosting Room";
}

// Проверка статуса
function checkStatus() {
    alert(
        `Name: ${player.name}\nHealth: ${player.health}\nHunger: ${player.hunger}\nThirst: ${player.thirst}\nInventory: ${player.inventory.join(", ")}`
    );
}

// Еда
function eat() {
    if (player.inventory.includes("food")) {
        player.hunger = Math.max(0, player.hunger - 20);
        player.inventory.splice(player.inventory.indexOf("food"), 1);
        alert("You ate some food. Hunger decreased.");
    } else {
        alert("You don't have food to eat.");
    }
}

// Питьё
function drink() {
    if (player.inventory.includes("water")) {
        player.thirst = Math.max(0, player.thirst - 20);
        player.inventory.splice(player.inventory.indexOf("water"), 1);
        alert("You drank water. Thirst decreased.");
    } else {
        alert("You don't have water to drink.");
    }
}

// Трата ресурсов
function consumeResources() {
    player.health -= 5;
    player.hunger += 10;
    player.thirst += 10;

    if (player.health <= 0 || player.hunger >= 100 || player.thirst >= 100) {
        alert("You have died due to poor condition.");
        throw new Error("Game Over");
    }
}

// Загадка
function solveRiddle() {
    let riddles = [
        {
            question: "What does typeof NaN return?\nA) number\nB) NaN\nC) undefined\nD) string",
            answer: "a"
        },
        {
            question: "Which keyword declares a constant in JavaScript?\nA) let\nB) const\nC) var\nD) define",
            answer: "b"
        },
        {
            question: "What is the result of '2' + 2?\nA) 4\nB) 22\nC) NaN\nD) undefined",
            answer: "b"
        }
    ];

    let riddle = riddles[Math.floor(Math.random() * riddles.length)];
    let choice = prompt(`Solve the riddle:\n${riddle.question}`);
    return choice?.toLowerCase() === riddle.answer;
}

// Начальная сцена
function mainHostingRoom() {
    alert("You are in the Main Hosting Room. Your status is refreshed.");
    player.health = 100;
    player.hunger = 0;
    player.thirst = 0;

    let tryRiddle = prompt("Do you want to solve a riddle to get supplies? (yes / no)").toLowerCase();
    if (tryRiddle === "yes") {
        if (solveRiddle()) {
            alert("Correct! You may take food and/or water.");
            let take = prompt("Take what? (food / water / both)");
            if (take === "food" || take === "both") player.inventory.push("food");
            if (take === "water" || take === "both") player.inventory.push("water");
        } else {
            alert("Wrong answer. Maybe next time.");
        }
    }

    chooseNextAction();
}

// Главное меню
function chooseNextAction() {
    consumeResources();
    let choice = prompt("Where do you want to go? (corridor / kitchen / stairs / status / eat / drink / back)").toLowerCase();

    if (choice === "status") checkStatus();
    else if (choice === "eat") eat();
    else if (choice === "drink") drink();
    else if (choice === "corridor") corridor();
    else if (choice === "kitchen") kitchen();
    else if (choice === "stairs") stairs();
    else if (choice === "back") {
        alert("You're back in the Main Hosting Room.");
        mainHostingRoom();
        return;
    } else {
        alert("Invalid choice.");
    }

    chooseNextAction();
}

// Коридор
function corridor() {
    let room = prompt("You see 3 rooms. Choose one (1 / 2 / 3 / back)");
    if (room === "1") {
        alert("You found a pink object.");
        player.inventory.push("pink object");
    } else if (room === "2") {
        let action = prompt("A monster! Fight or run? (fight / run)").toLowerCase();
        if (action === "fight") {
            if (player.inventory.includes("sword")) {
                alert("You fought and won, but got hurt.");
                player.health -= 10;
            } else {
                alert("You fought bare-handed and got badly hurt.");
                player.health -= 40;
            }
        } else {
            alert("You ran away and lost 40 health.");
            player.health -= 40;
        }
    } else if (room === "3") {
        alert("You solved a puzzle and learned there's a phone on the first floor.");
    } else if (room === "back") return;
    else alert("Invalid room.");
}

// Кухня
function kitchen() {
    let box = prompt("You see two boxes. Open one (1 / 2 / back)");
    if (box === "1") {
        alert("Boom! A trap. You lost 20 health.");
        player.health -= 20;
    } else if (box === "2") {
        alert("You found a key.");
        player.inventory.push("key");
    } else if (box === "back") return;
    else alert("Invalid choice.");
}

// Лестница
function stairs() {
    let level = prompt("Go to cellar or first floor? (cellar / first / back)").toLowerCase();
    if (level === "cellar") cellar();
    else if (level === "first") firstFloor();
    else if (level === "back") return;
    else alert("Invalid choice.");
}

// Подвал
function cellar() {
    let action = prompt("You see a heavy door. Try to open with key or directly? (key / direct / back)").toLowerCase();
    if (action === "key") {
        if (player.inventory.includes("key")) {
            alert("You opened the door with the key. There's a tunnel.");
            let go = prompt("Go through the tunnel? (yes / no)").toLowerCase();
            if (go === "yes") {
                alert("You escaped and are home. You win!");
                throw new Error("Game Over");
            }
        } else {
            alert("You don't have the key.");
        }
    } else if (action === "direct") {
        if (player.health > 80) {
            alert("You opened the door with effort. Tunnel ahead.");
            let go = prompt("Go through the tunnel? (yes / no)").toLowerCase();
            if (go === "yes") {
                alert("You escaped and are home. You win!");
                throw new Error("Game Over");
            }
        } else {
            alert("You got exhausted and died.");
            throw new Error("Game Over");
        }
    } else if (action === "back") return;
    else alert("Invalid choice.");
}

// Первый этаж
function firstFloor() {
    let room = prompt("Three rooms ahead. Choose (1 / 2 / 3 / back)");
    if (room === "1") {
        alert("A monster attacked you. You lost 30 health.");
        player.health -= 30;
    } else if (room === "2") {
        if (player.inventory.includes("pink object")) {
            alert("The unicorn accepted the pink object and took you home. You win!");
            throw new Error("Game Over");
        } else {
            alert("There is a unicorn, but it does nothing.");
        }
    } else if (room === "3") {
        let item = prompt("You see a bed, a table, and a closet. Choose one to search (bed / table / closet)").toLowerCase();
        if (item === "bed") {
            alert("You found a phone and called for help. You win!");
            throw new Error("Game Over");
        } else {
            alert("You found nothing.");
        }
    } else if (room === "back") return;
    else alert("Invalid choice.");
}

// Запуск игры
mainHostingRoom();

