const Inputemail = document.getElementById("login-email"),
    Inputpassword = document.getElementById("login-pass");

const submit = document.getElementById("connexion");

const errorContainer = document.getElementById("error-container")

const TOKEN_API_URL = "http://localhost:5678/api/users/login";
console.log(TOKEN_API_URL)
//Submit listener
submit.addEventListener("click", (event) => {
    event.preventDefault();
    login();
})

async function login() {
    const email = Inputemail.value,
        password = Inputpassword.value;

    const data = {email : email, password: password};
    console.log(data);
    const config = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(TOKEN_API_URL, config);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const result = await response.json(); // Récupérer les données de réponse
        if (result.token) {
            // stock token in localStorage
            localStorage.setItem("authToken", result.token);
            console.log("Token stored.");
    
            // user redirection to home
            window.location.href = "./index.html";
        }
    } catch (error) {
        errorContainer.innerHTML = ""
        const Usererror = document.createElement('p');
            Usererror.innerText = 'Email ou mot de passe incorrect';
            Usererror.style.textAlign = 'center';
            Usererror.style.color = 'red';
            console.log(Usererror)
            console.log(errorContainer)
            errorContainer.appendChild(Usererror);
            console.log(errorContainer)
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

//Connexion function
/*
async function logIn() {

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
        console.log("Token stored.");

        // user redirection to home
        window.location.href = "./index.html"; //
    } else {
        console.error("Erreur lors de la connexion.");
    } 
    //Verify Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (Inputemail.value.match(emailRegex)) {
        console.log("Correct Email")
        Inputemail.classList.remove("input-error")
    } else {
        console.log("Incorrect Email");
        Inputemail.className = "input-error";

        Inputemail.addEventListener("keypress", () => {
            Inputemail.classList.remove("input-error");
        });
    }
    //Verify Password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*()_+|~-]{5,}$/;
    if (Inputpassword.value.match(passwordRegex)) {
        console.log("Correct Password")
        Inputpassword.classList.remove("input-error")
        
    } else {
        console.log("Incorrect Password")
        Inputpassword.className = "input-error";
        

        Inputpassword.addEventListener("keypress", () => {
            Inputpassword.classList.remove("input-error");
        });
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

isAlreadyConnect();*/

