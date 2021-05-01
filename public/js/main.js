const socket = io.connect();

// Al agregar productos recibo el evento 'listProducts' desde el server y actualizo el template
// Para ver los cambios en la tabla
socket.on('listProducts', async (productos) => {
  const archivo = await fetch('plantillas/tabla.hbs');
  const archivoData = await archivo.text();
  const template = Handlebars.compile(archivoData);
  const result = template({productos});
  document.getElementById('productos').innerHTML = result;
});

// Callback del boton submit, chequea que el form este completo y llama a la API
// Si todo esta bien emite el evento 'postProduct' al Websocket avisando que se agrego un producto nuevo
function sendData() {
  if (title.value == '' || title.value == '' || title.value == '' || title.value == '') {
    alert('Por favor complete el formulario.')
  } else {
    const newProd = { "title": title.value, "price": price.value, "thumbnail": thumbnail.value, "form": form.value };
    enviarDatos('http://localhost:8080/api/productos', newProd)
    .then(() => {
      socket.emit('postProduct');
    }).catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }
  return false;
}

// Funcion para hacer el POST de datos
async function enviarDatos(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}