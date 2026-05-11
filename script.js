// Initialize the map (Centered on India coordinates)
const map = L.map('map').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let rainfallData = [];

// Load your data from a JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        rainfallData = data;
        displayResults(rainfallData);
    });

function displayResults(data) {
    const listDiv = document.getElementById('list');
    listDiv.innerHTML = '';
    
    // Clear existing markers
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    data.forEach(item => {
        // Add to List
        const div = document.createElement('div');
        div.className = 'data-item';
        div.innerHTML = `<strong>${item.station}</strong><br>Rainfall: ${item.value}mm <br> <a href="${item.report_link}" target="_blank">View PDF</a>`;
        div.onclick = () => map.setView([item.lat, item.lon], 10);
        listDiv.appendChild(div);

        // Add Marker to Map
        L.marker([item.lat, item.lon])
            .addTo(map)
            .bindPopup(`<b>${item.station}</b><br>Rainfall: ${item.value}mm`);
    });
}

function filterData() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = rainfallData.filter(item => 
        item.station.toLowerCase().includes(query)
    );
    displayResults(filtered);
}