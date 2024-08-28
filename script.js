// Selección de elementos del DOM
let textArea = document.querySelector(".input-text");
let textValidation = document.querySelector(".validation-message");
let encryptBtn = document.querySelector(".encrypt-button");
let decryptBtn = document.querySelector(".decrypt-button");
let messageNotFound = document.querySelector(".no-message-found");
let instructions = document.querySelector(".instructions");
let placeholderImage = document.querySelector(".placeholder-image");
let encryptedMessage = document.querySelector(".encrypted-message");
let copyBtn = document.querySelector(".copy-button");

// Función para encriptar el texto
function encriptarTexto(texto) {
    let textoEncriptado = texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
    return textoEncriptado;
}

// Función para desencriptar el texto
function desencriptarTexto(textoEncriptado) {
    let textoDesencriptado = textoEncriptado
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
    return textoDesencriptado;
}


// Función para copiar el texto al portapapeles
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert("Texto copiado al portapapeles!");
    })
}

// Actualiza la visualización de la sección de salida
function actualizarSalida(modo) {
    if (modo === 'encriptar' || modo === 'desencriptar') {
        placeholderImage.style.display = 'none';
        instructions.style.display = 'none';
        messageNotFound.textContent = (modo === 'encriptar') ? encriptarTexto(textArea.value) : desencriptarTexto(textArea.value);
        copyBtn.style.display = 'block';
    } else {
        placeholderImage.style.display = 'block';
        instructions.style.display = 'block';
        messageNotFound.textContent = 'Ningún mensaje fue encontrado';
        instructions.textContent = 'Ingresa el texto que desees encriptar o desencriptar.';
        copyBtn.style.display = 'none';
    }
}

// Manejo de los botones
encryptBtn.addEventListener("click", function() {
    let texto = textArea.value;
    if (/^[a-z\s]+$/.test(texto)) { // Validación: solo letras minúsculas y espacios
        let textoEncriptado = encriptarTexto(texto);
        encryptedMessage.textContent = textoEncriptado;

        // Ocultar la imagen, el h2 y el p
        placeholderImage.style.display = "none";
        messageNotFound.style.display = "none";
        instructions.style.display = "none";

        // Mostrar el mensaje cifrado y el botón de copiar
        encryptedMessage.style.display = "block";
        copyBtn.style.display = "block";

        // Restablecer el contenido del textarea para que el placeholder aparezca
        textArea.value = "";
    }
});

// Manejo del botón de desencriptar
decryptBtn.addEventListener("click", function() {
    let textoEncriptado = textArea.value;
    if (/^[a-z\s]+$/.test(textoEncriptado)) { // Validación: solo letras minúsculas y espacios
        let textoDesencriptado = desencriptarTexto(textoEncriptado);
        encryptedMessage.textContent = textoDesencriptado;

        // Ocultar la imagen, el h2 y el p
        placeholderImage.style.display = "none";
        messageNotFound.style.display = "none";
        instructions.style.display = "none";

        // Mostrar el mensaje desencriptado y el botón de copiar
        encryptedMessage.style.display = "block";
        copyBtn.style.display = "block";

        textValidation.textContent = "";
    } else {
        textValidation.textContent = "Por favor ingresa solo letras minúsculas y sin acentos.";
    }
});

// Evento para copiar el texto al portapapeles
copyBtn.addEventListener("click", function() {
    let textoACopiar = encryptedMessage.textContent;
    if (textoACopiar) {
        copiarAlPortapapeles(textoACopiar);
    } else {
        alert("No hay texto para copiar.");
    }
});

// Inicializar la salida
actualizarSalida('inicio');