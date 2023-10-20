let index = 0;

function afficherImage() {
    const images = document.querySelectorAll("#diaporama img");
    if (images.length === 0) return;

    images[index].style.display = "none";
    index = (index + 1) % images.length;
    images[index].style.display = "block";
}

// Charger les images depuis le stockage local
const imagesStockees = JSON.parse(localStorage.getItem("images") || "[]");
const diaporamaDiv = document.getElementById("diaporama");
imagesStockees.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    diaporamaDiv.appendChild(img);
});

setInterval(afficherImage, 3000); // Change l'image toutes les 3 secondes
