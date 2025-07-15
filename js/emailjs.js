document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = new FormData(this);

  fetch("https://script.google.com/macros/s/AKfycbzz2ID5oa8WYleEV5JHoYa2tyRqbtAwW2x8tKc2shLti_KwrRb0VAEVcsXnpoN3Rmt5/exec", {
    method: "POST",
    body: form
  })
    .then(res => res.text())
    .then(data => {
      document.getElementById("success").style.display = "block";
      document.getElementById("error").style.display = "none";
      this.reset();
    })
    .catch(err => {
      document.getElementById("success").style.display = "none";
      document.getElementById("error").style.display = "block";
    });
});

  
