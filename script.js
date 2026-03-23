window.onload = function () {

    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {

            const products = data.products.slice(0, 6);

            const labels = products.map(p => p.title);
            const values = products.map(p => p.price);

            // 📊 BAR CHART
            new Chart(document.getElementById("barChart"), {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Product Prices",
                        data: values
                    }]
                }
            });

            // 🥧 PIE CHART
            new Chart(document.getElementById("pieChart"), {
                type: "pie",
                data: {
                    labels: labels,
                    datasets: [{
                        data: values
                    }]
                }
            });

            // 📊 ANALYSIS
            const total = values.reduce((a, b) => a + b, 0);
            const max = Math.max(...values);
            const min = Math.min(...values);

            const maxProduct = products.find(p => p.price === max).title;
            const minProduct = products.find(p => p.price === min).title;

            document.getElementById("summary").innerHTML =
                `Total Value: $${total} | Highest: ${maxProduct} | Lowest: ${minProduct}`;
        })
        .catch(err => {
            document.getElementById("summary").innerText = "Error loading data";
            console.log(err);
        });

};