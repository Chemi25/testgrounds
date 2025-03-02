document.addEventListener("DOMContentLoaded", () => {
  const toggleDetailsButtons = document.querySelectorAll(".toggle-details");
  const productos = document.querySelectorAll(".producto");

  toggleDetailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentProducto = button.closest(".producto");
      const currentDetails = currentProducto.querySelector(".product-details");

      if (currentDetails.classList.contains("hidden")) {
        // Al abrir, guardamos la posición relativa del producto respecto al viewport
        currentProducto.dataset.initialOffset = currentProducto.getBoundingClientRect().top;

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
        button.textContent = "Ocultar detalles";
        setTimeout(() => {
          currentDetails.style.height = "auto";
        }, 500);
      } else {
        // Al cerrar, medimos la posición actual del producto y calculamos la diferencia
        currentDetails.style.height = `${currentDetails.scrollHeight}px`;
        setTimeout(() => {
          currentDetails.style.height = "0";
          currentDetails.classList.add("hidden");
          productos.forEach((producto) => {
            producto.style.opacity = "1";
            producto.style.visibility = "visible";
            producto.style.position = "relative";
          });
          button.textContent = "Ver más detalles";

          // Calcular y ajustar el scroll para mantener la posición visual del producto
          const initialOffset = Number(currentProducto.dataset.initialOffset) || 0;
          const currentOffset = currentProducto.getBoundingClientRect().top;
          const diff = currentOffset - initialOffset;
          window.scrollBy({ top: diff, behavior: 'auto' });
        }, 0);
      }
    });
  });

  // Desplazar la vista al producto indicado en el hash sin abrir los detalles
  if (window.location.hash) {
    const productId = window.location.hash.substring(1);
    const targetProduct = document.getElementById(productId);
    if (targetProduct) {
      targetProduct.scrollIntoView({ behavior: 'smooth' });
    }
  }
});


