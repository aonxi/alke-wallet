$(document).ready(function () {

  latestMoves();

});

//=========================================
// Mostrar movimientos
//=========================================

function latestMoves() {

  let allMovements = JSON.parse(localStorage.getItem("movementHistory")) || [];

  $("#movementsList").html("");

  if (allMovements.length === 0) {

    $("#movementsList").append(`

            <li class="list-group-item text-center text-muted py-4">

                No existen movimientos registrados.

            </li>

        `);

    return;
  }

  allMovements.reverse();

  $.each(allMovements, function (x, object) {

    let icont = "💳";

    if (object.concepto === "Deposito") {
      icont = "💰";
    }

    $("#movementsList").append(` 

            <li class="list-group-item movement-item">

                <div>

                    <strong> ${icont} ${object.concepto}</strong>

                </div>

                <div class="text-primary fw-bold">

                    $${Number(object.monto).toLocaleString()}

                </div>

            </li>

        `);

  });

}

//=========================================
// Volver al menú
//=========================================

function redirigir(destino, nombre) {

  $("#movements").html(`

        <div class="card-body shadow-sm text-center">

            <h6 class="text-secondary">redirigiendo a: ${nombre}</h6>

        </div>

        
    `);

  setTimeout(() => {

    window.location.href = destino;

  }, 2000);

}