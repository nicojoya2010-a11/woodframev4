window.onload = function() {
    const loader = document.getElementById('loader-wrapper');
    loader.style.display = 'none';
};
const carousel = document.getElementById("carousel");
const totalImages = 6;
const angle = 360 / totalImages;
let currentAngle = 0;

setInterval(() => {
  currentAngle -= angle;
  carousel.style.transform = `rotateY(${currentAngle}deg)`;
}, 2000); // 2 segundos


        


    // --- LOGICA MODAL ---
const modal = document.getElementById('modalCompra');
const nombreProd = document.getElementById('producto-nombre');
const linkWhatsapp = document.getElementById('link-whatsapp');

function abrirModal(nombre) {
  const numero = "573332929778";
  // Usa la variable 'nombre' dentro del mensaje
  const mensaje = encodeURIComponent(`Hola, Me interesa comprar el marco: ${nombre}.`);
  
  nombreProd.innerText = nombre;
  // Cambia el link para que use el mensaje dinámico
  // Dentro de tu función abrirModal, cambia la línea del link por esta:
linkWhatsapp.href = `https://wa.me/${numero}?text=${mensaje}`;


  modal.style.display = 'flex';
}


function cerrarModal() {
  modal.style.display = 'none';
}

// Cerrar modal si hace clic fuera de la caja
window.onclick = function(event) {
  if (event.target == modal) cerrarModal();
}
// --- LOGICA DE APARICIÓN DE CONTENIDO (Intersection Observer) ---
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.animar').forEach(el => observer.observe(el));


// --- LOGICA DEL CHAT BOT ---
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input-text");

function enviarMensaje() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";
    
    setTimeout(() => botReply(text.toLowerCase()), 600);
}

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `msg ${type}`;
    chatBody.appendChild(msg);

    if (type === "bot") {
        escribirTexto(msg, text, 20);
    } else {
        msg.textContent = text; // ✅ CORREGIDO
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}

function escribirTexto(elemento, texto, velocidad) {
    let i = 0;
    elemento.textContent = ""; // ✅ CORREGIDO

    const intervalo = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i); // ✅ CORREGIDO
            i++;
            chatBody.scrollTop = chatBody.scrollHeight;
        } else {
            clearInterval(intervalo);
        }
    }, velocidad);
}




function botReply(text) {
    let respuesta = "No entendí eso, ¿puedes preguntar por nuestra misión, precios u organigrama?";

    if (text.includes("hola")) {
        respuesta = "Hola, Soy el asistente de Wood Frame. ¿Que informacion necesitas? Te puedo ayudar con la mision, vision, precios de los diseños, el organigrama y la problematica";
    } else if (text.includes("mision") || text.includes("misión")) {
        respuesta = "Nuestra misión es desarrollar marcos de lentes biodegradables en madera de bambú mediante corte láser, ofreciendo una alternativa sostenible.";
    } else if (text.includes("vision") || text.includes("visión")) {
        respuesta = "Para 2027 buscamos ser líderes en la fabricación de marcos ecológicos funcionales.";
    } else if (text.includes("precio") || text.includes("costo") || text.includes("cuanto vale")) {
        respuesta = "Precios:\n• Clásico: $45.000\n• Personalizado: $55.000\n• Minimalista: $40.000";
    } else if (text.includes("organigrama") || text.includes("ceo") || text.includes("equipo")) {
        respuesta = "Director General: Nicolás Joya. Marketing: Daivier Cárdenas. Sistemas: Nicolás Pineda. Finanzas: Alejandro Parra.";
    } else if (text.includes("problema") || text.includes("por que")) {
        respuesta = "Buscamos reducir las 250 toneladas de plástico que genera la industria óptica anualmente usando materiales biodegradables.";
    }

    addMessage(respuesta, "bot");
}
