/**
 * Created by jri on 18.01.18.
 */
(function ($) {

    var DonutPie = function ($self, options) {
        this.$self = $self;
        this.settings = $.extend($.fn.donutpie.defaults, options);
    };

    DonutPie.prototype.display = function () {

        var radius = this.settings.radius / 2;

        this.svg = d3.select(this.$self[0])
            .append("svg")
            .attr("width", radius * 2)
            .attr("height", radius * 2)
            .append("g");
        this.svg.append("g")
            .attr("class", "slices");

        this.svg.append("svg:circle")
            .attr("r", radius * 0.6)
            .style("fill", "#E7E7E7");
        //.on(eventObj);
        this.svg.append('text')
            .attr('class', 'center-txt year')
            .attr('id', 'year')
            .attr('y', radius * -0.3)
            .attr('text-anchor', 'middle')
            .style('font-size', '30px')
            .style('font-weight', 'bold');

        this.svg.append('text')
            .attr('class', 'center-txt')
            .attr('id', 'region')
            .attr('y', radius * -0.05)
            .attr('text-anchor', 'middle')
            .style('font-size', '25px')
            .style('font-weight', 'normal');

        this.svg.append('text')
            .attr('class', 'center-txt value')
            .attr('id', 'cases')
            .style('font-size', '25px')
            .attr('y', radius * 0.15)
            .attr('text-anchor', 'middle')
            .style('font-weight', 'bold');

        this.pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return d.hvalue;
            });

        this.arc = d3.svg.arc()
            .outerRadius(radius * 0.85)
            .innerRadius(radius * 0.4);

        this.arcHover = d3.svg.arc()
            .innerRadius(radius * 0.4)
            .outerRadius(radius * 0.95);

        this.outerArc = d3.svg.arc()
            .innerRadius(radius * 0.3)
            .outerRadius(radius * 0.9);


        this.svg.attr("transform", "translate(" + radius + "," + radius + ")");

        var tpClass = this.settings.tooltipClass;
        if (!$('body').hasClass(tpClass)) {
            $('.' + tpClass).remove();
            d3.select("body")
                .append("div")
                .attr('class', tpClass)
                .style("position", "absolute")
                .style("z-index", "100")
                .style("visibility", "hidden")
                .text("");
        }

    };

    function center_text(element, region, year, cases, percentage) {

        element.select("#region").text("Total Cases in " + region + ":");
        element.select("#cases").text(cases.toLocaleString());

        element.select("#percentage").text(percentage + " %");
        element.select("#year").text(year);
    }


    DonutPie.prototype.update = function (data, total, year) {

        // check if all the items has colors.
        var colors = d3.scale.category20().range();
        for (var i = 0; i < data.length; i++) {
            if (data[i]['color'] == undefined)
                data[i]['color'] = colors[i];
        }
        ;

        var tooltip = this.settings.tooltip;
        var tpClass = "." + this.settings.tooltipClass;
        var arc = this.arc;
        var arcHover = this.arcHover;
        var slice = this.svg.select(".slices").selectAll("path.slice")
            .data(this.pie(data));

        var element = this.svg;

        center_text(element, "World", year, total, 100);


        slice.enter()
            .insert("path")
            .style("fill", function (d) {
                return d.data.color;
            })
            .attr("title", function (d) {
                return d.data.name + " " + Math.round(d.value) + "%";
            })
            .attr("class", "slice")


        slice
            .transition().duration(400)
            .style("fill", function (d) {
                return d.data.color;
            })
            .attr("title", function (d) {
                return d.data.name + " " + Math.round(d.value) + "%";
            })
            .attrTween("d", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    return arc(interpolate(t));
                };
            });

        slice.exit()
            .remove();

    };

    $.fn.donutpie2 = function (option) {

        var $this = $(this);
        var $donutpie2 = $this.data("donutpie");

        if (!$donutpie2) {
            // init the object
            var options = typeof option == "object" && option;
            $donutpie2 = new DonutPie($this, options);
            $this.data("donutpie", $donutpie2);
        }

        if (typeof option === 'string' && $.fn.donutpie.methods[option]) {
            $donutpie2[option].apply($donutpie2, Array.prototype.slice.call(arguments, 1));
        } else if (typeof option === 'object' || !option) {
            $donutpie2.display.apply($donutpie2, option);
        } else {
            $.error('Method ' + option + ' does not exist in DonutPie');
        }

    };

    $.fn.donutpie2.methods = {
        'display': 1,
        'update': 1
    }

    $.fn.donutpie.defaults = {
        radius: 240,
        tooltip: true,
        tooltipClass: "donut-pie-tooltip-bubble"
    };

}(jQuery));