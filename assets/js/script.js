// Precio de cada ingrediente extra
const precioIngredienteExtra = 800;

const ingredientesCheckBoxes = document.querySelectorAll('.form-check-input');
const seleccionados = document.querySelector('#ingredientes-seleccionados');
const extrasSeleccionados = document.querySelector('#ingrediente-extra');
const valorExtra = document.querySelector('#valor-extra');
const valorPropina = document.querySelector('#valor-propina');
const propinaInput = document.querySelector('#propina-ingresa');
const botonEnviarPedido = document.querySelector('.btn');

// Función para mostrar el resumen del pedido
function crearPedido(pizzaBase = 'Pizza XL') {
    let ingredientesSeleccionados = [];
    let ingredientesExtras = [];
    let contadorGratis = 0;

    for (const checkBox of ingredientesCheckBoxes) {
        if (checkBox.checked) {
            if (contadorGratis < 3) {
                ingredientesSeleccionados.push(checkBox.nextElementSibling.textContent);
                contadorGratis++;
            } else {
                ingredientesExtras.push(checkBox.nextElementSibling.textContent);
            }
        }
    }

    // Mostrar ingredientes seleccionados y extras
    seleccionados.innerHTML = ` ${ingredientesSeleccionados.join(', ')}`;
    extrasSeleccionados.innerHTML = ` ${ingredientesExtras.join(', ')}`;

    // Calcular el costo de los ingredientes extras
    const costoExtras = ingredientesExtras.length * precioIngredienteExtra;
    valorExtra.textContent = `$${costoExtras.toLocaleString()}`;
}

// Función para agregar la propina
function agregarPropina(valor = 1000) {
    valorPropina.textContent = `$${valor.toLocaleString()}`;
}

// Evento para manejar cambios en los ingredientes seleccionados
ingredientesCheckBoxes.forEach((checkBox) => {
    checkBox.addEventListener('change', () => {
        crearPedido();
    });
});

// Evento para manejar la entrada de propina
propinaInput.addEventListener('input', () => {
    const valorPropinaIngresada = parseInt(propinaInput.value) || 0;
    agregarPropina(valorPropinaIngresada);
});

// Evento para enviar el pedido
botonEnviarPedido.addEventListener('click', () => {
    const propinaActual = valorPropina.textContent;

    if (propinaActual === '$0') {
        alert('Aún no ha definido una propina');
    } else {
        alert(`Su propina de ${propinaActual} ha sido enviada`);
    }
});

// Inicializar con valores por defecto
crearPedido();
agregarPropina();



