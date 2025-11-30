  function validation() {
    let nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValide = regexEmail.test(email);

    if (nom.length < 5){
        alert("Le champ nom est vide ou contient moins de 5 caractère");
        return false;
    }

    if(!emailValide){
        alert("le champ email n'est pas respecter");
        return false;
    }
    sessionStorage.setItem("nomUser", nom);
    window.location.href = "Menu.html"
    return false;
    }
