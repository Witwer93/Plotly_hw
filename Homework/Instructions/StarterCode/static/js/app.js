d3.json("samples.json").then((data) => {
    
    var trace1 = [
        {
            x: data.sample_values,
            y: data.otu_ids,
            type: 'bar',
            orientation: 'h',
            text: data.otu_labels,
            marker: {color: "blue"},
            name: "Top 10 OTUs"
        }
    ];

    var data = [trace1];

      // Define the plot layout
    var layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "OTU number/type" },
        yaxis: { title: "Prevelance" }
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data, layout);

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");

        // Initialize x and y arrays
        var x = [];
        var y = [];

        if (dataset === 'dataset1') {
            x = [1, 2, 3, 4, 5];
            y = [1, 2, 4, 8, 16];
        }

        else if (dataset === 'dataset2') {
            x = [10, 20, 30, 40, 50];
            y = [1, 10, 100, 1000, 10000];
        }

        // Note the extra brackets around 'x' and 'y'
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [y]);
    }

init();
})