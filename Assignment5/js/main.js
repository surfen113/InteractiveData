d3.select(window).on('load', init);


function init() {
    //Width and height
    var w = 2000;
    var h = 1000;

    var projection = d3.geoMercator()
        .translate([0, 0])
        .scale(1);

    //Define path generator
    var path = d3.geoPath()
        .projection(projection);

    //Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //Load in GeoJSON data
    d3.json("json/sfpd_districts.geojson", function (json) {


        var b = path.bounds(json),
            s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
            t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);

        //Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            //.attr("transform", "translate(-800,200)")
            .style("fill", "red")
            .style("stroke", "#fff")
            .style("stroke-width", "3")
            .style("fill", function (d) {

                // Get data value
                var value = d.properties.visited;
                return "rgb(213,222,217)";

            });

        // put boarder around states
        // svg.append("path")
        //     .datum(topojson.mesh(json, json.properties.district, function(a, b) { return a !== b; }))
        //     .attr("class", "mesh")
        //     .attr("d", path);
        //

        d3.json("json/sf_crime.geojson", function (json) {

            // add circles to svg
            svg.selectAll("circle")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                // .append("circle")
                // .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
                // .attr("cy", function (d) { return projection(d)[1]; })
                // .attr("r", "8px")
                .attr("fill", "steelblue")
        });
    });
}


      var map, heatmap;
      var asd = [];

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 37.775, lng: -122.434},
          mapTypeId: 'roadmap'
        });

        heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map
        });
      }

      function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      }

      function changeGradient() {
        var gradient = [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
      }

      function changeRadius() {
        heatmap.set('radius', heatmap.get('radius') ? null : 5);
      }

      function changeOpacity() {
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
      }


      // Heatmap data: 500 Points
      function getPoints() {

        d3.json("json/sf_crime.geojson", function (json) {

                 for (var i = 0; i < json.features.length; i++) {
                    coords = json.features[i].geometry.coordinates;
                    x = coords[1];

                    y = coords[0];

                    latLng1 = new google.maps.LatLng(parseFloat(x),parseFloat(y));
latLng = new google.maps.LatLng(37.731664792649603, -122.443177432448991);
                    asd.push(latLng1);

                  }

        });


return asd;

      }