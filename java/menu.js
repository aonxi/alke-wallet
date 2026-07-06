
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

$(document).ready(function () {

  let saldo = localStorage.getItem("saldo");

  if (saldo !== null) {
    $("#saldo-total").text("$" + saldo)
  }
})

