document.getElementById("loadVehicles").addEventListener("click", function () {
    fetch("vehicles.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("vehicleContainer");
            container.innerHTML = "";
            data.forEach(vehicle => {
                const card = document.createElement("div");
                card.classList.add("vehicle-card");
                card.innerHTML = `
                    <h3>${vehicle.name}</h3>
                    <p>Price: $${vehicle.price}</p>
                    <a href="${vehicle.link}" target="_blank">Show Details</a>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Loading error:", error));
});