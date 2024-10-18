<h1>Entrega Final para curso Javascript - Comisión 64790 - Jaimes Natalia</h1>

Pagina web para presupuestar costos de impresiones 3D.
Se tienen en consideración datos como: <br>
*Tipo de Filamento <br>
*Cantidad de Filamento a usar <br>
*Precio y Cantidad de Filamento que trae una Bobina <br>

Se puede calcular el <b>costo base</b> y se pueden agregar datos de <b>costos de Electricidad</b> y <b>Mano de Obra</b>: <br>
*En los costos de electricidad se calcula el costo de la energía eléctrica consumida durante la impresión, basado en el consumo de energía de la impresora, el tiempo de impresión y el precio del kWh. <br>
*En los costos de Mano de Obra se calcula el costo de la mano de obra involucrada en la preparación y el postprocesamiento de la impresión, basado en el tiempo y el costo por hora. <br>

La funcionalidad de la pagina web está hecha en Javascript. <br>
En el codigo podemos contemplar una clase (CalculadoraCostos3D) que maneja la logica de los calculos, el almacenamiento y recuperación de datos y parte de la modificación de la interfaz de usuario. <br>
Los usuarios ingrsan los datos en forma de input a traves de un formulario y al cargar datos se pueden ver los primeros resultados de los calculos realizados. <br>
A partir de que informacion cargamos, se pueden ver 4 calculos diferentes: <br>
*<b>Calculo Base:</b> Se calcula el peso del filamento usado multiplicado por el precio de la bobina y esto se divide por el peso de la bobina. <br>
*<b>Calculo Electrico:</b> Se multiplica el consumo electrico por el precio del KW, se divide por 1000 y eso se multiplica por el tiempo de la impresión. (Opcional) <br>
*<b>Calculo de Mano de Obra:</b> El tiempo de la Mano de Obra de preproducción y postproducción se multiplican por sus costes por Hora, se dividen por 60 cada uno y luego se suman. (Opcional) <br>
*<b>Calculo Total:</b> Sumatoria de todos los calculos anteriores. En caso de no cargar algun dato opcional, no se considera en esta suma. Este calculo final se muestra en pantalla al seleccionar el botón <b>"Finalizar Cálculo"</b>. <br>

Para seleccionar el tipo de filamento se generó un archivo .json con un array de tipos de filamento para que desde Javascript podamos llamar al mismo de forma asincronica a traves de un fetch y generar los elementos options acorde a la cantidad de tipos agregados al array. <br>

Las partes del formulario que son opcionales se encuentran ocultas hasta seleccionar el botón <b>"Opcional"</b> en cada sección. <br>

Tambien se agregó una sidebar con un historial de Cálculos que trae la información almacenada en el localStorage al seleccionar el botón <b>"Finalizar Cálculo"</b>. Este historial solo muestra los campos que hayan sido cargados en cada trabajo, si el campo está vacio, el mismo no se muestra. <br>

Los datos que se guardan en la sessionStorage se pueden limpiar haciendo click en el botón <b>"Reiniciar"</b>. Este botón no elimina la información del historial ni de localStorage, y si las secciones opcionales se encuentran visibles, las ocultará como se ven por default. <br>