document.addEventListener("DOMContentLoaded", () => {
  const toggleDetailsButtons = document.querySelectorAll(".toggle-details");
  const productos = document.querySelectorAll(".producto");

  toggleDetailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentProducto = button.closest(".producto");
      const currentDetails = currentProducto.querySelector(".product-details");

      if (currentDetails.classList.contains("hidden")) {
        // Al abrir, guardamos la posición actual del scroll
        currentProducto.dataset.initialScroll = window.scrollY;

        // Ocultar todos los productos excepto el seleccionado
        productos.forEach((producto) => {
          if (producto !== currentProducto) {
            producto.style.opacity = "0";
            producto.style.visibility = "hidden";
            producto.style.position = "absolute";
          }
        });

        // Mostrar detalles del producto seleccionado
        currentDetails.style.height = `${currentDetails.scrollHeight}px`;
        currentDetails.classList.remove("hidden");
        button.textContent = "Ocultar detalles"; // Cambiar texto del botón
        setTimeout(() => {
          currentDetails.style.height = "auto";
        }, 500);
      } else {
        // Al cerrar, capturamos la posición almacenada (o la actual si no se había guardado)
        const initialScroll = currentProducto.dataset.initialScroll || window.scrollY;
        currentDetails.style.height = `${currentDetails.scrollHeight}px`;
        setTimeout(() => {
          currentDetails.style.height = "0";
          currentDetails.classList.add("hidden");
          productos.forEach((producto) => {
            producto.style.opacity = "1";
            producto.style.visibility = "visible";
            producto.style.position = "relative";
          });
          button.textContent = "Ver más detalles"; // Restaurar texto del botón

          // Restaurar la posición del scroll para que la página no se desplace al principio
          window.scrollTo({ top: Number(initialScroll), behavior: 'smooth' });
        }, 0);
      }
    });
  });

  // Funcionalidad para abrir directamente un producto si se indica en el hash de la URL (ej. index.html#producto3)
  if (window.location.hash) {
    const productId = window.location.hash.substring(1); // Remueve el '#' del hash
    const targetProduct = document.getElementById(productId);
    if (targetProduct) {
      const toggleButton = targetProduct.querySelector(".toggle-details");
      if (toggleButton) {
        // Simula el click para abrir el producto y ocultar los demás
        toggleButton.click();
        // Opcional: desplaza la vista al producto
        targetProduct.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
});

