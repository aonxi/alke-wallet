$(document).ready(function() {

    latestMoves();

});

function latestMoves() {

    // Obtener depósitos

    let deposits = JSON.parse(localStorage.getItem("deposits")) || [];

    // Obtener transferencias

    let transfers = JSON.parse(localStorage.getItem("transferHistory")) || [];

    // Unir ambos arreglos

    let allMovements = deposits.concat(transfers);

    // Limpiar lista

    $("#movementsList").html("");

    // Mostrar en pantalla

    $.each(allMovements, function (index, item) {

        $("#movementsList").append(`
            <li class="list-group-item">
                ${item.concepto} - $${item.monto}
            </li>
        `);

    });

}