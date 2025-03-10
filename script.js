// 1. Controlar "Ver más detalles" con animación
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

// 2. Scroll suave por hash (opcional)
window.addEventListener("load", () => {
  if (window.location.hash) {
    const productId = window.location.hash.substring(1);
    const targetProduct = document.getElementById(productId);
    if (targetProduct) {
      targetProduct.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// 3. Botón "Versión Neutral" con booleano para evitar doble clic
document.addEventListener("DOMContentLoaded", function () {
  const product = document.getElementById("presupuestoMensual");
  const neutralButton = product.querySelector(".toggle-neutral");
  const img = product.querySelector("img");
  const details = product.querySelector(".product-details");

  // Título y contenido originales
  const productTitle = product.querySelector(".detalle-producto h2");
  const originalTitle = productTitle.textContent;

  const originalImgSrc = img.src;
  const originalImgAlt = img.alt;
  const originalDetailsHTML = details.innerHTML;

  // Formulario y su acción original (si usas PayPal)
  const originalForm = details.querySelector("form");
  const originalFormAction = originalForm ? originalForm.action : null;

  // Variable booleana para saber si estamos en versión neutral o no
  let isNeutral = false;

  neutralButton.addEventListener("click", function () {
    if (!isNeutral) {
      // 1. Cambiar a versión neutral
      isNeutral = true;

      img.src = "imagenes/plantillaNeutra.png";
      img.alt = "Plantilla Financiera Neutral";

      // Reemplazar contenido para quitar emojis
      let newHTML = originalDetailsHTML.replace(/[💅✨🌸💖🫶🏼]/g, "");
      details.innerHTML = newHTML;

      // Si hay formulario, cambiar su acción al link de PayPal neutral
      const newForm = details.querySelector("form");
      if (newForm && originalFormAction) {
        newForm.action = "https://www.paypal.com/ncp/payment/CZ8E9M7F2YP3S";
      }

      // Añadir "(Neutral)" al título
      productTitle.textContent = `${originalTitle} (Neutral)`;

      // Actualizar el texto del botón
      neutralButton.textContent = "Versión Regular";
    } else {
      // 2. Revertir a versión original
      isNeutral = false;

      img.src = originalImgSrc;
      img.alt = originalImgAlt;
      details.innerHTML = originalDetailsHTML;
      productTitle.textContent = originalTitle;

      // Restaurar la acción original del form
      if (originalFormAction) {
        const revertForm = details.querySelector("form");
        if (revertForm) {
          revertForm.action = originalFormAction;
        }
      }

      // Botón vuelve a "Versión Neutral"
      neutralButton.textContent = "Versión Neutral";
    }
  });
});
