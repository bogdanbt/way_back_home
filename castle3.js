let player = {
  name: prompt("Enter your name:"),
  health: 100,
  hunger: 0,
  thirst: 0,
  inventory: [],
};

function checkStatus() {
  alert(
    `Name: ${player.name}\nHealth: ${player.health}\nHunger: ${player.hunger}\nThirst: ${player.thirst}\nInventory: ${player.inventory.join(", ")}`
  );
}

function eat() {
  player.hunger = Math.max(0, player.hunger - 20);
  alert("You ate some food. Hunger decreased.");
}

function drink() {
  player.thirst = Math.max(0, player.thirst - 20);
  alert("You drank water. Thirst decreased.");
}

function consumeResources() {
  player.health -= 5;
  player.hunger += 10;
  player.thirst += 10;
  if (player.health <= 0 || player.hunger >= 100 || player.thirst >= 100) {
    alert("You have died due to poor condition.");
    throw new Error("Game Over");
  }
}

function startSceneTwo() {
  alert("You are in the hall. Your status is refreshed.");
  player.health = 100;
  player.hunger = 0;
  player.thirst = 0;

  while (true) {
    consumeResources();
    let choice = prompt("Where do you want to go? (corridor / kitchen / stairs / status / eat / drink / back)");

    if (choice === "status") {
      checkStatus();
    } else if (choice === "eat") {
      eat();
    } else if (choice === "drink") {
      drink();
    } else if (choice === "corridor") {
      corridor();
    } else if (choice === "kitchen") {
      kitchen();
    } else if (choice === "stairs") {
      stairs();
    } else if (choice === "back") {
      alert("You are back in the hall.");
    } else {
      alert("Invalid choice.");
    }
  }
}

function corridor() {
  let room = prompt("You see 3 rooms. Choose one (1 / 2 / 3 / back)");
  if (room === "1") {
    alert("You found a pink object.");
    player.inventory.push("pink object");
  } else if (room === "2") {
    if (player.inventory.includes("sword")) {
      alert("You fought the monster and won, but got hurt.");
      player.health -= 10;
    } else {
      alert("You encountered a monster and got badly hurt.");
      player.health -= 40;
    }
  } else if (room === "3") {
    alert("You solved a puzzle and learned that there is a phone on the first floor.");
  } else if (room === "back") {
    return;
  } else {
    alert("Invalid room.");
  }
}

function kitchen() {
  let box = prompt("You see two boxes. Open one (1 / 2 / back)");
  if (box === "1") {
    alert("Boom! A trap. You lost health.");
    player.health -= 20;
  } else if (box === "2") {
    alert("You found a key.");
    player.inventory.push("key");
  } else if (box === "back") {
    return;
  } else {
    alert("Invalid choice.");
  }
}

function stairs() {
  let level = prompt("Go to cellar or first floor? (cellar / first / back)");
  if (level === "cellar") {
    cellar();
  } else if (level === "first") {
    firstFloor();
  } else if (level === "back") {
    return;
  } else {
    alert("Invalid choice.");
  }
}

function cellar() {
  let action = prompt("You see a heavy door. Try to open with key or directly? (key / direct / back)");
  if (action === "key") {
    if (player.inventory.includes("key")) {
      alert("You used the key and opened the door. There is a tunnel.");
      let go = prompt("Do you want to go through the tunnel? (yes / no)");
      if (go === "yes") {
        alert("You escaped through the tunnel and are back home. You win!");
        throw new Error("Game Over");
      }
    } else {
      alert("You don't have the key.");
    }
  } else if (action === "direct") {
    if (player.health > 80) {
      alert("With great effort, you opened the door. There's a tunnel.");
      let go = prompt("Do you want to go through the tunnel? (yes / no)");
      if (go === "yes") {
        alert("You escaped through the tunnel and are back home. You win!");
        throw new Error("Game Over");
      }
    } else {
      alert("You tried but exhausted yourself and died.");
      throw new Error("Game Over");
    }
  } else if (action === "back") {
    return;
  } else {
    alert("Invalid choice.");
  }
}

function firstFloor() {
  let room = prompt("Three rooms ahead. Choose (1 / 2 / 3 / back)");
  if (room === "1") {
    alert("A monster attacked you.");
    player.health -= 30;
  } else if (room === "2") {
    if (player.inventory.includes("pink object")) {
      alert("The unicorn accepts the pink object and takes you home. You win!");
      throw new Error("Game Over");
    } else {
      alert("There’s a unicorn, but nothing happens.");
    }
  } else if (room === "3") {
    let item = prompt("You see a bed, a table, and a closet. Choose one to search (bed / table / closet)");
    if (item === "bed") {
      alert("You found a phone and called for help. You're saved. You win!");
      throw new Error("Game Over");
    } else {
      alert("You searched but found nothing.");
    }
  } else if (room === "back") {
    return;
  } else {
    alert("Invalid choice.");
  }
}

// Start the scene
startSceneTwo();

