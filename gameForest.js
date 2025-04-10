class Player {
    constructor(name) {
      this.name = name;
      this.health = 100;
      this.hunger = 70;
      this.thirst = 50;
      this.hasKnife = false;
      this.hasRope = false;
      this.foodItems = []; 
      this.waterItems = []
  
    }
    isDead() {
        return this.health <= 0 || this.hunger >= 100 || this.thirst >= 100;
      }
      
    takeDamage(amount, reason = "") {
      this.health -= amount;
      alert(`${reason ? reason + " " : ""}You lost ${amount} HP. Current health: ${this.health}`);
    }
    useKnife() {
        alert("You use your knife.");
      }
      
      useRope() {
        alert("You use your rope.");
      }
  
    runEffort() {
      this.health -= 10;
      this.hunger += 10;
      this.thirst += 10;
      alert("Running drains your energy. -10 HP, +10 hunger, +10 thirst.");
    }

    eat(index) {
        const item = this.foodItems[index];
        if (!item) return alert("Invalid food item.");
        this.hunger -= item.hungerRestore;
        this.thirst -= item.thirstRestore || 0;
        alert(`You ate ${item.name}. Hunger -${item.hungerRestore}, Thirst -${item.thirstRestore || 0}`);
        this.foodItems.splice(index, 1); // удалить съеденное
      }
      drink(index) {
        const item = this.waterItems[index];
        if (!item) return alert("Invalid drink.");
        this.thirst -= item.thirstRestore;
        alert(`You drank ${item.name}. Thirst -${item.thirstRestore}`);
        this.waterItems.splice(index, 1); 
      }
      showStatus() {
        alert(`Status:
    Health: ${this.health}
    Hunger: ${this.hunger}
    Thirst: ${this.thirst}
    Food: ${this.foodItems.map(i => i.name).join(", ") || "None"}
    Water: ${this.waterItems.map(i => i.name).join(", ") || "None"}
    Items: ${this.hasKnife ? "Knife " : ""}${this.hasRope ? "Rope " : ""}`);
      }
    }
  function checkDeath(reason = "") {
    if (player.isDead()) {
      alert(reason ? reason + "\n" : "" + "You didn't make it. The forest takes another soul.");
      alert("GAME OVER.");
      throw new Error("Game over"); 
    }
  }
  
  const player = new Player("You");
  
  alert("You slowly open your eyes...");
  alert("You wake up in a cold, wet forest. The sky is grey, and your clothes are damp.");
  alert("Your head hurts. Your stomach growls. You're hungry and thirsty.");
  alert("You must survive... and find the castle you saw in your dreams.");
  
  player.showStatus();
  
  alert("As you walk through the trees, you find a destroyed campsite. Torn tents, broken tools... but two items remain on a crate.");
  
  let choice;
  
  while (true) {
    choice = prompt("Take an item: knife or rope?").toLowerCase();
    if (choice === "knife") {
      player.hasKnife = true;
      alert("You took the knife. It's rusty, but better than nothing.");
      break;
    } else if (choice === "rope") {
      player.hasRope = true;
      alert("You took the rope. Strong and long—could help with climbing or escaping.");
      break;
    } else {
      alert("Please choose either 'knife' or 'rope'.");
    }
  }
  
  
  
  player.showStatus();
//food box
let openBox;
while (true) {
  openBox = prompt("You see a box hidden under a tarp. Do you want to open it? (yes / no)").toLowerCase();
  if (openBox === "yes" || openBox === "no") break;
  alert("Please enter a valid answer: yes or no.");
}

if (openBox === "yes") {
  alert("You open the box and find some bread and a bottle of water.");
  player.foodItems.push({ name: "Bread", hungerRestore: 25 });
player.waterItems.push({ name: "Water Bottle", thirstRestore: 25 });
alert("You put Bread and Water Bottle into your inventory.");

} else {
  player.hunger += 20;
  player.thirst += 10;
  checkDeath("Hunger and thirst overwhelm you.");
  alert("You move on. Hunger and thirst increase.");
}

player.showStatus();



alert("You follow a narrow path... but it ends at thick thorny bushes blocking the way.");

if (player.hasKnife) {
  alert("You pull out your knife and start cutting through the branches.");
  player.useKnife?.();
  player.runEffort(); 
  checkDeath("Your body is giving up from exhaustion."); 
  alert("You make it through without injury.");
} else {
  alert("You try to squeeze through the thorns with your hands.");
  player.takeDamage(20, "The sharp thorns scratch and cut your arms.");
  checkDeath("You lost too much blood pushing through the thorns.");
}

alert("The forest path leads to a steep drop. A small ledge is visible below.");

if (player.hasRope) {
  alert("You tie your rope to a tree and carefully climb down.");
  player.useRope?.();
  player.runEffort();
  checkDeath("Your body is giving up from exhaustion."); 
  alert("You reach the bottom safely.");
} else {
  alert("You try to climb down using roots and rocks...");
  player.takeDamage(25, "You slip and fall, hitting the ground hard.");
  checkDeath("You hit your head during the fall.");
}


//wolf
  
