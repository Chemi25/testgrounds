document.addEventListener("DOMContentLoaded", () => {
  const toggleDetailsButtons = document.querySelectorAll(".toggle-details");
  const productos = document.querySelectorAll(".producto");

  toggleDetailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentProducto = button.closest(".producto");
      const currentDetails = currentProducto.querySelector(".product-details");

      if (currentDetails.classList.contains("hidden")) {
        // Al abrir, ocultamos los demás productos usando la clase CSS
        productos.forEach((producto) => {
          if (producto !== currentProducto) {
            producto.classList.add("hidden-others");
          }
        });

        // Mostramos los detalles del producto seleccionado
        currentDetails.style.height = `${currentDetails.scrollHeight}px`;
        currentDetails.classList.remove("hidden");
        button.textContent = "Ocultar detalles";
        setTimeout(() => {
          currentDetails.style.height = "auto";
        }, 500);
      } else {
        // Al cerrar, colapsamos los detalles
        currentDetails.style.height = `${currentDetails.scrollHeight}px`;
        setTimeout(() => {
          currentDetails.style.height = "0";
          setTimeout(() => {
            currentDetails.classList.add("hidden");
            // Restauramos la visibilidad de todos los productos
            productos.forEach((producto) => {
              producto.classList.remove("hidden-others");
            });
            button.textContent = "Ver más detalles";
            // No se realiza ningún ajuste de scroll, por lo que la posición se mantiene
          }, 500);
        }, 0);
      }
    });
  });

  // Si la URL trae un hash, se desplaza suavemente hasta ese producto, sin abrir sus detalles
  if (window.location.hash) {
    const productId = window.location.hash.substring(1);
    const targetProduct = document.getElementById(productId);
    if (targetProduct) {
      targetProduct.scrollIntoView({ behavior: 'smooth' });
    }
  }
});





