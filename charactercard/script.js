// Character Object
const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    maxHealth: 100,
    image: "character.png",

    // Method: Level Up
    levelUp: function() {
        this.level += 1;
        this.updateUI();
    },

    // Method: Attacked
    attacked: function() {
        this.health -= 20;
        this.updateUI();
        if (this.health <= 0) {
            this.health = 0;
            alert("Character Died");
        }
    },

    // Update the DOM
    updateUI: function() {
        document.getElementById('level').textContent = this.level;
        document.getElementById('health').textContent = this.health;
    }
};

// Initialize the page
function init() {
    document.getElementById('name').textContent = character.name;
    document.getElementById('class').textContent = character.class;
    character.updateUI();
}

// Make functions globally available for onclick
window.levelUp = () => character.levelUp();
window.attacked = () => character.attacked();

// Start the app
init();