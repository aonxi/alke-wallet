//=========================================
// volver al menú
//=========================================

function redirigir(destino, nombre) {

  $("#alert-container").html(`
    <div class="alert alert-info">
    redirigiendo a: ${nombre}
    </div>
    `);

  setTimeout(() => {
    window.location.href = destino;
  }, 2000)
}

//=========================================
// agregar y guardar contacto
//=========================================

$(document).ready(function () {

  $(".modal-body").show();

  //limpiar modal al cerrar con boton
  //hidden.bs.modal es un evento de bootstrap
  //significa "cuando el modal se cierre

  $("#new-contact").on("hidden.bs.modal", function () {

    $(".form-control").val("");
    $(".form-control").removeClass("is-invalid");
    $(".modal-body").show();
    $(".modal-footer").show();
    $(".mensaje-exito").remove();
  });

  $("#guardar-contacto").click(function () {

    //Declarar variables y agregar valor
    let name = $("#name").val().trim();
    let lastName = $("#lastname").val().trim();
    let cbu = $("#cbu").val().trim();
    let alias = $("#alias").val().trim();
    let bank = $("#banco").val().trim();

    //limpiamos errores
    $(".form-control").removeClass("is-invalid");
    let valido = true;

    //validamos inputs de contacto

    if (name === "") { $("#name").addClass("is-invalid"); valido = false }

    if (lastName === "") { $("#lastname").addClass("is-invalid"); valido = false }

    if (cbu === "") {
      $("#invalid-feedback-cbu").text("Debe ingresar un cbu");
      $("#cbu").addClass("is-invalid"); valido = false
    }
    else if (cbu.length !== 9 || cbu < 0) {

      $("#invalid-feedback-cbu").text("CBU debe tener 9 numeros y ser mayor que 0");

      $("#cbu").addClass("is-invalid");
      valido = false;
    }

    if (alias === "") { $("#alias").addClass("is-invalid"); valido = false }

    if (bank === "") { $("#banco").addClass("is-invalid"); valido = false }

    if (!valido) { return };


    //creamos objeto contacto

    let contact = {
      name: name,

      lastName: lastName,

      cbu: cbu,

      alias: alias,

      bank: bank
    }

    //guardamos el contacto

    let contactList = JSON.parse(localStorage.getItem("contactList")) || [];

    contactList.push(contact);

    localStorage.setItem("contactList", JSON.stringify(contactList));

    //agregamos contacto a pantalla

    $("#contact-list").append(`
      <li class="list-group-item contact-info">
      <input type="radio" name="contacto">
      <div class="contact-name"><span>${name} ${lastName}</span></div>
      <div class="contact-details">CBU: ${cbu}, Alias: ${alias}, Banco: ${bank}</div>
      </li>
      `)

    //limpiamos formulario

    $("#name").val("");
    $("#lastname").val("");
    $("#cbu").val("");
    $("#alias").val("");
    $("#banco").val("");


    //Mensaje de exito

    $(".modal-body").hide();
    $(".modal-footer").hide();

    $(".modal-content").append(`
      <div class="mensaje-exito p-4 text-center">
      <h4 class="text-success">
      Contacto agregado correctamente
      </h4>
      </div>
    `);

    setTimeout(() => {
      $("#cerrar-modal").click();
    }, 2000)

  })
  showContacts();

  //=========================================
  // mostrar boton y resaltar contacto seleccionado
  //=========================================

  // .on es un indicador; significa "cuando: ...".
  // cuando input[...] cambie (change), entonces ejecuta.
  // equivale a document.getElementById("search-contact").addEventListener("keyup", function () {...}

  $(document).on("change", "input[name='contacto']", function () {

    $(".contact-info").removeClass("contact-selected");

    // resaltar seleccionado
    // this = elemento que provoco el evento
    // ejem. seleccion: <input type="radio" name="contacto">
    // entonces: this = <input type="radio" name="contacto">
    // .cosest busca el padre mas cercado, en este caso seria li

    $(this).closest(".contact-info").addClass("contact-selected");

    // mostrar botón enviar

    $("#enviar-dinero").show();

    $("#alert-container").html("");

  });

  //=========================================
  // buscar contacto
  //=========================================

  // keyup es un evento que se dispara cuando se suelta una tecla
  // quiere decir que cada ves que se escribe una letra se dispara la funcion
  $("#search-contact").on("keyup", function () {

    // obtener texto ingresado en minusculas con toLowerCase

    let texto = $(this).val().toLowerCase();

    // recorrer contactos ; each recorre cada elemento 
    // js: for(let contacto of contactos){...}
    // jquery: $("#id etiqueta").each(function() {...})


    $("#contact-list li").each(function () {

      let contenido = $(this).text().toLowerCase();

      // includes busa texto dentro de otro texto.
      // ejem: "pepe pastpr".includes"pastor" es true. 

      if (contenido.includes(texto)) {

        $(this).show();

      } else {

        $(this).hide();

      }

    });

  });

})

