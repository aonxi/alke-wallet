$(document).ready(function () {

  mostrarSaldo();
  latestMoves();

  $("#logout").click(function () {

    $("#alert-bootstrap").html(`
            <div class="alert alert-info">
                Cerrando sesión...
            </div>
        `);

    setTimeout(() => {

      window.location.href = "login.html";

    }, 1500);

  });

});

//actualizar saldo y mostrarlo

function mostrarSaldo() {

  let saldo = Number(localStorage.getItem("saldo"));

  if (!saldo) {

    saldo = 60000;

    localStorage.setItem("saldo", saldo);

  }

  if (saldo !== null) {
    $("#saldo-total").text("$" + saldo)
  }

}

//==============================
// Mostrar movimientos recientes
//==============================

function latestMoves() {

  let allMovements = JSON.parse(localStorage.getItem("movementHistory")) || [];

  let lastMovements = allMovements.reverse().slice(0, 3);

  $("#movementsList").html("");

  if (lastMovements.length === 0) {
    $("#movementsList").append(`
            <li class="list-group-item text-muted text-center py-3">
                No hay movimientos recientes.
            </li>
        `);
    return; // Detiene la ejecución aquí si está vacío
  }

  $.each(lastMovements, function (index, item) {

    $("#movementsList").append(`
            <li class="list-group-item">
                <span class="fw-medium">${item.concepto} - </span>
                <span class="fw-bold">$${item.monto}</span>
            </li>
        `);

  });

}

//==============================
// Funcion de links
//==============================

function redirigir(destino, nombre) {

  $("#alert-container").html(`
    <div class="alert alert-info text-center">
    redirigiendo a: ${nombre}
    </div>
    `);

  setTimeout(() => {
    window.location.href = destino;
  }, 2000)
}