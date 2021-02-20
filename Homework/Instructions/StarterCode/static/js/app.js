

function init()
{
d3.json("samples.json").then((data) => {

    //grab names for dropdown
    var names = data.names;
    //Grab first subject ID to display for the first time the page is loaded
    sampleName = names[0];
    //Get metadata
    var metadata = data.metadata;
    //filter to get metadata for first subject ID
    var firstEntry = metadata.filter(row => row.id == sampleName)[0];
    //d3 object for the panel
    var panel = d3.select("#sample-metadata");
    //load the metadata for first subject ID into the panel
    Object.entries(firstEntry).forEach(([key, value]) => {
        panel.append("h5").text(`${key}: ${value}`);
    });

    //Send subject ID to function that makes the plots/graphs/charts
    makeTrace(sampleName);

    //d3 object for dropdown
    var selector = d3.select("#selDataset");
    //add all subject ids to the dropdown
    names.forEach((sample) => {
        selector.append("option").text(sample).property("value", sample)
    });
    })
};

//function to adjust demographic info panel
function demoInfo(newID){
    d3.json("samples.json").then((data) => {
    var metadata = data.metadata
    //filter metadata to match selected subject ID
    var filterData = metadata.filter(row => row.id == newID)[0];
    //d3 for panel
    var panel = d3.select("#sample-metadata");
    //clear old entry
    panel.html("");
    //load new metadata
    Object.entries(filterData).forEach(([key, value]) => {
        panel.append("h5").text(`${key}: ${value}`);
    });
    });
};

//function to create and adjust bar chart, bubble chart, and gauge
function makeTrace(newID)
{
    d3.json("samples.json").then((data) => {
    var filterData = data.samples;

    //filter data for values corresponding with ID passed from dropdown menu
    var resultArray = filterData.filter(sampleObj => sampleObj.id == newID);
    //dig into array containing dictionary
    var result = resultArray[0];
    //console.log(result)
    
    //grab otu_ids, labels, values, and create slices for top 10 OTUs for given subject ID
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var xdata = sample_values.slice(0, 10).reverse();
    //console.log(yticks, xdata, otu_labels)
    
    //set trace for bar chart
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
    // Define the bar layout
    var layout = 
    {
    title: `Top 10 OTUs`,
    xaxis: { title: "Count of OTU" },
    yaxis: { title: "OTU Type" }
    };

    //set layout for bubblechart
    var bubbleLayout = 
    {
    title: "Bacteria Cultures Per Sample",
    margin: { T: 0 },
    hovermode: "closest",
    xaxis: { TITLE: "OTU ID" },
    margin: { T: 30}
    };
    //set data for bubblechart
    var bubbleData = 
    [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "earth"
    }
    }];

    
    // Plot the bar chart to a div tag with id "bar"
    Plotly.newPlot("bar", trace1, layout);
    // plot the bubblechart with id tag "bubble"
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    //var data2 = trace1;


    });
};

// This function is called when a dropdown menu item is selected
// optionChanged predefined in html
function optionChanged(newID) {
    makeTrace(newID);
    demoInfo(newID);
};

init();