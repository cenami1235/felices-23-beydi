// ===== FUNCIÓN PRINCIPAL =====
function iniciarExperiencia() {

    const inicio = document.getElementById("pantallaInicio");
    const flash = document.getElementById("flash");
    const contenedor = document.getElementById("contenedorVideo");
    const video = document.getElementById("miVideo");

    if (contenedor.classList.contains("mostrar")) return;

    inicio.classList.add("salir");
    flash.classList.add("activo");

    lluviaInicialPetalos();

    setTimeout(() => {
        inicio.style.display = "none";
        contenedor.classList.add("mostrar");
        video.play();
    }, 1800);
}


// ===== LLUVIA DE PÉTALOS SOLO AL INICIO =====
function lluviaInicialPetalos() {

    let contador = 0;

    const intervalo = setInterval(() => {
        crearPetaloCyan();
        contador++;

        if (contador > 18) clearInterval(intervalo);

    }, 70);
}


// ===== CREAR PÉTALO CYAN =====
function crearPetaloCyan() {
    const petalo = document.createElement("div");
    petalo.classList.add("petalo");

    petalo.style.left = Math.random() * 100 + "vw";
    petalo.style.animationDuration = (2.5 + Math.random() * 1.5) + "s";
    petalo.style.transform = `scale(${0.6 + Math.random()})`;

    document.body.appendChild(petalo);

    setTimeout(() => petalo.remove(), 4500);
}


// ===== EXPLOSIÓN DE PÉTALOS AL FINAL =====
function explosionPetalosPro() {

    const colores = [
        "cyan", "white", "yellow",
        "#ff69b4", "#b57cff", "#ffa500"
    ];

    for (let i = 0; i < 260; i++) {

        const petalo = document.createElement("div");
        petalo.classList.add("petalo");

        petalo.style.background = colores[Math.floor(Math.random() * colores.length)];
        petalo.style.left = "50vw";
        petalo.style.top = "50vh";
        petalo.style.animation = "none";

        document.body.appendChild(petalo);

        const angulo = Math.random() * Math.PI * 2;
        const distancia = 400 + Math.random() * 800;
        const x = Math.cos(angulo) * distancia;
        const y = Math.sin(angulo) * distancia;

        setTimeout(() => {
            petalo.style.transition = "transform 3s ease-out, opacity 3s";
            petalo.style.transform = `translate(${x}px, ${y}px) rotate(1440deg) scale(1.6)`;
            petalo.style.opacity = "0";
        }, 10);

        setTimeout(() => petalo.remove(), 3200);
    }
}


// ===== EFECTO MÁQUINA DE ESCRIBIR =====
function escribirMensaje(texto, elemento, velocidad = 55) {
    return new Promise((resolve) => {

        let i = 0;
        elemento.textContent = "";
        elemento.style.animation = "none";

        const intervalo = setInterval(() => {
            elemento.textContent += texto[i];
            i++;

            if (i >= texto.length) {
                clearInterval(intervalo);

                setTimeout(() => {
                    elemento.style.animation = "brillo 2.5s infinite alternate";
                    resolve(); // 🔥 AVISA QUE TERMINÓ
                }, 300);
            }
        }, velocidad);

    });
}


// ===== EVENTOS =====
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") iniciarExperiencia();
});

document.addEventListener("click", iniciarExperiencia);
document.addEventListener("touchstart", iniciarExperiencia);


// ===== CUANDO TERMINA EL VIDEO =====
document.addEventListener("DOMContentLoaded", () => {

    const video = document.getElementById("miVideo");

    video.addEventListener("ended", async () => {

        explosionPetalosPro();

        const mensaje = document.getElementById("mensajeFinal");
        mensaje.classList.add("mostrar");

        const texto1 = "✨Felices 23 ✨\n7w7 💖";
        const texto2 = "\n\n今は、あの頃にあった大切な時間を静かに想っています。心から感謝しています。あなたを愛しています。";

        await escribirMensaje(texto1, mensaje);   // ⏳ espera a que termine
        await escribirMensaje(texto2, mensaje);   // 🧠 empieza EXACTO después

    });

});