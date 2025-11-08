const greeting = document.getElementById ("greeting");
greeting.style.textAlign = "center";
greeting.style.marginTop = "0px";
const username = window.prompt("What's your truck driver's name?", "Teddy");
greeting.textContent = "Welcome " + username + ". Click a truck to see what it does!"