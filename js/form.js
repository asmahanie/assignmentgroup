document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = new FormData(this);

    document.getElementById("success").style.display = "none";
    document.getElementById("error").style.display = "none";

    fetch("https://script.google.com/macros/s/PASTE_YOUR_URL_HERE/exec", {
        method: "POST",
        body: form,
    })
        .then((res) => res.text())
        .then((data) => {
            if (data.includes("Success")) {
                document.getElementById("success").style.display = "block";
                this.reset();
            } else {
                document.getElementById("error").style.display = "block";
            }
        })
        .catch((err) => {
            document.getElementById("error").style.display = "block";
        });
});

