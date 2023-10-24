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

let works = mainDataJSON;

const categoryDataAPI = await fetch (CATEGORY_API_URL); // Call only category from API

let categoryDataJSON = await categoryDataAPI.json(); //waiting promise from CATEGORY_API_URL
console.log(categoryDataJSON);

// generic function for figure element creation
function createGalleryItem(work) {
    const figureProject = document.createElement("figure");
    const galleryImg = document.createElement("img");
    const galleryTxt = document.createElement("figcaption");
    galleryImg.src = work.imageUrl;
    galleryTxt.innerText = work.title;
    figureProject.appendChild(galleryImg);
    figureProject.appendChild(galleryTxt);
    return figureProject; ///////////////////////////////////
}

function galleryCreation() {
    gallery.innerHTML = "";
    works.forEach(work => {
        const figureProject = createGalleryItem(work);
        gallery.appendChild(figureProject);
    });
}

//Category filters function generation
function filtersCreation() {
    // Creation of filter container
    const filterContainer = document.createElement("div");
    portFolio.insertBefore(filterContainer, gallery);
    filterContainer.setAttribute("id", "filter-btn-container");
    filterContainer.className = "filter-container";

    // Creation of button "all"
    const btnAll = document.createElement("button");
    filterContainer.appendChild(btnAll);
    btnAll.innerText = "Tous";
    btnAll.setAttribute("id", "filter-btn0");
    btnAll.className = "filter-btn active-btn";

    // Creation of category filters
    for (let i = 0; i < categoryDataJSON.length; i++) {
        const filters = document.createElement("button");
        filterContainer.appendChild(filters);
        filters.innerText = categoryDataJSON[i]["name"];
        filters.setAttribute("id", "filter-btn" + categoryDataJSON[i]["id"]);
        filters.className = "filter-btn";
        filters.setAttribute("data-category", categoryDataJSON[i]["id"]);
    }
}

filtersCreation()

// Btn clicked and update Gallery
const btnClicked = document.querySelectorAll(".filter-btn");

btnClicked.forEach(el => el.addEventListener("click", event => {
    const categoryId = event.target.getAttribute("data-category");
    works = mainDataJSON.filter(work => categoryId == work.categoryId);

    btnClicked.forEach(btn => btn.classList.remove("active-btn"));

    event.target.classList.add("active-btn");

    console.log(works);
    if (works.length <= 0) {
        console.log(works);
        works = mainDataJSON
    }
    galleryCreation()
}))

// Gallery init
galleryCreation();

function headerNavAction() {
    const userToken = localStorage.getItem("")
    const headerNav = document.querySelector("header"),
        headerLink = headerNav.querySelectorAll("li");
    for (let i=0; i < headerLink.length; i++) {
        const headerLinkId = "navActionBtn" + [i];

        headerLink[i].setAttribute("id", headerLinkId)
    }
    const projectActionBtn = document.getElementById("navActionBtn0").onclick = () => {
        location.href ="#portfolio"
    }
    const contactActionBtn = document.getElementById("navActionBtn1").onclick = () => {
        location.href ="#contact"
    }
    const signInActionBtn = document.getElementById("navActionBtn2").onclick = () => {
        location.href = "./login.html"
    }
    const instagramActionBtn = document.getElementById("navActionBtn3").onclick = () => {
        location.href = ("https://www.instagram.com/")
    }
}
headerNavAction()

//MODAL

let modal = null

const openmodal = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", true);
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-admin-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

const closeModal = function(e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true);
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-admin-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null;
}

const stopPropagation = function(e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal-admin").forEach(a => {
    a.addEventListener("click", openmodal)
})

window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})