// VARIABLES
var full_name = document.getElementById("full_name");
var pre_name = document.getElementById("pre_name");
var age = document.getElementById("age");
var address = document.getElementById("address");
var pre_address = document.getElementById("pre_address");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var img = document.querySelector("img");
var navbar_brand = document.querySelector("a", "navbar-brand");
var title = document.querySelector("title");
var div_elements = document.getElementById("exp_list");
// elementos de lista
const cms = document.getElementById("cms");
const framework = document.getElementById("framework");
const dbs = document.getElementById("dbs");
const dbs_no_sql = document.getElementById("dbs-no-sql");

$(document).ready(function () {
// elementos de lista inicializan ocultos
  cms.style.display = "none";
  framework.style.display = "none";
  dbs.style.display = "none";
  dbs_no_sql.style.display = "none";

  mostrarOcultar();

  // CUANDO EL DOCUMENTO INICIA, SE CARGA CONTENIDO DE LA API
  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    success: function (data) {
      let results = data.results;

      results.forEach((result) => {
        img.src = result.picture.large;
        full_name.innerText = result.name.first + ", " + result.name.last;
        pre_name.innerText = result.name.first + " " + result.name.last;
        navbar_brand.innerText =
          "CV | " + result.name.first + " " + result.name.last;
        title.innerText = "CV | " + result.name.first + " " + result.name.last;
        email.innerText = result.email;
        address.innerText =
          result.location.street.name +
          ", " +
          result.location.street.number +
          ", " +
          result.location.state +
          ", " +
          result.location.country;
        pre_address.innerText =
          result.location.street.name +
          ", " +
          result.location.street.number +
          ", " +
          result.location.state +
          ", " +
          result.location.country;
        phone.innerText = result.phone;

        // FUNCION PARA CALCULAR EDAD
        calcularEdad(result.dob.date);
      });

      // Cuando se realiza cick encima recarga la web con un nuevo usuario
      navbar_brand.addEventListener("click", function (e) {
        e.preventDefault;
        window.location.reload();
      });
    },
  });

  // FUNCION PARA CALCULAR EDAD
  function calcularEdad(date) {
    var hoy = new Date();
    var cumpleanos = new Date(date);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return (age.innerText =
      new Date(date).toLocaleDateString("es-ES") + " | " + edad + " años");
  }

  // Boton ir al tope
  $(".go-top").hide();

  $(".go-top").click(function () {
    $("body, html").animate(
      {
        scrollTop: "0px",
      },
      300
    );
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".go-top").slideDown(300);
    } else {
      $(".go-top").slideUp(300);
    }
  });
});

function mostrarOcultar() {
  document.querySelectorAll("li.list-item").forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      let elm_list = e.target.dataset.content;

      if (elm_list == "cms") {
        cms.style.display = "block";
      } else {
        cms.style.display = "none";
      }

      if (elm_list == "framework") {
        framework.style.display = "block";
      } else {
        framework.style.display = "none";
      }

      if (elm_list == "dbs") {
        dbs.style.display = "block";
      } else {
        dbs.style.display = "none";
      }

      if (elm_list == "dbs-no-sql") {
        dbs_no_sql.style.display = "block";
      } else {
        dbs_no_sql.style.display = "none";
      }
      
    });
  });
}
