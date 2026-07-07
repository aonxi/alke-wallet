//mostrar saldo

$(document).ready(function () {
  let saldo = localStorage.getItem("saldo");

  if (saldo === null) {
    saldo = 60000;
  }

  $("#saldo-total").text("$" + saldo)

})

$("#deposit").submit(function (e) {

  e.preventDefault();

  let monto = Number($("#monto").val());

  //localstorage obtener valor se saldo
  let saldo = localStorage.getItem("saldo");

  if (saldo === null) {
    saldo = 60000;
  } else {
    saldo = Number(saldo);
  }

  $("#monto").removeClass("is-invalid")

  if (monto <= 0 || isNaN(monto)) {

    $("#monto").addClass("is-invalid")
    $("#monto").text("")
    return
  } else {
    $("#monto").removeClass("is-invalid")
  }


  //guardar los depositos echo aparte

  let depositList = JSON.parse(localStorage.getItem("deposits")) || [];

  let newDeposit = {
    concepto: "Deposito",
    monto: monto
  }

  depositList.push(newDeposit);

  localStorage.setItem("deposits", JSON.stringify(depositList));

  // guardar en almacenamiento general

  let movementHistory = JSON.parse(localStorage.getItem("movementHistory")) || [];

  movementHistory.push(newDeposit);

  localStorage.setItem(
    "movementHistory",
    JSON.stringify(movementHistory)
  );

  //modificar valor de salddo
  let nuevoSaldo = saldo + monto;
  localStorage.setItem("saldo", nuevoSaldo);
  $("#saldo-total").text("$" + saldo)
  $("#deposit-info").text(
    `Monto depositado: $${monto}`
  );
  console.log(nuevoSaldo)

  setTimeout(() => {
    window.location.href = "menu.html";
  }, 2000)

})

function redirigir(destino, nombre) {

  $("#alert-container").html(`
    <div class="card-body text-center">

      <h6 class="text-secondary">redirigiendo a: ${nombre}</h6>

    </div>
    `);

  setTimeout(() => {
    window.location.href = destino;
  }, 2000)
}
