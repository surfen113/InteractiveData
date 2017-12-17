function loadTree() {
    load_chart();
    load_family_tree();
};

var margin = {top: 20, right: 20, bottom: 70, left: 70},
    width = 1150 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

function load_family_tree(){
        treeJson = d3.json("trump_family.json", function(error, treeData) {

        dTree.init(treeData, {
            target: "#graph",
            debug: true,
            height: 150,
            width: 2000,
            callbacks: {
                nodeClick: function (name, extra) {
                    console.log(name);
                }
            }
        });
    });
}

function load_chart() {


// set the dimensions and margins of the diagram
    var margin = {top: 20, right: 90, bottom: 30, left: 90},
        width = 660 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([height, width]);

// load the external data
    d3.json("trump_original.json", function (error, treeData) {
        if (error) throw error;

        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(treeData, function (d) {
            return d.partners;
        });

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#chart1").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom),
            g = svg.append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // adds the links between the nodes
        var link = g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function (d) {
                return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            });

        // adds each node as a group
        var node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", function (d) {
                return "node" +
                    (d.partners ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // adds the circle to the node
        node.append("circle")
            .attr("r", 10);

        // adds the text to the node
        node.append("text")
            .attr("dy", ".35em")
            .attr("x", function (d) {
                return d.partners ? -13 : 13;
            })
            .style("text-anchor", function (d) {
                return d.partners ? "end" : "start";
            })
            .text(function (d) {
                return d.data.name;
            });

    });
}