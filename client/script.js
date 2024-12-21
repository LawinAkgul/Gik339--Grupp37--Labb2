document.addEventListener("DOMContentLoaded", () => {
  console.log("Sidan är laddad, hämtar data...");
  fetchData();
});

//Uppgift 6
async function fetchData() {
  const url = "http://localhost:3000/users";

  try {
    console.log("Försöker hämta data från", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fel vid hämtning av användare: " + response.statusText);
    }

    const users = await response.json();
    console.log("Användare mottagna:", users);
    createUsersList(users);
  } catch (error) {
    console.error("Något gick fel:", error);
  }
}

//Uppgift 7
function createUsersList(users) {
  console.log("Skapar lista över användare...");
  const ul = document.createElement("ul");
  ul.className = "user-list";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.firstName} ${user.lastName} - ${user.username}`;
    li.style.backgroundColor = user.color || "#444"; // Standardfärg
    li.style.color = "white";
    ul.appendChild(li);
  });

  const userListContainer = document.getElementById("userList");
  if (userListContainer) {
    userListContainer.appendChild(ul);
    console.log("Listan är tillagd i DOM:en");
  } else {
    console.error("Elementet med ID 'userList' saknas!");
  }
}