//=========================================
// mostrar contactos del local storage en pantalla
//=========================================

function showContacts() {

  console.table(JSON.parse(localStorage.getItem("contactList")));

  let contactList = JSON.parse(localStorage.getItem("contactList")) || [];
  $("#contact-list").html("");

  for (let contact of contactList) {

    $("#contact-list").append(`
    <li class="list-group-item contact-info" >
    <input type="radio" name="contacto">
    <div class="contact-name"><span>${contact.name} ${contact.lastName}</span></div>
    <div class="contact-details">CBU: ${contact.cbu}, Alias: ${contact.alias}, Banco: ${contact.bank}</div>
    </li>      
      `)
  }
}

//=========================================
// enviar dinero al contacto seleccionado
//=========================================

$("#enviar-dinero").click(function () {

  let contactSelected = $("input[name='contacto']:checked");
  let saldo = localStorage.getItem("saldo");

  if (saldo === null) {
    saldo = 60000; //si es primera vez se usa saldo base
  } else {
    saldo = Number(saldo); //si no, se transforma el texto entregado de localStorage a numero
  }

  //validar que se selecciono un contacto

  if (contactSelected.length === 0) {
    $("#alert-container").html(`
    <div class="alert alert-info">
    Debe seleccionar un contacto
    </div>
    `
    );
    return;
  }

  // pedir monto

  let monto = Number(prompt("Ingrese el monto a enviar:"));

  // validar monto

  if (monto <= 0 || isNaN(monto)) {

    $("#alert-container").html(`
    <div class="alert alert-danger">
      Ingrese un monto válido.
    </div>
  `);

    return;
  }

  if (monto > saldo) {

    $("#alert-container").html(`
    <div class="alert alert-danger">
      Saldo insuficiente.
    </div>
  `);

    return;
  }

  // calcular nuevo saldo

  let nuevoSaldo = saldo - monto;

  localStorage.setItem("saldo", nuevoSaldo);

  //=========================================
  // Guardar historial
  //=========================================

  /*
  this ya no sirve porque estamos dentro del botón
  Enviar Dinero.
  
  Tenemos que partir desde el radio seleccionado (contacto).
  
  contactSelected = radio seleccionado
  
  .closest() = subir hasta el <li>
  
  .find() = buscar dentro del li
  
  .text() = obtener únicamente el texto
  */

  let nombre = contactSelected.closest(".contact-info").find(".contact-name span").text();

  let transferHistory = JSON.parse(localStorage.getItem("transferHistory")) || [];

  let transfer = {
    concepto: "Transferencia a: " + nombre,
    monto: monto

  };

  transferHistory.push(transfer);

  localStorage.setItem("transferHistory", JSON.stringify(transferHistory));

  $("#alert-container").html(`
  <div class="alert alert-success">
    Se realizo la transferencia de forma exitosa.
  </div>
`);

  setTimeout(function () {

    window.location.href = "menu.html";

  }, 2000);

})

