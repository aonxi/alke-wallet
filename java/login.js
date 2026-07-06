
//  js con JQuery

/*
js crea un archivo de forma automatica llamado document
que representa todo el html cargado

document.getElementById("email") = buscame en todo el html 
el id email

$(document) = quiero usr JQuery en este html

dociment solo representa TODO el html de la pagína en la 
que el usuario este actualmente, no de TODAS al mismo tiempo
*/

/*

  La funcion no tiene nombre (funcion anonima),
  no da error ya que se entrega a otra función / acción 
  en este caso document.ready
  Es exactamente igual que:

  function iniciar() {
  console.log("pagina lista");
}

$(document).ready(iniciar);

  Espera que toda la página cargue
  antes de ejecutar el código:
*/
$(document).ready(function () {

  /*
    En vez de: onclick="login()"
    usamos: $("#login").submit(...)

    $("#id") = document.getelemenbyid

  */

  /*
    cuando ocurre un evento (click, submit, etc) js 
    crea un objeto llamado Event, ese objeto 
    se almacena en una variable con un nombre definido 
    por nosotros. en este caso (e)

    si haces esto: 
    $("#login").submit(function (e) {

  console.log(e);

});

  se vera en consola un objeto enorme
  */
 
  $("#login").submit(function (e) {

    //  Evita que el formulario recargue la página.

    e.preventDefault();

    /*
      Obtener valores usando jQuery.

      $("#email").val() 
      $("#id").val() = .value
    */

    let email = $("#email").val().trim(); //trim() elimina los espacios
    let password = $("#password").val().trim();

    //  Limpiar alertas anteriores.

    $("#email").removeClass("is-invalid");
    $("#password").removeClass("is-invalid");
    $("#alert-bootstrap").html("")

    //  Validar campos.

    let valido = true;

    if (email === "") {
      $("#email").addClass("is-invalid");
      valido = false
    }

    if (password === "") {
      $("#password").addClass("is-invalid");
      valido = false
    }

    // detener funcion en caso de que falte un campo
    if (!valido){
      return;
    }

    //validar credenciales.

    if (email === "usuario@gmail.com" && password === "contraseña.1") {

      $("#alert-bootstrap").html(`
        <div class="alert alert-success">
        iniciando sesión
        </div>
        `);
      
      //esperar 2 segundos e ir a menú:

      setTimeout(() => {
        window.location.href = "menu.html"
      }, 2000);
    }else {
      $("#alert-bootstrap").html(`
        <div class="alert alert-danger">
        Email o contraseña incorrectos
        </div>
        `);
    }


  });

});