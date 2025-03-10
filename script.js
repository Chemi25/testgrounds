// ===============
// 1. Controlar "Ver más detalles" con animación
// ===============
document.addEventListener("DOMContentLoaded", () => {
  const toggleDetailsButtons = document.querySelectorAll(".toggle-details");
  const productos = document.querySelectorAll(".producto");

  toggleDetailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentProducto = button.closest(".producto");
      const currentDetails = currentProducto.querySelector(".product-details");

      if (currentDetails.classList.contains("hidden")) {
        // Al abrir, ocultamos los demás productos
        productos.forEach((producto) => {
          if (producto !== currentProducto) {
            producto.classList.add("hidden-others");
          }
        });

        // Animación de apertura
        currentDetails.style.height = `${currentDetails.scrollHeight}px`;
        currentDetails.classList.remove("hidden");
        button.textContent = "Ocultar detalles";

        setTimeout(() => {
          currentDetails.style.height = "auto";
        }, 500);
      } else {
        // Animación de cierre
        currentDetails.style.height = `${currentDetails.scrollHeight}px`;
        setTimeout(() => {
          currentDetails.style.height = "0";
          setTimeout(() => {
            currentDetails.classList.add("hidden");
            productos.forEach((producto) => {
              producto.classList.remove("hidden-others");
            });
            button.textContent = "Ver más detalles";
          }, 500);
        }, 0);
      }
    });
  });
});

// ===============
// 2. Scroll suave por hash (opcional)
// ===============
window.addEventListener("load", () => {
  if (window.location.hash) {
    const productId = window.location.hash.substring(1);
    const targetProduct = document.getElementById(productId);
    if (targetProduct) {
      targetProduct.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// ===============
// 3. Botón "Versión Neutral": cambia imagen, emojis, título y URL de PayPal
// ===============
document.addEventListener("DOMContentLoaded", function () {
  const product = document.getElementById("presupuestoMensual");
  const neutralButton = product.querySelector(".toggle-neutral");
  const img = product.querySelector("img");
  const details = product.querySelector(".product-details");

  // Guardamos el <form> y su acción original
  const originalForm = details.querySelector("form");
  const originalFormAction = originalForm.action;

  // Guardamos el contenido completo, imagen y título
  const productTitle = product.querySelector(".detalle-producto h2");
  const originalTitle = productTitle.textContent;

  const originalImgSrc = img.src;
  const originalImgAlt = img.alt;
  const originalDetailsHTML = details.innerHTML;

  neutralButton.addEventListener("click", function () {
    if (neutralButton.textContent.trim() === "Versión Neutral") {
      // --- Cambiar a versión neutral ---
      img.src = "imagenes/plantillaNeutra.png";
      img.alt = "Plantilla Financiera Neutral";

      // Reemplazamos el contenido original (que tiene emojis)
      // por el mismo contenido sin emojis
      let newHTML = originalDetailsHTML.replace(/[💅✨🌸💖🫶🏼]/g, "");
      details.innerHTML = newHTML;

      // Obtenemos el nuevo form (se recreó tras el replace)
      const newForm = details.querySelector("form");
      // Cambiamos su acción a la URL de la versión neutral
      newForm.action = "https://www.paypal.com/ncp/payment/CZ8E9M7F2YP3S";

      // Añadir "(Neutral)" al título
      productTitle.textContent = `${originalTitle} (Neutral)`;

      // Cambiar el texto del botón
      neutralButton.textContent = "Versión Regular";
    } else {
      // --- Revertir a versión original ---
      img.src = originalImgSrc;
      img.alt = originalImgAlt;
      details.innerHTML = originalDetailsHTML;
      productTitle.textContent = originalTitle;

      // Restauramos la acción original del form
      const revertForm = details.querySelector("form");
      revertForm.action = originalFormAction;

      // Botón vuelve a "Versión Neutral"
      neutralButton.textContent = "Versión Neutral";
    }
  });
});
