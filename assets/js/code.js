// VARIABLES GLOBALES
var full_name = document.getElementById("full_name");
var pre_name = document.getElementById("pre_name");
var age = document.getElementById("age");
var address = document.getElementById("address");
var pre_address = document.getElementById("pre_address");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var img = document.querySelector("img");
var navbar_brand = document.querySelector('a','navbar-brand');
var title = document.querySelector('title');

// CUANDO EL DOCUMENTO INICIA, SE CARGA CONTENIDO DE API
$(document).ready(function () {

  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    success: function (data) {
      let results = data.results;

      results.forEach((result) => {
        img.src = result.picture.large;
        full_name.innerText = result.name.first + ", " + result.name.last;
        pre_name.innerText =  result.name.first + " " + result.name.last;
        navbar_brand.innerText =  'CV | '+result.name.first + " " + result.name.last;
        title.innerText =  'CV | '+result.name.first + " " + result.name.last;
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
      navbar_brand.addEventListener('click', function(e){
        e.preventDefault;
        window.location.reload();
      })
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
});