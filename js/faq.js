const accordions = document.querySelectorAll(".accordion");

accordions.forEach(btn => {
  btn.addEventListener("click", function () {
    const panel = this.nextElementSibling;
    const icon = this.querySelector(".icon");

    // Toggle this panel
    panel.style.display = panel.style.display === "block" ? "none" : "block";

    // Toggle icon
    icon.textContent = panel.style.display === "block" ? "−" : "+";

    // Close others
    accordions.forEach(otherBtn => {
      if (otherBtn !== this) {
        const otherPanel = otherBtn.nextElementSibling;
        const otherIcon = otherBtn.querySelector(".icon");
        otherPanel.style.display = "none";
        otherIcon.textContent = "+";
      }
    });
  });
});
