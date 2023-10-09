/***************** 
* > HOME PAGE SCRIPT / API DATA EXTRACT / SCRIPT IMPORT
/////////////////////////////////
* >> PROJECT SECTION
*****************/

////////////////////////////////////////////////////////////////////////////////////////////
// General

const GALLERY_API_URL = "http://localhost:5678/api/works",
    CATEGORY_API_URL = "http://localhost:5678/api/categories";

const portFolio = document.getElementById("portfolio"),
     gallery = document.querySelector(".gallery");

const mainDataAPI = await fetch (GALLERY_API_URL); //Call all works from API

let mainDataJSON = await mainDataAPI.json(); //waiting promise from GALLERY_API_URL
console.log(mainDataJSON);

const categoryDataAPI = await fetch (CATEGORY_API_URL); // Call only category from API

let categoryDataJSON = await categoryDataAPI.json(); //waiting promise from CATEGORY_API_URL
console.log(categoryDataJSON);

// Initial Image Gallery function generation
function galleryCreation() {
    for (let i = 0; i < mainDataJSON.length; i++) {
        const figureProject = document.createElement("figure");
        const galleryImg = document.createElement("img");
        const galleryTxt = document.createElement("figcaption");
        galleryImg.src = mainDataJSON[i].imageUrl;
        galleryTxt.innerText = mainDataJSON[i].title;
        figureProject.appendChild(galleryImg);
        figureProject.appendChild(galleryTxt);
        gallery.appendChild(figureProject);
    }
}

galleryCreation()

//Category filters function generation
function filtersCreation() {
    //Creation of filter container
    const filterContainer = document.createElement("div");
    portFolio.insertBefore(filterContainer, gallery);
    filterContainer.setAttribute("id", "filter-btn-container");
    filterContainer.className = "filter-container";

    //Creation of button "all"
    const btnAll = document.createElement("button");
    filterContainer.appendChild(btnAll);
    btnAll.innerText = "Tous";
    btnAll.setAttribute("id", "filter-btn0");
    btnAll.className = "filter-btn active-btn";

    //Creation of category filters
    for (let i = 0; i < categoryDataJSON.length; i++) {
        const filters = document.createElement("button");
        filterContainer.appendChild(filters);
        filters.innerText = categoryDataJSON[i]["name"];
        filters.setAttribute("id", "filter-btn"+categoryDataJSON[i]["id"]);
        filters.className = "filter-btn";
        filters.setAttribute("data-category", categoryDataJSON[i]["id"]);
    }
}

filtersCreation()

//Btn clicked and update Gallery

const btnClicked = document.querySelectorAll(".filter-btn");

btnClicked.forEach(el => el.addEventListener("click", event => {
    const categoryId = event.target.getAttribute("data-category");
    const works = mainDataJSON.filter(work => categoryId == work.categoryId );

    btnClicked.forEach(btn => btn.classList.remove("active-btn"));

    // Ajoute la classe active-btn uniquement au bouton actuellement cliqué
    event.target.classList.add("active-btn");

    console.log(works);
    if (works.length > 0) {
        console.log(works);
        galleryUpdate(works);
    } else {
        gallery.innerHTML = "";
        galleryCreation();
}}))

function galleryUpdate(works) {
    gallery.innerHTML = ""
    for (let i = 0; i < works.length; i++) {
        const figureProject = document.createElement("figure");
        const galleryImg = document.createElement("img");
        const galleryTxt = document.createElement("figcaption");
        galleryImg.src = works[i].imageUrl;
        galleryTxt.innerText = works[i].title;
        figureProject.appendChild(galleryImg);
        figureProject.appendChild(galleryTxt);
        gallery.appendChild(figureProject);
    }
}