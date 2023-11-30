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

    const filterBar = document.getElementById("filter-btn-container")
    if (authToken) {
        // User connected
        console.log("L'utilisateur est connecté.");
        // avaible to use authToken
        adminBtn.style.display = "flex";
        signInActionBtn.textContent = "Logout";
        signInActionBtn.addEventListener("click", function () {
            localStorage.removeItem("authToken")
            location.href = "";
        })
        filterBar.style.display = "none"
    } else {
        // User disconnected
        adminBtn.style.display = "none"
        console.log("L'utilisateur n'est pas connecté.");
    }
}

isAlreadyConnect();

//Update gallery for add or remove from modal
function updateGallery() {
    const galleryContainer = document.querySelector(".gallery");
    galleryContainer.innerHTML = "";

    works.forEach(work => {
        const figureProject = createGalleryItem(work);
        galleryContainer.appendChild(figureProject);
    });
}

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
const formModalAddProject = document.querySelector(".form-modal-add-project");
formModalAddProject.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Retrieve form data
    const title = document.getElementById("js-picture-title").value;
    const category = document.getElementById("categorie").value;

    // Retrieve the image file to upload
    const imageFile = document.getElementById("photo").files[0];
    console.log(document.getElementById("photo").files)
    const imageTest = document.getElementById("photo")
    console.log(imageTest)
    imageTest.addEventListener("change", function () {
        console.log("test")
    })

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", imageFile);
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
    const img = await response.json();
    console.log(img.id);
    alert("Photo ajoutée avec succès !");
    modalP2.style.display = "none"; // close the modalP2
    modalP1.style.display = "block"; // back to modalP1

    // Add new image to existing gallery
    const modalContent = document.querySelector(".js-admin-modal-project");
    const newImageDiv = document.createElement("div");
    newImageDiv.className = "admin-modal-img-container";
    newImageDiv.setAttribute("data-id", img.id);
    const newImage = document.createElement("img");
    newImage.src = img.imageUrl;
    newImage.alt = img.description;
    newImage.className = "admin-modal-img";
    newImageDiv.appendChild(newImage);

    // suppression SVG div
    const newSvgDiv = document.createElement("div");
    newSvgDiv.className = "admin-modal-svg-container js-delete-image";
    newSvgDiv.setAttribute("data-id", img.id);
    newSvgDiv.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
        <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
    </svg>
`;

    works.push(img);

    // New suppression div for new image
    newImageDiv.appendChild(newSvgDiv);

    // add to existing gallery
    modalContent.appendChild(newImageDiv);

    updateGallery();
} else {
        alert("Une erreur s'est produite lors de l'ajout de la photo.");
    }
});

//MODAL Delete photo
// add event listener for suppression
console.log("Test")

modalAdmin.addEventListener("click", async (event) => {
    if (event.target.classList.contains("js-delete-image")) {
        const imageId = event.target.getAttribute("data-id");
        console.log(imageId);

        // Verify ID
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
                alert("L'image a été supprimée avec succès.");

                // Remove from existing gallery
                document.querySelector(`[data-id="${imageId}"]`).remove();

                works = works.filter(work => work.id !== parseInt(imageId));

                updateGallery();
            } else {
                alert("Une erreur s'est produite lors de la suppression de l'image.");
            }
        }
    }
});

//MODAL Add preview to upload photo

function showPreview(event) {
    if (event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0]);
      const preview = document.getElementById("preview-selected-image");
      preview.src = src;
      const imagePreviewElement = document.getElementById("image-preview-container");
      imagePreviewElement.style.display = "block"
        
      //Hide img input
        const formAreaPictureDiv = document.querySelector(".form-area-picture");
        const childFormElement = formAreaPictureDiv.querySelectorAll(".form-area-picture > *:not(#image-preview-container)");
        childFormElement.forEach(function(el) {
            el.style.display = "none";
        })
    }
}

const inputChange = document.getElementById("photo").addEventListener("change", event => {
    showPreview(event);
})


//MODAL Select category

const selectElement = document.querySelector("#categorie");

const emptyOption = document.createElement("option");

// Add empty option in first place
selectElement.appendChild(emptyOption);

// Create category option for select
categoryDataJSON.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id; 
    option.textContent = category.name; 
    selectElement.appendChild(option); 
});