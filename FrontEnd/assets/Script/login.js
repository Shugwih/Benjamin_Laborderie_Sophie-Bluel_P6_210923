const Inputemail = document.getElementById("login-email"),
    Inputpassword = document.getElementById("login-pass");

const submit = document.getElementById("connexion");

const TOKEN_API_URL = "http://localhost:5678/api/users/login";
console.log(TOKEN_API_URL)

//Submit listener
submit.addEventListener("click", (event) => {
    event.preventDefault();
    logIn();
})

//Connexion function
async function logIn() {

    //Verify Email
    /*  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.match(emailRegex)) {
        console.log("Correct Email")
        email.classList.remove("input-error")
    } else {
        console.log("Incorrect Email");
        email.className = "input-error";
    }
    //Verify Password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*()_+|~-]{5,}$/;
    if (password.value.match(passwordRegex)) {
        console.log("Correct Password")
        password.classList.remove("input-error")
    } else {
        console.log("Incorrect Password")
        password.className = "input-error";
    }*/
    const email = Inputemail.value;
    const password = Inputpassword.value
    const data = {email : email, password: password}
    console.log(data)

    const config = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(TOKEN_API_URL, config);
    const result = await response.json();

    if (result.token) {
        // stock token in localStorage
        localStorage.setItem("authToken", result.token);
        console.log("Token stocké.");

        // user redirection to home
        window.location.href = "./index.html"; // Remplacez 'page-d-accueil.html' par l'URL de votre page d'accueil
    } else {
        console.error("Erreur lors de la connexion.");
    }
}

//Client already logged function
function isAlreadyConnect() {
    // recover token from localstorage
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
        // User connected
        console.log("L'utilisateur est connecté.");
        // avaible to use authToken
    } else {
        // User disconnected
        console.log("L'utilisateur n'est pas connecté.");
    }
}

isAlreadyConnect();
