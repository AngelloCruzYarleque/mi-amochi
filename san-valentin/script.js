let noButtonClickCount = 0; // Contador de clics en el botón "No"

// Lista de frases aleatorias para el botón "No"
const frasesNo = [
  "¿Estás segura mi amochi? 😧",
  "¡¿Realmente estás segura amochi?! 🥺",
  "Amorrrrrrrrrrrrrrrrr :(",
  "Mi corazoncito no lo aguantara amor💔",
  "Di que sí mochiii... 🙏🥰",
  "Piénsalo bien amorchi, no quiero llorar 😢",
  "Si dices que no, tiguechito estará muy triste 😿😭",
  "NO... ya di que sí amochi hehe😖",
  "Vamos, di que sí amorrrrrrr😭",
  "¿Sabes lo que pasa si dices que no? Me convertiré en un tiguechito triste 😿💔",
  "Por favooooooor, te lo pido con ojitos de perrito 🐶🥺",
  "Si dices que no, voy a estar triste toda la semana, y todo el año amorrr 😓",
  "Amooochiiii, mi corazon late por ti ❤️",
  "Es broma no? hehe, POR FAVOR DI SÍ AMOCHIII😂🙏",
  "¿Y si te soborno con abrazos infinitos amochi?🥰😉🤗💞",
  "¡Anda, Amor, di que sí y serás la persona más consentida del mundo!😘😘😍",
  "No te hagas la difícil amochi😜, sé que en el fondo quieres decir que sí 😚💘",
  "Ok, última oportunidad, pero recuerda… ¡TE AMO DEMASIADO! 😘💕",
  "Piénsalo bien amochi... 🍫💖",
  "Voy a contar hasta 3... 1... 2... ¡Di que síiii amorrr! 🙈💗",
  "¿Y si te digo que tengo un regalo para ti si dices que sí hehe? 🎁💝",
  "Di que sí y hagamos este día el más bonito de todos mi amorchi❤️💞",
  "Voy a quedarme aquí esperando hasta que digas que sí amorr... ⏳🥺",
  "Si dices que no, perderás la oportunidad de recibir 1000 besitos amochi 😘💋",
  "¿Quieres ver la carita más feliz del mundo? Solo di que sí mi amor 😊💖",
  "Dilo, dilo, dilo... SÍ SÍ SÍ, VAMOS AMORR😍💕",
  "Si dices que no, tendré que activar el modo súper triste 😭💔",
  "Te amo demasiado como para aceptar un 'No' amochi 💖😜",
  "No me hagas llorar, mejor dime que sí y hagamos algo bonito juntos amochi💑💕",
];

// Lista de GIFs tristes
const sadGifs = ["sadGifContainer", "sadGifContainer1", "sadGifContainer2"];

document.getElementById("noBtn").addEventListener("click", function () {
  // Elegir una frase aleatoria de la lista
  let fraseAleatoria = frasesNo[Math.floor(Math.random() * frasesNo.length)];
  // Elegir y mostrar un gif triste aleatorio
  let gifAleatorio = sadGifs[Math.floor(Math.random() * sadGifs.length)];
  // Aumentar el tamaño del botón "Sí"
  let siBtn = document.getElementById("siBtn");
  let currentSize = parseInt(window.getComputedStyle(siBtn).fontSize);
  let newSize = currentSize + 10; // Aumentar el tamaño cada vez

  siBtn.style.fontSize = newSize + "px";
  siBtn.style.padding = newSize * 0.6 + "px " + newSize * 1 + "px"; // Ajustar padding dinámicamente

  // Cambiar el texto del botón "No"
  document.getElementById("noBtn").innerHTML = fraseAleatoria;
  document.getElementById("noBtn").style.backgroundColor = "#F1330A";

  // Ocultar el gif inicial
  document.getElementById("gifContainer").style.display = "none";

  // Ocultar todos los gifs tristes
  sadGifs.forEach((id) => (document.getElementById(id).style.display = "none"));
  // Reiniciar el GIF forzando la recarga
  let gifElement = document.getElementById(gifAleatorio);
  let srcOriginal = gifElement.querySelector("img").src;
  gifElement.querySelector("img").src = "";
  gifElement.querySelector("img").src = srcOriginal;

  // Mostrar el nuevo GIF triste
  gifElement.style.display = "block";
});

document.getElementById("siBtn").addEventListener("click", function () {
  // Ocultar cualquier GIF triste o el inicial
  document.getElementById("gifContainer").style.display = "none";
  document.getElementById("sadGifContainer").style.display = "none";
  document.getElementById("sadGifContainer1").style.display = "none";
  document.getElementById("sadGifContainer2").style.display = "none";

  // Mostrar el primer GIF feliz
  document.getElementById("happyGifContainer").style.display = "block";

  // Ocultar botones y pregunta
  document.querySelectorAll(".question").forEach((element) => {
    element.style.display = "none";
  });

  document.getElementById("siBtn").style.display = "none";
  document.getElementById("noBtn").style.display = "none";

  // Cambiar el fondo (opcional)
  document.body.classList.add("bg-green");

  // Mostrar mensaje de confirmación
  document.getElementById("messageContainer").style.display = "block";
  document.getElementById("messageContainer2").style.display = "block";
  document.getElementById("messageContainer").innerHTML =
    "¡Sabia que aceptarias MI AMOR jajaja 😍! TE AMO MUCHISIMO MI NIÑA";
  document.getElementById("messageContainer2").innerHTML = "TE AMO";

  // Secuencia de GIFs felices con tiempo
  setTimeout(function () {
    document.getElementById("happyGifContainer").style.display = "none";
    document.getElementById("happyGifContainer2").style.display = "block";
  }, 1000);

  setTimeout(function () {
    document.getElementById("happyGifContainer2").style.display = "none";
    document.getElementById("happyGifContainer3").style.display = "block";
  }, 2000);

  setTimeout(function () {
    document.getElementById("happyGifContainer3").style.display = "none";
    document.getElementById("happyGifContainer4").style.display = "block";
  }, 3000);
  setTimeout(function () {
    document.getElementById("whatsappModal").style.display = "flex";
  }, 4000);
});

document.getElementById("sendWhatsApp").addEventListener("click", function () {
  let numeroWhatsApp = "51994771383"; // Reemplaza con el número de WhatsApp (sin + ni espacios)
  let mensaje = "¡Hola mi amor! Si quiero ser tu SAN VALENTIN. Te amo mucho";
  let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    mensaje
  )}`;

  window.open(url, "_blank"); // 🟢 Abre WhatsApp en una nueva pestaña
});

// 🛑 Cerrar el modal si se presiona la 'X'
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("whatsappModal").style.display = "none";
});
