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
        const result = await response.json(); 
        if (result.token) {
            // stock token in localStorage
            localStorage.setItem("authToken", result.token);
            console.log("Token stored.");
    
            // user redirection to home
            window.location.href = "./index.html";
        }
    } catch (error) {
        alert("Email ou mot de passe incorrect.");
    }
}
