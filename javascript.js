const btns = document.querySelectorAll(".accordion-btn");

btns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const panel = this.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
});