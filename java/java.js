
// agregar eventos a botones

function redirigir(destino, nombre) {
  alert("Redirigiendo a " + nombre);
  window.location.href = destino;
}

// index.html

function login() {
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  if (email === "usuario@gmail.com" && password === "contraseña.1") {
    alert("Iniciando sesión")
    window.location.href = "menu.html"
  } else if (email == "" || password == "") {
    alert("Credenciales incompletas.");
  } else {
    alert("Credenciales incorrectas")
    document.getElementById("password").value = "";
  }
}



// Parte deposit.html


function depositar() {
  let monto = Number(document.getElementById("monto").value);
  //localstorage obtener valor se saldo
  let saldo = localStorage.getItem("saldo");

  if (saldo === null) {
    saldo = 60000;
  } else {
    saldo = Number(saldo);
  }

  if (monto <= 0 || isNaN(monto)) {
    alert("Monto ingresado no es válido");
    return;
  }
  document.getElementById("monto").value = "";


  //guardar los depositos echo

  let depositList = JSON.parse(localStorage.getItem("deposits")) || [];

  let newDeposit = {
    concepto: "Deposito",
    monto: monto
  }

  depositList.push(newDeposit);

  localStorage.setItem("deposits", JSON.stringify(depositList));

  //modificar valor de salddo
  let nuevoSaldo = saldo + monto;
  localStorage.setItem("saldo", nuevoSaldo);
  alert("Depósito realizado correctamente");
  console.log(nuevoSaldo)
  window.location.href = "menu.html";
}

//Actualizar saldo en menú
function cargarSaldo() {
  let saldo = localStorage.getItem("saldo");

  if (saldo !== null) {
    document.getElementById("saldo-total").innerText = "$" + saldo;
  }
}

//mandar dinero y guardar contacto (sendmoney.html)

function nuevoContacto() {
  let name = document.getElementById("name").value;
  let lastName = document.getElementById("lastname").value;
  let cbu = document.getElementById("cbu").value;
  let alias = document.getElementById("alias").value;
  let bank = document.getElementById("banco").value;

  if (!name || !lastName || !cbu || !alias || !bank) {
    alert("Complete todos los campos")
    return
  } else if (cbu.length !== 9 || cbu < 0) {
    alert("El CBU debe tener 9 digítos")
    return;
  } else {
    let lista = document.getElementById("contact-list")
    let nuevoLi = document.createElement("li");
    nuevoLi.className = "list-group-item contact-info";

    nuevoLi.innerHTML = `
      <input type="radio" name="contacto">
      <div class="contact-name"><span>${name} ${lastName}</span></div>
      <div class="contact-details">CBU: ${cbu}, Alias: ${alias}, Banco: ${bank}</div>
    `
    // creo este var aqui para que ya venga con las validaciones del if:
    var contact = {
      name: name,
      lastName: lastName,
      cbu: cbu,
      alias: alias,
      bank: bank
    }

    lista.appendChild(nuevoLi);
    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("cbu").value = "";
    document.getElementById("alias").value = "";
    document.getElementById("banco").value = "";
    alert("Se agrego correctamente");
    document.getElementById("cerrar-modal").click();
  }

  //parte de guardar en memoria:

  let contactList = localStorage.getItem("contactList");

  if (contactList === null) {
    contactList = [];
  } else {
    contactList = JSON.parse(contactList)
  }

  contactList.push(contact);

  localStorage.setItem("contactList", JSON.stringify(contactList))

  console.log(contactList)

}

