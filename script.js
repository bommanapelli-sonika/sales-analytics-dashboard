let labels = [];
let values = [];

let barChart, pieChart;

// INIT CHARTS
function createCharts() {

    const ctx1 = document.getElementById("barChart");
    const ctx2 = document.getElementById("pieChart");

    barChart = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Sales Data",
                data: values,
                backgroundColor: "skyblue"
            }]
        }
    });

    pieChart = new Chart(ctx2, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    "red", "blue", "green", "orange", "purple", "gray"
                ]
            }]
        }
    });
}

// ADD DATA
function addData() {
    const product = document.getElementById("product").value;
    const price = document.getElementById("price").value;

    if (product === "" || price === "") {
        alert("Enter data");
        return;
    }

    labels.push(product);
    values.push(Number(price));

    document.getElementById("product").value = "";
    document.getElementById("price").value = "";

    updateAll();
}

// UPDATE ALL
function updateAll() {

    document.getElementById("tableBody").innerHTML =
        labels.map((p, i) =>
            `<tr><td>${p}</td><td>${values[i]}</td></tr>`
        ).join("");

    const total = values.reduce((a, b) => a + b, 0);
    const max = Math.max(...values);
    const min = Math.min(...values);

    const maxProduct = labels[values.indexOf(max)];
    const minProduct = labels[values.indexOf(min)];

    document.getElementById("summary").innerHTML =
        "Total: $" + total +
        " | Highest: " + maxProduct +
        " | Lowest: " + minProduct;

    barChart.data.labels = labels;
    barChart.data.datasets[0].data = values;
    barChart.update();

    pieChart.data.labels = labels;
    pieChart.data.datasets[0].data = values;
    pieChart.update();
}

// CLEAR DATA
function clearData() {
    labels = [];
    values = [];

    updateAll();
}

// START
createCharts();