alert("As you walk deeper into the forest, you suddenly hear growling...");

alert("A wolf appears between the trees. Its glowing eyes lock onto you. You feel its hunger...");

player.showStatus();

let wolfAction;

while (true) {
  wolfAction = prompt("What do you do? (fight / run / hide)").toLowerCase();
  if (["fight", "run", "hide"].includes(wolfAction)) break;
  alert("Please enter a valid action: fight, run, or hide.");
}

if (wolfAction === "fight") {
  if (player.hasKnife) {
    alert("You grip your knife tightly as the wolf lunges at you.");
    player.takeDamage(15, "You slash the wolf, but it bites your arm.");
    alert("With a final growl, the wolf limps away, defeated.");
  } else {
    alert("You try to defend yourself with bare hands...");
    player.takeDamage(40, "The wolf sinks its teeth deep into your shoulder.");
    checkDeath("You collapse after the wolf's attack.");
    alert("The beast runs off, leaving you bleeding.");
  }
} else if (wolfAction === "run") {
  if (player.hunger < 80 && player.thirst < 80) {
    player.runEffort();
    checkDeath("Your body is giving up from exhaustion.");
    alert("You dash through the trees, dodging branches. The wolf chases you for a while, but you escape.");
  } else {
    player.takeDamage(30, "You're too exhausted. The wolf bites your leg before running off.");
    checkDeath("You couldn’t outrun the wolf.");
  }
} else if (wolfAction === "hide") {
  alert("You quickly drop to the ground and hide behind a fallen log.");
  alert("The wolf sniffs the air, looks around... then disappears into the forest.");
}

player.showStatus();

  
alert("You stumble into a sunlit clearing. The wind is still... too still.");
alert("Suddenly, the wolf that chased you stops and whines... then bolts back into the forest.");

alert("You slowly turn your head—and freeze.");

alert("A massive grizzly bear towers behind you, its breath loud and deep. Its eyes are fixed on yours.");

player.showStatus();

let bearChoice;
while (true) {
  bearChoice = prompt("What do you do? (shout / stay still / run)").toLowerCase();
  if (["shout", "stay still", "run"].includes(bearChoice)) break;
  alert("Please enter a valid action: shout / stay still / run.");
}

if (bearChoice === "shout") {
  if (player.hasKnife) {
    alert("You hold your knife in front of you and yell with all your strength.");
    alert("The bear hesitates... then snorts and slowly backs off into the trees.");
  } else {
    alert("You shout and wave your arms wildly.");
    player.takeDamage(40, "The bear swipes at you, sending you flying backward.");
    checkDeath("The bear injured you severely.");
    alert("It grumbles and lumbers away, leaving you injured.");
  }
} else if (bearChoice === "stay still") {
  alert("You remain perfectly still, barely breathing.");
  alert("The bear sniffs the air, growls... then slowly walks past you without harm.");
} else if (bearChoice === "run") {
  if (player.hasRope) {
    player.runEffort();
    checkDeath("Your body is giving up from exhaustion.");
    alert("You sprint and toss your rope over a branch, climbing up just in time.");
    alert("The bear claws the tree, then loses interest and leaves.");
  } else {
    player.takeDamage(60, "You try to run, but stumble. The bear catches up and claws your back.");
    checkDeath("You couldn’t escape the bear.");
    alert("You crawl away in pain as it disappears.");
  }
}

player.showStatus();

  // 🍽️ Optional: Food choice if player has food
  if ((player.foodItems.length > 0 || player.waterItems.length > 0) && player.health > 0) {
    alert("You stop to rest near the castle gates. You have some food and drink left.");
    player.showStatus();
  
    let action;
    while (true) {
      action = prompt("Do you want to eat or drink? (eat / drink / skip)").toLowerCase();
      if (["eat", "drink", "skip"].includes(action)) break;
      alert("Please choose: eat / drink / skip.");
    }
  
    if (action === "eat" && player.foodItems.length > 0) {
      const itemList = player.foodItems.map((f, i) => `${i + 1}: ${f.name} (-${f.hungerRestore} hunger)`).join("\n");
      const foodIndex = parseInt(prompt("Choose what to eat:\n" + itemList)) - 1;
      player.eat(foodIndex);
    }
  
    if (action === "drink" && player.waterItems.length > 0) {
      const drinkList = player.waterItems.map((w, i) => `${i + 1}: ${w.name} (-${w.thirstRestore} thirst)`).join("\n");
      const drinkIndex = parseInt(prompt("Choose what to drink:\n" + drinkList)) - 1;
      player.drink(drinkIndex);
    }
  
    player.showStatus();
  }
  
  
  // 🏁 Castle
 
  if (player.isDead()) {
    alert("You collapse at the castle gates. So close... but too late.");
    alert("GAME OVER.");
    throw new Error("Game over");
  } else {
    alert("You limp out of the forest, covered in cuts and dirt.");
    alert("You see the castle gates. You made it...");
    player.showStatus();
  }

  alert("You approach the castle and decide to enter...");

// Dynamically load castle.js
const script = document.createElement("script");
script.src = "castle.js";
document.body.appendChild(script);

  
