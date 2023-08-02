// Recupération des différents éléments
const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table__result");

// Création de la variable dataArray qui va stocker les données de l'API
let dataArray = [];

// Fonction asynchrone getUsers qui va permettre de récupérer les données de l'API
const getUsers = async () => {
  const res = await fetch("https://randomuser.me/api/?nat=fr&results=50");
  const { results } = await res.json();
  dataArray = orderList(results);
  console.log(dataArray);
  createUserList(dataArray);
};

// Appel de la fonction getUsers()
getUsers();

// Fonction orderList ayant pour paramètre les données renvoyées par l'API afin de trier les noms de famille par ordre alphabétique
const orderList = (data) => {
  const orderedData = data.sort((a, b) => {
    if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
      return -1;
    } else if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
  return orderedData;
};

// Fonction createUserList ayant pour paramètre usersList pour créer la liste de tous nos éléments et les injecter dans le DOM
const createUserList = (usersList) => {
  usersList.forEach((user) => {
    const listItem = document.createElement("div");
    listItem.setAttribute("class", "table__item");
    listItem.innerHTML = `<div class="container__img">
    <img src="${user.picture.medium}" alt="" />
    <p class="name">${user.name.last} ${user.name.first}</p>
    </div>
    <p class="email">${user.email}</p>
    <p class="phone">${user.phone}</p>
    <p class="city">${user.location.city}</p>`;
    searchResult.appendChild(listItem);
  });
};

// Fonction filterData qui va permettre de filter les données
const filterData = (e) => {
  searchResult.innerHTML = "";

  const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

  const filteredArr = dataArray.filter(
    (el) =>
      el.name.first.toLowerCase().includes(searchedString) ||
      el.name.last.toLowerCase().includes(searchedString) ||
      `${el.name.last + el.name.first}`
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(searchedString) ||
      `${el.name.first + el.name.last}`
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(searchedString)
  );
  createUserList(filteredArr);
};

// Ecoute de l'événement input (c'est-à-dire dès que l'utilisateur va écrire à l'intérieur du champ) et appel de la fonction filterData
searchInput.addEventListener("input", filterData);
