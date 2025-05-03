window.addEventListener('DOMContentLoaded', function () {
  const username = localStorage.getItem("username");
  if (username) {
    const welcomeDiv = document.getElementById("welcomeMessage");
    welcomeDiv.textContent = `Welcome, ${username}!`;
  }

  // Load all puzzles initially
  fillPuzzleFeed();

  // Add event listener for search
});

function fillPuzzleFeed() {
  const feed = document.getElementById("puzzleFeed");
  feed.innerHTML = ""; // Clear existing puzzles

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);

    const puzzles = data.filter(item => item.ciphername); // Filter only puzzle items

    if (puzzles.length === 0) {
      feed.innerHTML = `<p>No puzzles available.</p>`;
      return;
    }

    puzzles.forEach(puzzle => {
      const card = document.createElement("div");
      card.classList.add("puzzle-card");
      card.innerHTML = `
        <h2>${puzzle.ciphername}</h2>
        <p>Type: ${puzzle.ciphertype}</p>
        <p>Author: ${puzzle.cipherauthor || "Unknown"}</p>
        <button onclick="playPuzzle('${puzzle.id}')">Play</button>
      `;
      feed.appendChild(card);
    });
  });

  xhr.open("GET", "https://fk7oe7bqme.execute-api.us-east-2.amazonaws.com/items");
  xhr.send();
}

function searchPuzzles() {
  const input = document.getElementById("searchBar").value.toLowerCase();
  const feed = document.getElementById("puzzleFeed");
  feed.innerHTML = ""; // Clear current display

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    const displayedPuzzles = new Set();

    const puzzles = data.filter(item =>
      (item.ciphername && item.ciphername.toLowerCase().includes(input)) ||
      (item.cipherauthor && item.cipherauthor.toLowerCase().includes(input))
    );

    if (puzzles.length === 0) {
      feed.innerHTML = `<p>No puzzles found for "${input}".</p>`;
      return;
    }

    puzzles.forEach(puzzle => {
      if (!displayedPuzzles.has(puzzle.id)) {
        displayedPuzzles.add(puzzle.id); // mark as added

        const card = document.createElement("div");
        card.classList.add("puzzle-card");
        card.innerHTML = `
          <h2>${puzzle.ciphername}</h2>
          <p>Type: ${puzzle.ciphertype}</p>
          <p>Author: ${puzzle.cipherauthor || "Unknown"}</p>
          <button onclick="playPuzzle('${puzzle.id}')">Play</button>
        `;
        feed.appendChild(card);
      }
    });
  });

  xhr.open("GET", "https://fk7oe7bqme.execute-api.us-east-2.amazonaws.com/items");
  xhr.send();
}




function playPuzzle(id) {
  window.location.href = `solve.html?id=${encodeURIComponent(id)}`;
}
