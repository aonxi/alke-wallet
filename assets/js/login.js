// ===========================
// INICIAR SESIÓN
// ===========================

$(document).ready(function () {

  $("#login").submit(function (e) {

    e.preventDefault();

    //obetener email y password de usuario

    let email = $("#email").val().trim();
    let password = $("#password").val().trim();

    // validar campos

    if (!validarCampos(email, password, "#email", "#password")) {
      return;
    };

    // obtener cuentas

    let userAccounts = JSON.parse(localStorage.getItem("userAccounts")) || [];

    const user = userAccounts.find(cuenta =>
      cuenta.email === email &&
      cuenta.password === password
    );

    if (user) {

      $("#alert-bootstrap").html(`
                <div class="alert alert-success">
                    Iniciando sesión...
                </div>
            `);



      setTimeout(() => {
        window.location.href = "menu.html"
      }, 2000);

      $("#email").val("");

    } else {
      $("#alert-bootstrap").html(`
        <div class="alert alert-danger">
        Email o contraseña incorrectos
        </div>
        `);
      $("#password").val("")
    }


  });


  // ===========================
  // ABRIR MODAL
  // ===========================

  $("#open-modal").click(function () {
    $("#email-modal").val("");
    $("#password-modal").val("");
    $(".form-control").removeClass("is-invalid");
    $(".modal-body").show();
    $(".modal-footer").show();
    $(".mensaje-exito").remove();
    $("#feedback-email-modal").text("Debe ingresar un email.");
  });

  // ===========================
  // REGISTRAR USUARIO
  // ===========================

  $("#create-account").click(function userRegistration() {

    let emailModal = $("#email-modal").val().trim();
    let passwordModal = $("#password-modal").val().trim();

    if (!validarCampos(emailModal, passwordModal, "#email-modal", "#password-modal")) {
      return;
    };

    // obtener usuarios

    let userAccounts = JSON.parse(localStorage.getItem("userAccounts")) || [];

    // verificar que no exista

    const existe = userAccounts.find(cuenta => cuenta.email === emailModal);

    if (existe) {

      $("#feedback-email-modal").text("Este correo ya está registrado.");
      $("#email-modal").addClass("is-invalid");

      return;
    }

    // creamos credenciales

    const userAccount = {
      email: emailModal,
      password: passwordModal
    };

    // guardamos credenciales

    userAccounts.push(userAccount);

    localStorage.setItem("userAccounts", JSON.stringify(userAccounts));

    //Mensaje de exito

    $(".modal-body").hide();
    $(".modal-footer").hide();

    $(".modal-content").append(`
    <div class="mensaje-exito p-4 text-center">
      <h4 class="text-success">
      Cuenta creada correctamente
      </h4>
      </div>
    `);

    setTimeout(() => {
      $("#close-modal").click();
    }, 2000)

  });

});

function validarCampos(email, password, idEmail, idPassword) {

  //limpiar errores

  $(".form-control").removeClass("is-invalid");
  $("#alert-bootstrap").html("");

  //validar campos

  let valido = true;

  if (email === "") {
    $(idEmail).addClass("is-invalid");
    valido = false
  }

  if (password === "") {
    $(idPassword).addClass("is-invalid");
    valido = false
  }

  return valido;

}