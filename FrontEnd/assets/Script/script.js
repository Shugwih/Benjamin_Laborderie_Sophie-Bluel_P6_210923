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

const adminProject = document.querySelector("js-admin-modal-project");

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

function isAlreadyConnect() {
    // recover token from localstorage
    const authToken = localStorage.getItem("authToken");
    const signInActionBtn = document.getElementById("navActionBtn2")

    const adminBtn = document.getElementById("js-admin-modifier")
    if (authToken) {
        // User connected
        console.log("L'utilisateur est connecté.");
        // avaible to use authToken
        adminBtn.style.display = "block";
        signInActionBtn.textContent = "Logout";
        signInActionBtn.addEventListener("click", function () {
            localStorage.removeItem("authToken")
            location.href = "";
        })
    } else {
        // User disconnected
        adminBtn.style.display = "none"
        console.log("L'utilisateur n'est pas connecté.");
    }
}

isAlreadyConnect();

//MODAL
const modalAdmin = document.getElementById('modal-admin'),
modalP1 = document.getElementById('modal-admin-p1'),
modalP2 = document.getElementById('modal-admin-p2'),
adminBtn = document.getElementById('js-admin-modifier'),
closeModalButtons = document.querySelectorAll('.js-admin-modal-close'),
modalStop = document.querySelector('.js-modal-stop');

// Open modal-p1 when clicked on modifier
adminBtn.addEventListener('click', () => {
    modalAdmin.style.display = null;
});

// close the modal on outbox click
modalAdmin.addEventListener('click', (event) => {
    if (event.target === modalAdmin) {
        modalAdmin.style.display = 'none';
    }
});

// close modal on close button
closeModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
        modalAdmin.style.display = 'none';
    });
});

// Part 1 to part 2 on add picture btn
const modalP2OpenButton = document.getElementById('js-modal-p2-open');
modalP2OpenButton.addEventListener('click', () => {
    modalP1.style.display = 'none';
    modalP2.style.display = null;
});

// Part 2 to part 1 on previous btn click
const modalP2PreviousButton = document.querySelector('.js-admin-modal-previous');
modalP2PreviousButton.addEventListener('click', () => {
    modalP2.style.display = 'none';
    modalP1.style.display = null;
});

//MODAL Gallery Generation
async function displayPhotosInModal() {
    const modalContent = document.querySelector(".js-admin-modal-project");

    // Clear previous content of the modal
    modalContent.innerHTML = "";

    // Create HTML Photo Element and add to modal
    mainDataJSON.forEach(photo => {
        const imageDiv = document.createElement("div"); // Create a new div for the image
        imageDiv.className = "admin-modal-img-container";
        imageDiv.setAttribute("data-id", photo.id);
        const image = document.createElement("img");
        image.src = photo.imageUrl; 
        image.alt = photo.description;
        modalContent.appendChild(image);
        image.className = "admin-modal-img";

        // Create a div for the SVG
        const svgDiv = document.createElement("div");
        svgDiv.className = "admin-modal-svg-container js-delete-image"; 
        svgDiv.setAttribute("data-id", photo.id);

        // Add the SVG code to the SVG div
        svgDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
                <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
            </svg>
        `;

        imageDiv.appendChild(image); // Add the image to the div
        imageDiv.appendChild(svgDiv); // Add the SVG div to the div
        modalContent.appendChild(imageDiv); // Add the div to the modalContent
    });
}

displayPhotosInModal();

//MODAL Add new photo
const formModalAddProject = document.querySelector('.form-modal-add-project');
formModalAddProject.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Retrieve form data
    const title = document.getElementById('js-picture-title').value;
    const category = document.getElementById('categorie').value;

    // Retrieve the image file to upload
    const imageFile = document.getElementById('photo').files[0];
    console.log(document.getElementById('photo').files)
    const imageTest = document.getElementById("photo")
    console.log(imageTest)
    imageTest.addEventListener("change", function () {
        console.log("test")
    })

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', imageFile);
    console.log({title, category, imageFile})
    console.log(formData)
    // Post data to API
    const authToken = localStorage.getItem("authToken");
    const response = await fetch(GALLERY_API_URL, {
        method: 'POST',
        body: formData,
        headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
    });

    if (response.ok) {
        alert('Photo ajoutée avec succès !');
        modalP2.style.display = 'none'; // close the modalP2
        modalP1.style.display = 'block'; // back to modalP1
        // refresh the photo gallery
        displayPhotosInModal();
    } else {
        //alert("Une erreur s'est produite lors de l'ajout de la photo.");
    }
});

//MODAL Delete photo
// Ajoutez un gestionnaire d'événements pour les éléments avec la classe "js-delete-image"
modalAdmin.addEventListener('click', async (event) => {
    if (event.target.classList.contains('js-delete-image')) {
        const imageId = event.target.getAttribute('data-id'); // Récupérez l'ID de l'image

        // Vérifiez si l'ID de l'image existe
        if (imageId) {
            const authToken = localStorage.getItem('authToken');
            const response = await fetch(`${GALLERY_API_URL}/${imageId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                // Suppression réussie
                alert('L\'image a été supprimée avec succès.');
                // Mettez à jour la galerie des photos
                displayPhotosInModal();
            } else {
                // Erreur lors de la suppression de l'image
                alert('Une erreur s\'est produite lors de la suppression de l\'image.');
            }
        }
    }
});

