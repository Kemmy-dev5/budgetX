 function showAlert(message){
  let alertMot = document.getElementById('alerteMot');
  let alert = document.getElementById("alert");
  alert.classList.remove("show");
  void alert.offsetWidth;
  alertMot.textContent = message;
  alert.style.display = "flex";
  alert.classList.add("show");

  setTimeout(()=>{
    alert.classList.remove("show");}, 4000);
 }
 
 
 
 function validation() {
    let nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();  

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValide = regexEmail.test(email);

    if (nom.length < 5){
        showAlert("Le nom d'utilisateur est vide ou inférieure à 5 caractères");
        return false;
    }

    if(!emailValide || email.value < 8){
        showAlert("L'email est invalide ou non spécifier");
        return false;
    }
    sessionStorage.setItem("nomUser", nom);
    window.location.href = "Menu.html"
    return false;
    }
