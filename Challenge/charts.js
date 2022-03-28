function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values.map((value) => parseInt(value));

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otu_ids.slice(0, 10).map((id) => id).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      hoverinfo: otu_labels,
      type: "bar",
      orientation: "h"    
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bellybutton Bacteria",
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", [barData], barLayout);
  });
}



// DELIV 2
// PASTED FROM bellybutton_bubblechart_starter_code.js:
// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    //Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      type: "bubble",
      mode: 'markers',
      marker: {
        size:20,
        colorscale:'Picnic',
      }

   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      hovermode:'closest',
      xaxis:{title:"ID"},
      margin:{
        l:100,
        r:100,
        b:100,
        t:100
      }

    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", [bubbleData], bubbleLayout); 
  });
}


//DELIV 3
// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];

    // 3. Create a variable that holds the washing frequency.
    var wFreq = result.wfreq;

    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      value: wFreq,
      title: { text: "Bellybutton Wash Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 10], dtick:2 },
        bar: { color: "black" },
        steps: [
          { range: [0, 2], color: "lavenderblush" },
          { range: [2, 4], color: "pink" },
          { range: [4, 6], color: "deeppink" },
          { range: [6, 8], color: "violet" },
          { range: [8, 10], color: "darkorchid" },
        ],
      },
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", [gaugeData], gaugeLayout);
  });
}