//MODAL Add preview to upload photo
//TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

//MODAL Select category

const selectElement = document.querySelector('#categorie');

const emptyOption = document.createElement('option');

// Add empty option in first place
selectElement.appendChild(emptyOption);

// Create category option for select
categoryDataJSON.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id; 
    option.textContent = category.name; 
    selectElement.appendChild(option); 
});

/*<div>
<div data-id="1" class="deelete">
<svg>
</div>
<image/>
</div>*/

/*
//MODAL TEST 2
let modal = null;
let secondModal = null;
//open the modal
const openmodal = function(e) {
    e.preventDefault();
    const target = document.querySelector("#modal-admin");
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", true);
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-admin-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    console.log("2");

    const firstmodal = document.getElementById("modal-admin-p1")
    const secondModal = document.getElementById("modal-admin-p2");
    const addPhotoLink = document.getElementById("js-modal-p2-open");
    addPhotoLink.addEventListener("click", function (e) {
        e.preventDefault();
        // Hide first modal
        firstmodal.style.display = "none";
        firstmodal.setAttribute("aria-hidden", true);
        firstmodal.removeAttribute("aria-modal");
        console.log(firstmodal)
        // show second modal
        secondModal.style.display = null;
        secondModal.removeAttribute("aria-hidden");
        secondModal.setAttribute("aria-modal", true);
        modal = secondModal;
        console.log(secondModal)
    });
}; 

//close the modal
const closeModal = function(e) {
    console.log("3")
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true);
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-admin-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    console.log("4")
}
//defines the clickable area to close the modal
const stopPropagation = function(e) {
    e.stopPropagation()
}
//Open modal el
document.querySelectorAll(".js-modal-admin").forEach(a => {
    a.addEventListener("click", openmodal)
})
//Only keyboard close the modal
window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

//MODAL Gallery Generation
async function displayPhotosInModal() {
    const modalContent = document.querySelector(".js-admin-modal-project");

    // Clear previous content of the modal
    modalContent.innerHTML = "";

    // Create HTML Photo Element and add to modal
    mainDataJSON.forEach(photo => {
        const image = document.createElement("img");
        image.src = photo.imageUrl; 
        image.alt = photo.description;
        modalContent.appendChild(image);
        image.className = "admin-modal-img"
    });
}

displayPhotosInModal();
*/

//MODAL
/**TODOOOOOOO
let modal = null
//open the modal
const openmodal = function(e) {
    console.log(e)
    e.preventDefault()
    //const target = document.querySelector(e.target.getAttribute("href"));
    const target = document.querySelector("#modal-admin")
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", true);
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-admin-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    console.log("2")
}
//close the modal
const closeModal = function(e) {
    console.log("3")
    if (modal === null) return;
    e.preventDefault();
    /**window.setTimeout(function() {
        modal.style.display = "none";
        modal = null;
    }, 300);**/
    /**TODOOOOOOmodal.style.display = "none";
    //modal = null;
    modal.setAttribute("aria-hidden", true);
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-admin-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    console.log("4")
}
//defines the clickable area to close the modal
const stopPropagation = function(e) {
    e.stopPropagation()
}
//Open modal el
document.querySelectorAll(".js-modal-admin").forEach(a => {
    a.addEventListener("click", openmodal)
})
//Only keyboard close the modal
window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

//Project generation for admin modal

async function displayPhotosInModal() {
    const modalContent = document.querySelector(".js-admin-modal-project");

    // Clear previous content of the modal
    modalContent.innerHTML = "";

    // Create HTML Photo Element and add to modal
    mainDataJSON.forEach(photo => {
        const image = document.createElement("img");
        image.src = photo.imageUrl; 
        image.alt = photo.description;
        modalContent.appendChild(image);
        image.className = "admin-modal-img"
    });
}

displayPhotosInModal();

//SECOND MODAL

const openSecondModal = function(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", true);
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-admin-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};

// Open the second modal
const openSecondModalBtn = document.querySelector(".add-picture");
openSecondModalBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeFirstModal(); // Close first admin modal
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", true);
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-admin-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
});

const closeFirstModal = function() {
    if (modal === null) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true);
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-admin-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
}

const backToFirstModalBtn = document.querySelector(".js-admin-modal-previous");
backToFirstModalBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeModal(e); // Close actual modal
    openmodal(e); // Open First modal
});

//SELECT

const selectElement = document.querySelector('#categorie');

const emptyOption = document.createElement('option');

// Add empty option in first place
selectElement.appendChild(emptyOption);

// Create category option for select
categoryDataJSON.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id; 
    option.textContent = category.name; 
    selectElement.appendChild(option); 
});

function isAlreadyConnect() {
    // recover token from localstorage
    const authToken = localStorage.getItem("authToken");

    const adminBtn = document.getElementById("js-admin-modifier")
    if (authToken) {
        // User connected
        console.log("L'utilisateur est connecté.");
        // avaible to use authToken
        adminBtn.style.display = "block";
    } else {
        // User disconnected
        console.log("L'utilisateur n'est pas connecté.");
    }
}

isAlreadyConnect();

/* si user co (avec token)
isUserLogged
tu récupérer le token
si token = > connecté
afficher le bouton modifier
afficher le bouton logout
masquer le bouton login */