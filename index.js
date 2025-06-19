async function fetchUserData() {
    let response = await fetch("https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json");
    let data = await response.json();
    return data;
}

const getAllButton = document.getElementById("getAll");
const filterAllUsersButton = document.getElementById("filterUsers");
const resetButton = document.getElementById("reset");
const userCardsContainer = document.getElementById("userCardsContainer"); // ✅ Define early

getAllButton.addEventListener("click", async () => {
    const users = await fetchUserData();
    console.log(users[0]);
    console.log("All users: ", users);
    displayUsers(users);
});

filterAllUsersButton.addEventListener("click", async () => {
    const users = await fetchUserData();
    const filtered = users.filter(user => user.yearsEmployed < 10); // or `user.yearsExperience` — double check
    console.log("Filtered users: ", filtered);
    displayUsers(filtered);
});

resetButton.addEventListener("click", () => {
    console.log("Resetting view: ");
    userCardsContainer.innerHTML = ""; 
});

function displayUsers(users) {
    userCardsContainer.innerHTML = "";

    users.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("user-card");

        card.innerHTML = `
  <div class="row">
    <p><strong>${user.firstName} ${user.lastName}</strong></p>
    <p>${user.email}</p>
  </div>
  <div class="row">
    <p>${user.companyName}</p>
    <p>${user.yearsEmployed} years</p>
  </div>
`;

        userCardsContainer.appendChild(card);
    });
}