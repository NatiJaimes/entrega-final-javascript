//tengo un archivo json con el array de tipos de filamentos para poder llamarlo con un fetch y utilizarlo en el input del formulario
async function cargarFilamentos() {
    const url = 'filamentos.json';
    try {
        const respuesta = await fetch(url);
        const filamentos = await respuesta.json();
        const listaFilamentos = document.getElementById('tipoFilamento');

        filamentos.forEach(filamento => {
            const nuevaOpcion = document.createElement('option');
            nuevaOpcion.textContent = filamento.nombre;
            nuevaOpcion.value = filamento.nombre;
            listaFilamentos.appendChild(nuevaOpcion);
        });
    } catch (error) {
        console.warn('Error cargando los filamentos:', error);
    }
}

//la carga de datos de gasto electrico y de mano de obra son opcionales
//con el siguiente codigo al hacer click en el button se habilita o no esa sección
const opcionalElec = document.getElementById("opcionalElec");
const contenedorElec = document.getElementById("contenedorElec");

opcionalElec.addEventListener('click', (e) => {
    e.preventDefault();
    contenedorElec.classList.toggle('oculto');
});

const opcionalManOb = document.getElementById("opcionalManOb");
const contenedorManOb = document.getElementById("contenedorManOb");

opcionalManOb.addEventListener('click', (e) => {
    e.preventDefault()
    contenedorManOb.classList.toggle('oculto');
});


class CalculadoraCostos3D {
    constructor() {
        this.inputs = {
            peso: document.getElementById('peso'),
            bobinaPrecio: document.getElementById('bobinaPrecio'),
            bobinaPeso: document.getElementById('bobinaPeso'),
            tiempo: document.getElementById('tiempo'),
            consumo: document.getElementById('consumo'),
            precioKW: document.getElementById('precioKW'),
            tiempoManoObra: document.getElementById('tiempoManoObra'),
            costeManoObra: document.getElementById('costeManoObra'),
            tiempoPost: document.getElementById('tiempoPost'),
            costePost: document.getElementById('costePost')
        };
        this.nombreTrabajo = document.getElementById('nombreTrabajo'),
        this.tipoFilamento = document.getElementById('tipoFilamento'),
        this.totalBaseOutput = null;
        this.totalElectricoOutput = null;
        this.totalManoObraOutput = null;
        this.totalesOutput = document.getElementById('totales');
        this.resetButton = document.getElementById('reset');
        this.calcularButton = document.getElementById('calcular')
        this.historialOutput = document.getElementById('historial');
        this.sidebar = document.getElementById('sidebar');
        this.abrirSidebar = document.getElementById('openSidebar');
        this.cerrarSidebar = document.getElementById('closeSidebar')

        this.crearCostosTotales();
        this.addEventListeners();
        this.cargarDatos();
    }

    crearCostosTotales() {
        this.totalBaseOutput = document.createElement('p');
        this.totalBaseOutput.id = 'totalBase';
        this.totalBaseOutput.className = 'costoBase';
        this.totalBaseOutput.style.display = 'none';
        document.querySelector('.datosBase').appendChild(this.totalBaseOutput);

        this.totalElectricoOutput = document.createElement('p');
        this.totalElectricoOutput.id = 'totalElectrico';
        this.totalElectricoOutput.className = 'costoElectrico';
        this.totalElectricoOutput.style.display = 'none';
        document.getElementById('contenedorElec').appendChild(this.totalElectricoOutput);

        this.totalManoObraOutput = document.createElement('p');
        this.totalManoObraOutput.id = 'totalManoObra';
        this.totalManoObraOutput.className = 'costoManoObra';
        this.totalManoObraOutput.style.display = 'none';
        document.getElementById('contenedorManOb').appendChild(this.totalManoObraOutput);
    }

    openSidebar() {
        this.sidebar.style.width = '250px';
    }

    closeSidebar() {
        this.sidebar.style.width = '0';
    }

    addEventListeners() {
        this.nombreTrabajo.addEventListener('input', () => {
            this.guardarDatos();
        });
        this.tipoFilamento.addEventListener('input', () => {
            this.guardarDatos();
        });
        for (const key in this.inputs) {
            if (this.inputs.hasOwnProperty(key)) {
                this.inputs[key].addEventListener('input', () => {
                    this.calcularTotal();
                    this.guardarDatos();
                });
            }
        }
        this.resetButton.addEventListener('click', () => {
            this.reiniciarFormulario();
        });

        this.calcularButton.addEventListener('click', () => {
            this.mostrarTotal();
        })

        this.abrirSidebar.addEventListener('click', () => {
            this.openSidebar();
        });

        this.cerrarSidebar.addEventListener('click', () => {
            this.closeSidebar();
        });
    }

