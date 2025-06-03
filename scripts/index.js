//Declaro variables a utilizar
let popup_open = document.querySelector(".profile__edit");
let popup_close = document.querySelector(".popup__close");
let overlay = document.querySelector(".overlay");

let nombre = document.querySelector(".profile__text");
let description = document.querySelector(".profile__description");
let inputName = document.querySelector(".popup__input_name");
let inputDescription = document.querySelector(".popup__input_acerca");
let botonGuardar = document.querySelector(".popup__save");

//Capturo los valores del nombre y profesión en variables
inputName.value = nombre.textContent;
inputDescription.value = description.textContent;

//Función toggle overlay
function toggleOverlay() {
  overlay.classList.toggle("overlay_hidden");
}

//Función para guardar los cambios
function saveChanges(evt) {
  evt.preventDefault(); // Evita el envío del formulario
  nombre.textContent = inputName.value;
  description.textContent = inputDescription.value;
  toggleOverlay();
}

popup_close.addEventListener("click", toggleOverlay);
popup_open.addEventListener("click", toggleOverlay);
botonGuardar.addEventListener("click", saveChanges);
