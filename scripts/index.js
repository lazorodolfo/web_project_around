//Arreglo inicial de objetos cards
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

//Selecciono el contenedor de cards
const cardsContainer = document.querySelector(".cards__container");

//Creo la función que se encarga de crear los cards
function createCard(card) {
  const cardTemplate = document.querySelector("#template-card").content;
  const cardElement = cardTemplate
    .querySelector(".cards__card")
    .cloneNode(true);
  const cardName = cardElement.querySelector(".cards__card-name");
  cardName.textContent = card.name;
  const cardImage = cardElement.querySelector(".cards__card-image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  return cardElement;
}

//Creo la función que se encarga de renderizar los cards
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardsContainer.append(cardElement);
});

//Función toggle overlay
// Esta función se encarga de mostrar u ocultar el overlay
// al añadir o eliminar la clase "overlay_hidden".
// Se utiliza para mostrar el popup cuando se necesita interactuar con él.
function toggleOverlay() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("overlay_hidden");
}

// Función para me gusta
// Esta función se encarga de manejar el evento de me gusta en las cards.
// Se utiliza para cambiar el estado del botón de me gusta cuando se hace clic en él.
function handleLike(evt) {
  const heartIcon = evt.target;
  heartIcon.classList.toggle("cards__heart-active");
}

//Creo la función que se encarga de crear mis popups formularios
// Esta función crea un popup con dos campos de entrada y un botón de guardar.
// Se utiliza para editar el perfil del usuario o añadir un nuevo lugar.
function createPopup(
  popupId,
  titulo,
  unovalor,
  unotexto,
  dosvalor,
  dostexto,
  botontexto
) {
  const popupTemplate = document.querySelector("#template-popup").content;
  const popupElement = popupTemplate.querySelector(".popup").cloneNode(true);

  popupElement.id = popupId;

  popupElement.querySelector(".popup__titulo").textContent = titulo;

  popupElement.querySelector(".popup__input_uno").value = unovalor;
  popupElement.querySelector(".popup__input_uno").placeholder = unotexto;
  popupElement.querySelector(".popup__input_uno").name = unotexto;
  popupElement.querySelector(".popup__input_uno").id = unotexto;

  popupElement.querySelector(".popup__input_dos").value = dosvalor;
  popupElement.querySelector(".popup__input_dos").placeholder = dostexto;
  popupElement.querySelector(".popup__input_dos").name = dostexto;
  popupElement.querySelector(".popup__input_dos").id = dostexto;

  popupElement.querySelector(".popup__save").textContent = botontexto;

  return popupElement;
}

// Función para editar el perfil
// Esta función crea un popup para editar el perfil del usuario.
// Se utiliza para permitir al usuario cambiar su nombre y descripción en el perfil.
function editarPerfil() {
  let nombre = document.querySelector(".profile__text");
  let description = document.querySelector(".profile__description");

  const popupId = "profile-edit";
  const titulo = "Editar perfil";
  const unovalor = nombre.textContent;
  const unotexto = "nombre";
  const dosvalor = description.textContent;
  const dostexto = "descripcion";
  const botontexto = "Guardar";

  const popup = createPopup(
    popupId,
    titulo,
    unovalor,
    unotexto,
    dosvalor,
    dostexto,
    botontexto
  );

  const myoverlay = document.querySelector(".overlay");
  myoverlay.append(popup);
  toggleOverlay();
}

// Función para añadir un lugar
// Esta función crea un popup para añadir un nuevo lugar.
// Se utiliza para permitir al usuario agregar un nuevo lugar a la lista de lugares.
function addLugar() {
  const popupId = "add-place";
  const titulo = "Nuevo Lugar";
  const unovalor = "";
  const unotexto = "title";
  const dosvalor = "";
  const dostexto = "imageURL";
  const botontexto = "Añadir";

  const popup = createPopup(
    popupId,
    titulo,
    unovalor,
    unotexto,
    dosvalor,
    dostexto,
    botontexto
  );

  const myoverlay = document.querySelector(".overlay");
  myoverlay.append(popup);
  toggleOverlay();
}

function savePerfil(evt) {
  evt.preventDefault(); // Evita el envío del formulario
  const popup = evt.target.closest(".popup");
  let nombre = document.querySelector(".profile__text");
  let description = document.querySelector(".profile__description");
  let inputUno = document.querySelector(".popup__input_uno");
  let inputDos = document.querySelector(".popup__input_dos");
  nombre.textContent = inputUno.value;
  description.textContent = inputDos.value;
  toggleOverlay();
  popup.remove();
}

function saveLugar(evt) {
  evt.preventDefault(); // Evita el envío del formulario
  const popup = evt.target.closest(".popup");
  let inputUno = document.querySelector(".popup__input_uno");
  let inputDos = document.querySelector(".popup__input_dos");
  const newCard = {
    name: inputUno.value,
    link: inputDos.value,
  };
  const cardElement = createCard(newCard);
  cardsContainer.prepend(cardElement);
  toggleOverlay();
  popup.remove();
}

// Función para eliminar una card
// Esta función se encarga de eliminar una card del contenedor de cards.
// Se utiliza para permitir al usuario eliminar una card que ya no desea ver.
function deleteCard(evt) {
  const cardElement = evt.target.closest(".cards__card");
  if (cardElement) {
    cardElement.remove();
  }
}

//Creo la función que se encarga de crear la imágen emergente
function createEmergente(evt) {
  const emergenteTemplate = document.querySelector(
    "#template-imagen-emergente"
  ).content;
  const emergenteElement = emergenteTemplate
    .querySelector(".emergente")
    .cloneNode(true);
  const emergenteImage = emergenteElement.querySelector(".emergente__image");
  emergenteImage.src = evt.target.src;
  emergenteImage.alt = evt.target.alt;
  const emergenteTitle = emergenteElement.querySelector(".emergente__text");
  emergenteTitle.textContent = evt.target.alt;

  //Añado al dom
  const myoverlay = document.querySelector(".overlay");
  myoverlay.append(emergenteElement);
  toggleOverlay();
}

document.addEventListener("click", (evt) => {
  // Cerrar el popup al hacer clic en el icono de cierre
  if (evt.target.classList.contains("popup__close-icon")) {
    const popup = evt.target.closest(".popup");
    toggleOverlay();
    popup.remove();
  }
  // Abrir el popup de editar perfil
  if (evt.target.classList.contains("profile__edit")) {
    editarPerfil();
  }
  // Guardar los cambios del perfil
  if (
    evt.target.classList.contains("popup__save") &&
    evt.target.closest("#profile-edit")
  ) {
    savePerfil(evt);
  }
  // Abrir el popup de añadir lugar
  if (evt.target.classList.contains("profile__add")) {
    addLugar();
  }
  // Guardar los cambios del lugar
  if (
    evt.target.classList.contains("popup__save") &&
    evt.target.closest("#add-place")
  ) {
    saveLugar(evt);
  }
  // Botón me gusta
  if (evt.target.classList.contains("cards__card-heart")) {
    console.log("Me gusta");
    handleLike(evt);
  }
  // Eliminar card
  if (evt.target.classList.contains("cards__card_bin")) {
    deleteCard(evt);
  }
  // Abrir overlay de imágen
  if (evt.target.classList.contains("cards__card-image")) {
    createEmergente(evt);
  }
  // Cerrar el overlay de imágen al hacer clic en el overlay
  if (evt.target.classList.contains("emergente__close-icon")) {
    const emergente = document.querySelector(".emergente");
    if (emergente) {
      toggleOverlay();
      emergente.remove();
    }
  }
});
