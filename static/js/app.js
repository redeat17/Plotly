
showOptions();
showData();
optionChanged();

function showOptions() {
    d3.json('/samples').then(data => {

        var { names } = data;
        names.forEach(name => {
            d3.select('select').append('option').text(name);
        });
    });
};

function showData() {
    d3.json('/samples').then(data => {
        var { metadata, samples } = data;
        var selection = d3.select('select').property('value');

        d3.select('.panel-body').html('');
        metadata = metadata.filter(obj => obj.id == selection)[0];
        Object.entries(metadata).forEach(([key, val]) => {
            d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`);
        });

        samples = samples.filter(obj => obj.id == selection)[0];
        var { otu_ids, otu_labels, sample_values } = samples;

        var barData = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse().map(id => `OTU ${id}`),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        Plotly.newPlot('bar', barData);

        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }
        }];

        Plotly.newPlot('bubble', bubbleData);

        var gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: metadata.wfreq,
                title: { text: "Belly Button Wash Frequency <br> Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [0, 9] } }
            }
        ];

        var layout = { width: 600, height: 400 };
        Plotly.newPlot('gauge', gaugeData, layout);
    });
};

function optionChanged() {
    showData();
};