    calcularTotal() {
        const peso = parseFloat(this.inputs.peso.value);
        const bobinaPrecio = parseFloat(this.inputs.bobinaPrecio.value);
        const bobinaPeso = parseFloat(this.inputs.bobinaPeso.value);
        const tiempo = parseFloat(this.inputs.tiempo.value) || 0;
        const consumo = parseFloat(this.inputs.consumo.value) || 0;
        const precioKW = parseFloat(this.inputs.precioKW.value) || 0;
        const tiempoManoObra = parseFloat(this.inputs.tiempoManoObra.value) || 0;
        const costeManoObra = parseFloat(this.inputs.costeManoObra.value) || 0;
        const tiempoPost = parseFloat(this.inputs.tiempoPost.value) || 0;
        const costePost = parseFloat(this.inputs.costePost.value) || 0;

        // Calcular el costo base
        const costoBase = (peso * bobinaPrecio) / bobinaPeso;

        // Calcular el costo eléctrico
        const costoElectrico = ((consumo * precioKW) / 1000) * tiempo;

        // Calcular el costo de mano de obra
        const costoManoObra = ((tiempoManoObra * costeManoObra) / 60) + ((tiempoPost * costePost) / 60);

        // Calcular el total
        this.total = costoBase + costoElectrico + costoManoObra;

        // Mostrar/ocultar los totales
        if (costoBase > 0 && !isNaN(costoBase)) {
            this.totalBaseOutput.style.display = 'block';
            this.totalBaseOutput.textContent = `Costo Base: $${costoBase.toFixed(2)}`;
        } else {
            this.totalBaseOutput.style.display = 'none';
        }

        if (costoElectrico > 0 && !isNaN(costoElectrico)) {
            this.totalElectricoOutput.style.display = 'block';
            this.totalElectricoOutput.textContent = `Costo Eléctrico: $${costoElectrico.toFixed(2)}`;
        } else {
            this.totalElectricoOutput.style.display = 'none';
        }

        if (costoManoObra > 0 && !isNaN(costoManoObra)) {
            this.totalManoObraOutput.style.display = 'block';
            this.totalManoObraOutput.textContent = `Costo Mano de Obra: $${costoManoObra.toFixed(2)}`;
        } else {
            this.totalManoObraOutput.style.display = 'none';
        }
    }

    mostrarTotal() {
        if (this.total > 0 && !isNaN(this.total)) {
            this.totalesOutput.style.display = 'block';
            this.totalesOutput.textContent = `Costo Total: $${this.total.toFixed(2)}`;
            
            // Obtener fecha y hora actual con la libreria Luxon
            const DateTime = luxon.DateTime;
            const now = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

            // Construir el contenido del historial
            let historialContenido = `
                <p>Fecha y Hora: ${now}</p>
                <p>Trabajo: ${this.nombreTrabajo.value}</p>
                <p>Filamento: ${this.tipoFilamento.value}</p>
                <p>Costo Total: $${this.total.toFixed(2)}</p>
            `;

            const inputsToCheck = [
                { label: 'Peso en gramos', value: `${this.inputs.peso.value}` },
                { label: 'Precio Bobina', value: `${this.inputs.bobinaPrecio.value}` },
                { label: 'Peso Bobina en gramos', value: `${this.inputs.bobinaPeso.value}` },
                { label: 'Tiempo Impresión en minutos', value: `${this.inputs.tiempo.value}` },
                { label: 'Consumo Energía en W/h', value: `${this.inputs.consumo.value}` },
                { label: 'Precio kWh', value: `${this.inputs.precioKW.value}` },
                { label: 'Tiempo Mano de Obra en minutos', value: `${this.inputs.tiempoManoObra.value}` },
                { label: 'Coste Mano de Obra', value: `${this.inputs.costeManoObra.value}` },
                { label: 'Tiempo Postprocesamiento en minutos', value: `${this.inputs.tiempoPost.value}` },
                { label: 'Coste Postprocesamiento', value: `${this.inputs.costePost.value}` },
            ];

            inputsToCheck.forEach(input => {
                if (input.value !== "" && input.value !== "undefined") {
                    historialContenido += `<p>${input.label}: ${input.value}</p>`;
                }
            });

            // Guardar en el historial
            const historialItem = document.createElement('div');
            historialItem.className = 'historial-item';
            historialItem.innerHTML = historialContenido;
            this.historialOutput.appendChild(historialItem);

            // Almacenar en localStorage
            let historial = JSON.parse(localStorage.getItem('historial')) || [];
            historial.push({
                fechaHora: now,
                trabajo: this.nombreTrabajo.value,
                filamento: this.tipoFilamento.value,
                peso: this.inputs.peso.value,
                bobinaPrecio: this.inputs.bobinaPrecio.value,
                bobinaPeso: this.inputs.bobinaPeso.value,
                tiempo: this.inputs.tiempo.value,
                consumo: this.inputs.consumo.value,
                precioKW: this.inputs.precioKW.value,
                tiempoManoObra: this.inputs.tiempoManoObra.value,
                costeManoObra: this.inputs.costeManoObra.value,
                tiempoPost: this.inputs.tiempoPost.value,
                costePost: this.inputs.costePost.value,
                costoTotal: this.total.toFixed(2)
            });
            localStorage.setItem('historial', JSON.stringify(historial));
        } else {
            this.totalesOutput.style.display = 'none';
        }
    }

