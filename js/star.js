document.getElementById("product1").addEventListener("load", creatStars(5, "product1"));
document.getElementById("product2").addEventListener("load", creatStars(4, "product2"));
document.getElementById("product3").addEventListener("load", creatStars(4.5, "product3"));
document.getElementById("product4").addEventListener("load", creatStars(3.5, "product4"));

function creatStars(rating, id) {

    var rating = parseFloat(rating);
    var floorRating = Math.floor(rating);
    if (rating - floorRating == 0) {
        var spanElement = document.getElementById(id);
        for (var i = 0; i < rating; i++) {
            var star = document.createElement("i");
            star.classList.add("fas", "fa-star");
            spanElement.appendChild(star);
        }
    } else {
        var spanElement = document.getElementById(id);
        for (var i = 0; i < rating - 1; i++) {
            var star = document.createElement("i");
            star.classList.add("fas", "fa-star");
            spanElement.appendChild(star);
        }
        var star = document.createElement("i");
        star.classList.add("fas", "fa-star-half");
        spanElement.appendChild(star);
    }
}