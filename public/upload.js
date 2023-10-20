document.getElementById("uploadForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;
    const imagesStockees = JSON.parse(localStorage.getItem("images") || "[]");

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagesStockees.push(e.target.result);
            localStorage.setItem("images", JSON.stringify(imagesStockees));
        }
        reader.readAsDataURL(file);
    });
});
