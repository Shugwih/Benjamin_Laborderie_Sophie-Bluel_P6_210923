/***************** 
* > HOME PAGE SCRIPT / API DATA EXTRACT / SCRIPT IMPORT
/////////////////////////////////
* >> PROJECT SECTION
*****************/
const GALLERY_API_URL = "http://localhost:5678/api/works";

const gallery = document.querySelector(".gallery");
const portFolio = document.getElementById("portfolio");
console.log(portFolio)
let data = null;

const allFilters = [
    {
        filterName : "Tous"
    },
    {
        filterName : "Objets"
    },
    {
        filterName : "Appartements"
    },
    {
        filterName : "Hôtels & restaurants"
    }
];

async function fetchProjectData() { //Async function for call dynamic project from API
    try {
        const callProject = await fetch(GALLERY_API_URL);
        console.log(callProject);

        data = await callProject.json(); // wait promise to analysis json response
        console.log(data)
    } catch (error) { //Append error text if fetch does not work
        console.log({error})
        //Create error on screen >
        const errorProject = document.createElement("p");
        errorProject.classList.add("error");
        errorProject.innerText = "Something went wrong :( Tentative de reconnexion..."; //TODO : Créer une tentative de reconnexion******************************************************
        //Prevents error stacking >
        const existingError = document.querySelector(".error");
        if (existingError) {
            existingError.remove();
        }
        //Add error to DOM >
        gallery.appendChild(errorProject);
    }
}

await fetchProjectData() //await for no error on the function projectGeneration > data load
projectGeneration()

function projectGeneration() { //Function for generate dynamic gallery elements
    console.log({data})
    for (let i = 0; i < data.length; i++) {
        const figureProject = document.createElement("figure");
        const galleryImg = document.createElement("img");
        const galleryTxt = document.createElement("figcaption")
        galleryImg.src = data[i].imageUrl;
        galleryTxt.innerText = data[i].title;
        gallery.appendChild(figureProject)
        figureProject.appendChild(galleryImg)
        figureProject.appendChild(galleryTxt)
        gallery.appendChild(figureProject);
    }
}

function generateFilters() { //function for generate dynamic filters menu
    const filterContainer = document.createElement("div")

    for (let i = 0; i < allFilters.length; i++) {
        const filters = document.createElement("button")
        filterContainer.appendChild(filters)
    }
}

generateFilters()