function init() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  d3.json("data/samples.json").then((data) => {
    var names = data.names;
    console.log("names", names);

  // For each value in names create an option tag
  names.forEach(name =>{
      dropdownMenu.append("option")
    .attr("value", name).text(name)
    });
    
  optionChanged(names[0]);

  });
}

function optionChanged(nameSelect) {
  updateMeta(nameSelect);
  createCharts(nameSelect)
}
/** This function is called when a dropdown menu item is selected
 * @param selection - value user selected from dropdown box 
*/ 
function updateMeta(selection) {

  // May need to delete due to possible loading of data twice
  d3.json("data/samples.json").then(function (data) {

    var meta = data.metadata;
    var selectionData = meta.filter(object => object.id == selection);
      console.log("selectionData[0]", selectionData[0]);
      console.log("selection", selection)
    // Clearing demographic HTML
      var demoInfo = d3.select("#sample-metadata");
    demoInfo.html("");
    console.log(Object.entries(selectionData[0]))
    Object.entries(selectionData[0]).forEach(([key,value]) => {
    demoInfo.append("h5").text(`${key} : ${value}`);
    });
  });
}

function createCharts(chartSelect) {
  // Use D3 fetch to read the JSON file
  // The data from the JSON file is arbitrarily named importedData as the argument
  d3.json("data/samples.json").then(function (data) {
    console.log("data", data);

    var chart_values = data.samples;
    console.log("chart_values", chart_values);

    var selectionSample = chart_values.filter(object => object.id == chartSelect);
    console.log("selectionSample", selectionSample[0]);
    var sample_values = selectionSample[0].sample_values;
    console.log("sample_values", sample_values)
    var otu_ids = selectionSample[0].otu_ids;
    var otu_labels = selectionSample[0].otu_labels;
    console.log("otu_ids", otu_ids);
    console.log("otu_labels", otu_labels);


    // // Create variables for top 10 data points
    var sample_values10 = sample_values.slice(0, 10);
    console.log("samples_values10", sample_values10);
    var otu_ids10 = otu_ids.slice(0, 10);
    console.log("otu_ids10", otu_ids10);
    var otu_labels10 = otu_labels.slice(0, 10);
    console.log("otu_labels10", otu_labels10);

    // Create bubble chart layout for all data
    var bubbleChart = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID"}    
    }

    // Refer to all data to plot all points on bubbles chart
    var bubbleData = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      // Make the marker color & size reflect the amount of bacteria 
      marker: {
        color: otu_ids,
        size: sample_values
      },
      type: 'scatter'
    };

    Plotly.plot("bubble", [bubbleData], bubbleChart);

    // Create bar chart layout for top ten data points in the selected sample
    var barChart = {
      title: "Top Bacteria",
      barmode: "group"
    };
    
    var barData = {
      x: sample_values10,
      y: otu_ids10,
      orientation: 'h',
      text: otu_ids10.map(String),
      hoverinfo: otu_labels,
      type: "bar"
    };
      
    Plotly.newPlot("bar", [barData], barChart);

  });
}


init();
