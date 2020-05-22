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

// This function is called when a dropdown menu item is selected
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

function createCharts(name) {
  // Use D3 fetch to read the JSON file
  // The data from the JSON file is arbitrarily named importedData as the argument
  d3.json("data/samples.json").then(function (data) {
    // console.log(importedData);
    var sample_values = data.sample_values;
    var otu_ids = data.otu_ids;
    var otu_labels = data.otu_labels;
    console.log("sample_values", sample_values);

    // let bubbleLayout = {
    //   margin: { t: 0 },
    //   hovermode: "closests",
    //   xaxis: { title: "OTU ID"}
    // }

    // let bubbleData = [
    //   {
    //     x: otu_ids,
    //     y: sample_values,
    //     text: otu_labels,
    //     mode: "markers",
    //     marker: {
    //       size: sample_values,
    //       color: otu_ids,
    //     }
    //   }
    // ]

    // Plotly.plot("bubble", bubbleData, bubbleLayout);

    // // Create variables for top 10 data points
    // var sample_values10 = sample_values10.slice(0, 10).reverse();
    // var otu_ids10 = otu_ids10.slice(0, 10).reverse();
    // var otu_labels10 = otu_labels10.slice(0, 10).reverse();
    // console.log("samples_values10", sample_values10);
  });
}

  // Assign the value of the dropdown menu option to a variable
  // var dataset = dropdownMenu.property("value");
}


//   // Trace1 for the Greek Data
//   var trace1 = {
//     x: data.map(row => row.greekSearchResults),
//     y: data.map(row => row.greekName),
//     text: data.map(row => row.greekName),
//     name: "Greek",
//     type: "bar",
//     orientation: "h"
//   };

init();
