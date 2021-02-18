d3.json("samples.json").then((data) => {
    
    var trace1 = [
        {
            x: data.sample_values,
            y: data.otu_ids,
            type: 'bar',
            orientation: 'h',
            text: data.out_labels,
            marker: {color: "blue"},
            name: "Top 10 OTUs"
        }
    ];

    var data = trace1;















})