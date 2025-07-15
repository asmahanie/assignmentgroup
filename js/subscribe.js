document.getElementById("subscribeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch("https://script.google.com/macros/s/AKfycbzatUydTyC0UjiIgaV5TFDVzhHiqxZ5Vdx_h8rlp4jwmWHW99U688r3gokqdDQlFuX96g/exec", {
        method: "POST",
        body: formData
    })
        .then(res => res.text())
        .then(data => {
            alert("✅ You have been subscribed to Visit Perlis website!");
            document.getElementById("responseMsg").textContent = data;
            this.reset();
        })
        .catch(err => {
            alert("❌ Something went wrong. Please try again.");
            document.getElementById("responseMsg").textContent = "Error, please try again.";
        });
});