function showContacts() {
  console.table(JSON.parse(localStorage.getItem("contactList")));  /*
  -obtener lista del localstorage y verificar si esta vasio.
  -tener una variable con los datos de la lista
  -crear una lista por cada contacto de local storage
  -ingresar uno por uno los contactos a la ul
  */

  //for (inicio; condicion; cambio)
  let contactList = JSON.parse(localStorage.getItem("contactList")) || []; // || [] en caso de null usar array vacio
  let lista = document.getElementById("contact-list")

  for (let contact of contactList) {
    let nuevoLi = document.createElement("li");
    nuevoLi.className = "list-group-item contact-info"

    nuevoLi.innerHTML = `
    <input type="radio" name="contacto">
    <div class="contact-name"><span>${contact.name} ${contact.lastName}</span></div>
    <div class="contact-details">CBU: ${contact.cbu}, Alias: ${contact.alias}, Banco: ${contact.bank}</div>
  `
    lista.appendChild(nuevoLi)
  }

  //forma clasica de hacerlo:
  /*for (let i = 0; i < contactList.length; i++) {

    let contact = contactList[i];

    let nuevoLi = document.createElement("li");
    nuevoLi.className = "list-group-item contact-info"

    nuevoLi.innerHTML = `
    <input type="radio" name="contacto">
    <div class="contact-name"><span>${contact.name} ${contact.lastName}</span></div>
    <div class="contact-details">CBU: ${contact.cbu}, Alias: ${contact.alias}, Banco: ${contact.bank}</div>
  `
    lista.appendChild(nuevoLi)
  }
  */
}

function enviarDinero() {

  /*
  -verificar si hay contacto seleccionado
  -pedir al usuario cuanto dinero quiere enviar
  -verificar monto > 0 ; monto isNaN ; monto < saldo.
  -restar monto ingresado al monto total
  -guardar cambios
  -volver al menú
  */

  let contactSelected = document.querySelector(`input[name="contacto"]:checked`)
  let saldo = localStorage.getItem("saldo");

  if (saldo === null) {
    saldo = 60000; //si es primera vez se usa saldo base
  } else {
    saldo = Number(saldo); //si no, se transforma el texto entregado de localStorage a numero
  }

  if (!contactSelected) {
    alert("Debe seleccionar un contacto"); return
  }

  let monto = Number(prompt("Ingrese monto a enviar: ")); //Number para combertir texto a numero

  if (monto <= 0 || isNaN(monto)) {
    alert("Ingrese un monto valido"); return
  } else if (monto > saldo) {
    alert("Dinero insuficiente."); return
  }

  let nuevoSaldo = saldo - monto;
  console.log(nuevoSaldo);

  localStorage.setItem("saldo", nuevoSaldo)

  // guardar historial
  /*
  la linea de abajo hace lo sigiente:
  contactSelected te pone en la parte html donde se ubica el radio seleccionado
  parentElement dice "llama a mi padre" que es li, por lo que del div sube a li
  queerySelector dice "ahora busca hacia abajo donde alla una class contact-name y ubicame en un span"
  innerText dice "dame solo el texto dentro de span"
  */
  let nameSpan = contactSelected.parentElement.querySelector(".contact-name span").innerText;
  let transferHistory = JSON.parse(localStorage.getItem("transferHistory")) || [];

  let transfer = {
    concepto: "Transferencia a: " + nameSpan,
    monto: monto
  }

  transferHistory.push(transfer);

  localStorage.setItem("transferHistory", JSON.stringify(transferHistory))

  alert("Se realizo la transferencia de forma exitosa")
  window.location.href = "menu.html";

}

function latestMoves() {
  /*
  -obtener la ul de contactos
  -crear una lista por movimiento realizado (transferencia y deposito)
  -llenar la lista creada con los datos de localStorage
  -agregar lista al ul.
  */

  let movements = document.getElementById("movementsList");
  let deposits = JSON.parse(localStorage.getItem("deposits")) || [];
  let transfers = JSON.parse(localStorage.getItem("transferHistory")) || []
  let allMovements = deposits.concat(transfers); //unimos anbos arrays en uno solo con concat (concatenar / unir)
  movements.innerHTML = "";
  for (let item of allMovements) {
    let lista = document.createElement("li")
    lista.className = "list-group-item"
    lista.innerHTML = `
    ${item.concepto} $${item.monto}
  `
    movements.appendChild(lista)
  }
}

/*
datos de local estorage: 


*/