    guardarDatos() {
        const datos = {};
        for (const key in this.inputs) {
            if (this.inputs.hasOwnProperty(key)) {
                datos[key] = this.inputs[key].value;
            }
        }
        sessionStorage.setItem('nombreTrabajo', this.nombreTrabajo.value);
        sessionStorage.setItem('tipoFilamento', this.tipoFilamento.value);
        sessionStorage.setItem('datosFormulario', JSON.stringify(datos));
    }

    cargarDatos() {
        const nombreTrabajo = sessionStorage.getItem('nombreTrabajo');
        const tipoFilamento = sessionStorage.getItem('tipoFilamento');
        if (nombreTrabajo) {
            this.nombreTrabajo.value = nombreTrabajo;
        }
        if (tipoFilamento) {
            this.tipoFilamento.value = tipoFilamento;
        }
        const datos = JSON.parse(sessionStorage.getItem('datosFormulario'));
        if (datos) {
            for (const key in datos) {
                if (datos.hasOwnProperty(key) && this.inputs[key]) {
                    this.inputs[key].value = datos[key];
                }
            }
        }

        this.calcularTotal();

        // Cargar el historial
        const historial = JSON.parse(localStorage.getItem('historial')) || [];
        historial.forEach(item => {
            let historialContent = `
                <p>Fecha y Hora: ${item.fechaHora}</p>
                <p>Trabajo: ${item.trabajo}</p>
                <p>Filamento: ${item.filamento}</p>
                <p>Costo Total: $${item.costoTotal}</p>
            `;

            const inputsToCheck = [
                { label: 'Peso en gramos', value: `${item.peso}` },
                { label: 'Precio Bobina', value: `${item.bobinaPrecio}` },
                { label: 'Peso Bobina en gramos', value: `${item.bobinaPeso}` },
                { label: 'Tiempo Impresión en minutos', value: `${item.tiempo}` },
                { label: 'Consumo Energía en W/h', value: `${item.consumo}` },
                { label: 'Precio kWh', value: `${item.precioKW}` },
                { label: 'Tiempo Mano de Obra en minutos', value: `${item.tiempoManoObra}` },
                { label: 'Coste Mano de Obra', value: `${item.costeManoObra}` },
                { label: 'Tiempo Postprocesamiento en minutos', value: `${item.tiempoPost}` },
                { label: 'Coste Postprocesamiento', value: `${item.costePost}` },
            ];

            inputsToCheck.forEach(input => {
                if (input.value !== "" && input.value !== "undefined") {
                    historialContent += `<p>${input.label}: ${input.value}</p>`;
                }
            });

            const historialItem = document.createElement('div');
            historialItem.className = 'historial-item';
            historialItem.innerHTML = historialContent;
            this.historialOutput.appendChild(historialItem);
        });
    }

    reiniciarFormulario() {
        // Limpiar los campos de entrada
        for (const key in this.inputs) {
            if (this.inputs.hasOwnProperty(key)) {
                this.inputs[key].value = '';
            }
        }
        this.nombreTrabajo.value = '';
        this.tipoFilamento.value = '';

        // Limpiar los elementos de salida
        this.totalBaseOutput.style.display = 'none';
        this.totalElectricoOutput.style.display = 'none';
        this.totalManoObraOutput.style.display = 'none';
        this.totalesOutput.style.display = 'none';

        // Se ocultan los gastos opcionales
        if (!contenedorElec.classList.contains('oculto')) {
            contenedorElec.classList.add('oculto');
        }
        if (!contenedorManOb.classList.contains('oculto')) {
            contenedorManOb.classList.add('oculto');
        }

        // Limpiar el almacenamiento de sesión
        sessionStorage.removeItem('datosFormulario');
        sessionStorage.removeItem('nombreTrabajo');
        sessionStorage.removeItem('tipoFilamento');
    }
}

// Inicializar la calculadora
document.addEventListener('DOMContentLoaded', () => {
    cargarFilamentos();
    new CalculadoraCostos3D();
});