function init()
{
d3.json("samples.json").then((data) => {

    //grab names for dropdown
    var names = data.names;
    sampleName = names[0]

    //
    makeTrace(sampleName);
    console.log(names);

    //
    var selector = d3.select("#selDataset")
    //
    names.forEach((sample) => {
        selector.append("option").text(sample).property("value", sample)
    });
    })
}
    function makeTrace(dataset){

        d3.json("samples.json").then((data) => {

        var filterData = data;

        filterData = data.samples;
        
        //
        var resultArray = filterData.filter(sampleObj => sampleObj.id == dataset);
        var result = resultArray[0];
        console.log(result)
        //
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var xdata = sample_values.slice(0, 10).reverse();
        console.log(yticks, xdata, otu_labels)
    
        var trace1 = [
        {
            x: xdata,
            y: yticks,
            type: 'bar',
            orientation: 'h',
            text: otu_labels,
            marker: {color: "blue"},
            name: "Top 10 OTUs"
        }
    ];

    var data2 = trace1;

      // Define the plot layout
    var layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "OTU number/type" },
        yaxis: { title: "Prevelance" }
    };


    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data2, layout);
        });
    };
    // This function is called when a dropdown menu item is selected

function optionChanged(dataset) {
    makeTrace(dataset);
};

init();