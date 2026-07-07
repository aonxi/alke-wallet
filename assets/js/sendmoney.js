//=========================================
// Volver al menú
//=========================================

function redirigir(destino, nombre) {

  $("#alert-container").html(`
    <div class="alert alert-info text-center">
      Redirigiendo a: ${nombre}
    </div>
  `);

  setTimeout(() => {
    window.location.href = destino;
  }, 2000);

}

$(document).ready(function () {

  //=========================================
  // Reiniciar modal al cerrarlo
  //=========================================

  $("#new-contact").on("hidden.bs.modal", function () {

    $(".form-control").val("");
    $(".form-control").removeClass("is-invalid");

    $(".modal-body").show();
    $(".modal-footer").show();

    $(".mensaje-exito").remove();

  });

  $("#transfer-modal").on("hidden.bs.modal", function () {

    $("#transfer-form").show();

    $("#transfer-success").hide();

    $(".modal-footer").show();

    $("#transfer-amount")
      .removeClass("is-invalid")
      .val("");

  });

  //=========================================
  // Guardar contacto
  //=========================================

  $("#guardar-contacto").click(function () {

    let name = $("#name").val().trim();
    let lastName = $("#lastname").val().trim();
    let cbu = $("#cbu").val().trim();
    let alias = $("#alias").val().trim();
    let bank = $("#banco").val().trim();

    $(".form-control").removeClass("is-invalid");

    let valido = true;

    if (name === "") {
      $("#name").addClass("is-invalid");
      valido = false;
    }

    if (lastName === "") {
      $("#lastname").addClass("is-invalid");
      valido = false;
    }

    if (cbu === "") {

      $("#invalid-feedback-cbu").text("Debe ingresar un CBU.");
      $("#cbu").addClass("is-invalid");
      valido = false;

    } else if (cbu.length !== 9 || cbu < 0) {

      $("#invalid-feedback-cbu").text("El CBU debe tener 9 números.");
      $("#cbu").addClass("is-invalid");
      valido = false;

    }

    if (alias === "") {
      $("#alias").addClass("is-invalid");
      valido = false;
    }

    if (bank === "") {
      $("#banco").addClass("is-invalid");
      valido = false;
    }

    if (!valido) return;

    let contact = {
      name,
      lastName,
      cbu,
      alias,
      bank
    };

    let contactList = JSON.parse(localStorage.getItem("contactList")) || [];

    contactList.push(contact);

    localStorage.setItem("contactList", JSON.stringify(contactList));

    $("#contact-list").append(`
      <li class="list-group-item contact-info">
        <input type="radio" name="contacto">

        <div class="contact-name">
          <span>${name} ${lastName}</span>
        </div>

        <div class="contact-details">
          CBU: ${cbu},
          Alias: ${alias},
          Banco: ${bank}
        </div>

      </li>
    `);

    $(".form-control").val("");

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

    }, 2000);

  });

  showContacts();

  //=========================================
  // Seleccionar contacto
  //=========================================

  $(document).on("change", "input[name='contacto']", function () {

    $(".contact-info").removeClass("contact-selected");

    $(this)
      .closest(".contact-info")
      .addClass("contact-selected");

    $("#enviar-dinero").show();

    $("#alert-container").html("");

  });

  //=========================================
  // Buscar contacto
  //=========================================

  $("#search-contact").on("keyup", function () {

    let texto = $(this).val().toLowerCase();

    $("#contact-list li").each(function () {

      let contenido = $(this).text().toLowerCase();

      if (contenido.includes(texto)) {

        $(this).show();

      } else {

        $(this).hide();

      }

    });

  });

});

//=========================================
// Mostrar contactos
//=========================================

function showContacts() {

  let contactList = JSON.parse(localStorage.getItem("contactList")) || [];

  $("#contact-list").html("");

  for (let contact of contactList) {

    $("#contact-list").append(`
      <li class="list-group-item contact-info">

        <input type="radio" name="contacto">

        <div class="contact-name">
          <span>${contact.name} ${contact.lastName}</span>
        </div>

        <div class="contact-details">
          CBU: ${contact.cbu},
          Alias: ${contact.alias},
          Banco: ${contact.bank}
        </div>

      </li>
    `);

  }

}

//=========================================
// Enviar dinero
//=========================================

$("#enviar-dinero").click(function () {

  let contactSelected = $("input[name='contacto']:checked");

  if (contactSelected.length === 0) {

    $("#alert-container").html(`
      <div class="alert alert-info">
        Debe seleccionar un contacto.
      </div>
    `);

    return;

  }

  let saldo = Number(localStorage.getItem("saldo"));

  saldo = saldo === null ? 60000 : Number(saldo);

  let nombre = contactSelected.closest(".contact-info").find(".contact-name span").text();

  $("#transfer-contact").text(nombre);

  $("#transfer-balance").text("$" + saldo);

  $("#transfer-amount").val("");
  $("#transfer-amount").removeClass("is-invalid");

  $("#transfer-form").show();
  $("#transfer-success").hide();

  $(".modal-footer").show();


});


$("#confirm-transfer").click(function () {

  let saldo = Number(localStorage.getItem("saldo"));

  if (!saldo) {

    saldo = 60000;

  }

  let monto = Number($("#transfer-amount").val());

  if (monto <= 0 || isNaN(monto)) {

    $("#transfer-amount").addClass("is-invalid");

    return;

  }

  if (monto > saldo) {

    $("#transfer-amount")
      .addClass("is-invalid");

    $(".invalid-feedback")
      .text("Saldo insuficiente.");

    return;

  }

  $("#transfer-amount").removeClass("is-invalid");

  let nuevoSaldo = saldo - monto;

  localStorage.setItem("saldo", nuevoSaldo);

  let nombre = $("#transfer-contact").text();

  let transferHistory = JSON.parse(
    localStorage.getItem("transferHistory")
  ) || [];

  let newTransfer = {

    concepto: "Transferencia a: " + nombre,

    monto: monto

  };

  transferHistory.push(newTransfer);

  localStorage.setItem(
    "transferHistory",
    JSON.stringify(transferHistory)
  );

  // guardamos en almacenamiento general

  let movementHistory = JSON.parse(localStorage.getItem("movementHistory")) || [];

  movementHistory.push(newTransfer);

  localStorage.setItem(
    "movementHistory",
    JSON.stringify(movementHistory)
  );

  $("#transfer-form").hide();

  $("#transfer-success").show();

  $(".modal-footer").hide();

  setTimeout(function () {

    bootstrap.Modal
      .getInstance(
        document.getElementById("transfer-modal")
      )
      .hide();

    window.location.href = "menu.html";

  }, 2000);

});