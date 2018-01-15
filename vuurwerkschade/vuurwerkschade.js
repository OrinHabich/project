/*
  vuurwerkschade.js
  Minor programmeren; Project
  Orin Habich 10689508

  line chart:   https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
  update linechart met buttonpress http://bl.ocks.org/d3noob/7030f35b72de721622b8
*/

window.onload = afterLoad;

function afterLoad() {
    /*  This executes the whole script,
        but it is called only when the window is loaded.
    */

    //--------VARIABLES FOR THE BARCHART ABOUT SEH------------------------------
    var svgBarchartSEH = d3.select("#svgBarchartSEH"),
        margin = {top: 20, right: 100, bottom: 30, left: 60},
        widthBarchart =
        +svgBarchartSEH .attr("width") - margin.left - margin.right,
        heightBarchart =
        +svgBarchartSEH .attr("height") - margin.top - margin.bottom,
        gBarchartSEH = svgBarchartSEH .append("g").attr("id", "BarchartSEH")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xSEH = d3.scaleBand()
        .rangeRound([0, widthBarchart])
        .paddingInner(0.05)
        .align(0.1);

    var ySEH = d3.scaleLinear().rangeRound([heightBarchart, 0]);

    var colorsBarchartSEH  = ["#A9A9A9", "#BDB76B"];

    var zSEH = d3.scaleOrdinal().range(colorsBarchartSEH );

    // Define the div for the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //--------VARIABLES FOR THE BARCHART ABOUT MELDINGEN VUURWERKOVERLAST-------
    var svgBarchartOverlast = d3.select("#svgBarchartOverlast"),
        margin = {top: 20, right: 100, bottom: 30, left: 60},
        widthBarchart =
        +svgBarchartOverlast.attr("width") - margin.left - margin.right,
        heightBarchart =
        +svgBarchartOverlast.attr("height") - margin.top - margin.bottom,
        gBarchartOverlast =
        svgBarchartOverlast.append("g").attr("id", "BarchartOverlast")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xOverlast = d3.scaleBand()
        .rangeRound([0, widthBarchart])
        .paddingInner(0.05)
        .align(0.1);

    var yOverlast = d3.scaleLinear().rangeRound([heightBarchart, 0]);

    var colorsBarchartOverlast =
    ["#B8860B", "#EE82EE", "	#F5DEB3", "#9ACD32", "#C0C0C0"];

    var zOverlast = d3.scaleOrdinal().range(colorsBarchartOverlast);

    //--------VARIABLES FOR THE BARCHART ABOUT SCHADE---------------------------
    var svgBarchartSchade = d3.select("#svgBarchartSchade"),
        margin = {top: 20, right: 100, bottom: 30, left: 60},
        widthBarchart =
        +svgBarchartSchade.attr("width") - margin.left - margin.right,
        heightBarchart =
        +svgBarchartSchade.attr("height") - margin.top - margin.bottom,
        gBarchartSchade =
        svgBarchartSchade.append("g").attr("id", "BarchartSchade")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xSchade = d3.scaleBand()
        .rangeRound([0, widthBarchart])
        .paddingInner(0.05)
        .align(0.1);

    var ySchade = d3.scaleLinear().rangeRound([heightBarchart, 0]);

    var colorsBarchartSchade =
    ["#B8860B", "#EE82EE", "	#F5DEB3", "#9ACD32", "#C0C0C0"];

    var zSchade = d3.scaleOrdinal().range(colorsBarchartSchade);

    //--------VARIABLES FOR THE PIECHART ABOUT 'SEHperLeeftijd'-----------------
    var svgPiechartSEHperLeeftijd = d3.select("#svgPiechartSEHperLeeftijd"),
        widthPiechart = +svgPiechartSEHperLeeftijd.attr("width"),
        heightPiechart = +svgPiechartSEHperLeeftijd.attr("height"),
        radius = Math.min(widthPiechart, heightPiechart) / 2,
        gPiechartSEHperLeeftijd =
        svgPiechartSEHperLeeftijd.append("g").attr("id", "PiechartLeeftijd")
            .attr("transform",
             "translate(" + widthPiechart / 2 + "," + heightPiechart / 2 + ")");

     var PieTitle = d3.select("#PiechartLeeftijd").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);

    var colorsPiechartSEHperLeeftijd = d3.scaleOrdinal(d3.schemeCategory10);

    var pieSEHperLeeftijd = d3.pie()
        .sort(null)
        .value(function(d) { return d.number; });

    var pathSEHperLeeftijd = d3.arc().outerRadius(radius).innerRadius(0);

    var labelSEHperLeeftijd =
    d3.arc().outerRadius(radius - 10).innerRadius(radius - 60);

    var firstTimePiechartSEHperLeeftijd = true;

    d3.select("#PiechartLeeftijd").append("div")
    .attr("class", "titlePiechart")
    .style("opacity", 1)
    .html("Leeftijd");

    //--------VARIABLES FOR THE PIECHART ABOUT OMSTANDER------------------------
    var svgPiechartSEHomstander = d3.select("#svgPiechartSEHomstander"),
        widthPiechart = +svgPiechartSEHomstander.attr("width"),
        heightPiechart = +svgPiechartSEHomstander.attr("height"),
        radius = Math.min(widthPiechart, heightPiechart) / 2,
        gPiechartSEHomstander =
        svgPiechartSEHomstander.append("g").attr("id", "PiechartOmstander")
            .attr("transform",
             "translate(" + widthPiechart / 2 + "," + heightPiechart / 2 + ")");

     // var PieTitleSEHomstander = d3.select("#PiechartOmstander").append("div")
     // .attr("class", "tooltip")
     // .style("opacity", 0);

    var colorsPiechartSEHomstander = d3.scaleOrdinal(d3.schemeCategory10);

    var pieSEHomstander = d3.pie()
        .sort(null)
        .value(function(d) { return d.number; });

    var pathSEHomstander = d3.arc().outerRadius(radius).innerRadius(0);

    var labelSEHomstander =
    d3.arc().outerRadius(radius + 60).innerRadius(radius - 140);

    var firstTimePiechartSEHomstander = true;

    //--------VARIABLES FOR THE PIECHART ABOUT TYPE FIREWORKS-------------------
    var svgPiechartSEHperTypeVuurwerk =
        d3.select("#svgPiechartSEHperTypeVuurwerk"),
        widthPiechart = +svgPiechartSEHperTypeVuurwerk.attr("width"),
        heightPiechart = +svgPiechartSEHperTypeVuurwerk.attr("height"),
        radius = Math.min(widthPiechart, heightPiechart) / 2,
        gPiechartSEHperTypeVuurwerk = svgPiechartSEHperTypeVuurwerk.append("g")
            .attr("id", "PiechartperTypeVuurwerk")
            .attr("transform",
             "translate(" + widthPiechart / 2 + "," + heightPiechart / 2 + ")");

     // var PieTitleSEHperTypeVuurwerk
     //= d3.select("#PiechartperTypeVuurwerk").append("div")
     // .attr("class", "tooltip")
     // .style("opacity", 0);

    var colorsPiechartSEHperTypeVuurwerk = d3.scaleOrdinal(d3.schemeCategory10);

    var pieSEHperTypeVuurwerk = d3.pie()
        .sort(null)
        .value(function(d) { return d.number; });

    var pathSEHperTypeVuurwerk = d3.arc().outerRadius(radius).innerRadius(0);

    var labelSEHperTypeVuurwerk =
    d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

    var firstTimePiechartSEHperTypeVuurwerk = true;

    //--------VARIABLES FOR THE PIECHART ABOUT STATUS FIREWORKS-------------------
    var svgPiechartSEHstatusVuurwerk = d3.select("#svgPiechartSEHstatusVuurwerk"),
        widthPiechart = +svgPiechartSEHstatusVuurwerk.attr("width"),
        heightPiechart = +svgPiechartSEHstatusVuurwerk.attr("height"),
        radius = Math.min(widthPiechart, heightPiechart) / 2,
        gPiechartSEHstatusVuurwerk = svgPiechartSEHstatusVuurwerk.append("g")
            .attr("id", "PiechartstatusVuurwerk")
            .attr("transform",
             "translate(" + widthPiechart / 2 + "," + heightPiechart / 2 + ")");

    var colorsPiechartSEHstatusVuurwerk = d3.scaleOrdinal(d3.schemeCategory10);

    var pieSEHstatusVuurwerk = d3.pie()
        .sort(null)
        .value(function(d) { return d.number; });

    var pathSEHstatusVuurwerk = d3.arc().outerRadius(radius).innerRadius(0);

    var labelSEHstatusVuurwerk =
    d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

    var firstTimePiechartSEHstatusVuurwerk = true;

    //-------VARIABELS FOR THE LINECHART------------------------------------
    // var svgLinechart = d3.select("#svgLinechart"),
    //     margin = {top: 20, right: 100, bottom: 30, left: 60},
    //     widthLinechart =
    //     +svgLinechart .attr("width") - margin.left - margin.right,
    //     heightLinechart =
    //     +svgLinechart .attr("height") - margin.top - margin.bottom,
    //     gLinechart = svgLinechart .append("g").attr("id", "Linechart")
    //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //
    // // parse the date / time
    // var parseTime = d3.timeParse("%d-%b-%y");
    //
    // // set the ranges
    // var x = d3.scaleTime().range([0, widthLinechart]);
    // var y = d3.scaleLinear().range([heightLinechart, 0]);
    //
    // // define the line
    // var valueline = d3.line()
    // .x(function(d) { return x(d.date); })
    // .y(function(d) { return y(d.close); });



    //---------IMAGE POPPETJE---------------------------------------------------
    // var svg = d3.select('body').append('svg').attr({
    //   width: 300,
    //   height: 300,
    //   border: '1px solid #ccc'
    // });

    //
    // var widthImagePoppetje1 = d3.select("#svgImagePoppetje1").attr("width");
    // var heightImagePoppetje1 = d3.select("#svgImagePoppetje1").attr("height");
    //
    // d3.select("#svgImagePoppetje1")
    // .append("svg:image")
    // .attr("xlink:href", "images/poppetje1.png")
    // .attr("width", widthImagePoppetje1)
    // .attr("height", heightImagePoppetje1)
    // .attr("x", 0)
    // .attr("y", 10);
    //
    // d3.select("#svgImagePoppetje1")
    // .append("svg:image")
    // .attr("xlink:href", "images/head.png")
    // .attr("width", widthImagePoppetje1/2)
    // .attr("height", heightImagePoppetje1/2)
    // .attr("x", 40)
    // .attr("y", -35)
    // .on("mouseover", function(d){
    //   this.style("opacity", 0.1);
    // });


    //--------------------------------------------------------------------------
    //
    //
    //
    //
    //
    //
    //
    //
    //--------LOAD DATA---------------------------------------------------------

    queue()
        .defer(d3.csv, "data/SEH.csv", function(d, i, columns) {
            for (i = 1, t = 0; i < columns.length; ++i)
            t += d[columns[i]] = +d[columns[i]];
            d.total = t;
            return d;
        })
        .defer(d3.csv, "data/overlast.csv", function(d, i, columns) {
            for (i = 1, t = 0; i < columns.length; ++i)
            t += d[columns[i]] = +d[columns[i]];
            d.total = t;
            return d;
        })
        .defer(d3.csv, "data/schade.csv", function(d, i, columns) {
            for (i = 1, t = 0; i < columns.length; ++i)
            t += d[columns[i]] = +d[columns[i]];
            d.total = t;
            return d;
        })
        // .defer(d3.csv, "data/fijnstof14-15.csv", function(d, i, columns) {
        //     for (i = 1, t = 0; i < columns.length; ++i)
        //     t += d[columns[i]] = +d[columns[i]];
        //     d.total = t;
        //     return d;
        // })
        //.defer(d3.csv, "data/fijnstof14-15.csv")
      	.defer(d3.json, "data/SEHperLeeftijd.json")
        .defer(d3.json, "data/SEHomstander.json")
        .defer(d3.json, "data/SEHperTypeVuurwerk.json")
        .defer(d3.json, "data/SEHstatusVuurwerk.json")
      	.await(makeCharts);

    function makeCharts(error, dataBarchartSEH, dataBarchartOverlast,
       dataBarchartSchade, dataPiechartSEHperLeeftijd, dataPiechartSEHomstander,
       dataPiechartSEHperTypeVuurwerk, dataPiechartSEHstatusVuurwerk) {
        /*   Creates charts based on the given data.
             Args: Appriopiate datasets.
        */
        if (error) throw error;

        makeBarchart(xSEH, ySEH, zSEH, gBarchartSEH, dataBarchartSEH,
          dataPiechartSEHperLeeftijd, dataPiechartSEHomstander,
          dataPiechartSEHperTypeVuurwerk, dataPiechartSEHstatusVuurwerk,
          " mensen", "Aantal");

       makeBarchart(xOverlast, yOverlast, zOverlast, gBarchartOverlast,
          dataBarchartOverlast, dataPiechartSEHperLeeftijd,
          dataPiechartSEHomstander, dataPiechartSEHperTypeVuurwerk,
          dataPiechartSEHstatusVuurwerk, " klachten", "Aantal");

        makeBarchart(xSchade, ySchade, zSchade, gBarchartSchade,
           dataBarchartSchade, dataPiechartSEHperLeeftijd,
           dataPiechartSEHomstander, dataPiechartSEHperTypeVuurwerk,
            dataPiechartSEHstatusVuurwerk, " miljoen euro", "Euro (in miljoenen)");

        // Draw default piecharts
        updatePiecharts("14-15", dataPiechartSEHperLeeftijd,
           dataPiechartSEHomstander, dataPiechartSEHperTypeVuurwerk,
           dataPiechartSEHstatusVuurwerk, true);

        d3.select("#titlePiechartsSection")
        .html("Onderverdeling slachtoffers 14-15");

        var select = d3.select("#chooseYear")
          .append('select')
       	  .attr('class','select')
          .on('change',onchange)

        var options = select
          .selectAll('option')
     	    .data(dataBarchartSEH).enter()
     	    .append('option')
          .attr("id", function(d){return "#j" + d.jaarwisseling;})
     		  .text(function (d) { return d.jaarwisseling; });

        function onchange() {
     	    selectValue = d3.select('select').property('value');
          updatePiecharts(selectValue, dataPiechartSEHperLeeftijd,
             dataPiechartSEHomstander, dataPiechartSEHperTypeVuurwerk,
             dataPiechartSEHstatusVuurwerk, false);
          d3.selectAll("rect").attr('opacity', 0.4);
          d3.selectAll(".jaarwisseling" + selectValue).attr('opacity', 1);
          d3.select("#titlePiechartsSection")
          .html("Onderverdeling slachtoffers " + selectValue);
        };


        //
        // // format the data for the linechart
        // dataLinechart.forEach(function(d) {
        //     d.date = parseTime(d.date);
        //     d.close = +d.close;
        // });
        //
        // // Scale the range of the data
        // x.domain(d3.extent(dataLinechart, function(d) { return d.date; }));
        // y.domain([0, d3.max(dataLinechart, function(d) { return d.close; })]);
        //
        // // Add the valueline path.
        // svg.append("path")
        //     .data([dataLinechart])
        //     .attr("class", "line")
        //     .attr("d", valueline);
        //
        // // Add the X Axis
        // svg.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x));
        //
        // // Add the Y Axis
        // svg.append("g")
        //     .call(d3.axisLeft(y));



    };

    //--------FUNCTIONS--------------------------------------------------------

    function updatePiecharts(jaarwisseling, dataPiechartSEHperLeeftijd,
       dataPiechartSEHomstander, dataPiechartSEHperTypeVuurwerk,
       dataPiechartSEHstatusVuurwerk, firstTime) {
      /*   Updates the piecharts.
           Args: The year and the age group.
      */
      makePiechart(gPiechartSEHperLeeftijd, pieSEHperLeeftijd,
         pathSEHperLeeftijd,
        colorsPiechartSEHperLeeftijd, labelSEHperLeeftijd, "leeftijd",
        dataPiechartSEHperLeeftijd[jaarwisseling], firstTime);
      makePiechart(gPiechartSEHomstander, pieSEHomstander, pathSEHomstander,
        colorsPiechartSEHomstander, labelSEHomstander, "wie",
        dataPiechartSEHomstander[jaarwisseling], firstTime);
      makePiechart(gPiechartSEHperTypeVuurwerk, pieSEHperTypeVuurwerk,
         pathSEHperTypeVuurwerk,
        colorsPiechartSEHperTypeVuurwerk, labelSEHperTypeVuurwerk, "type",
        dataPiechartSEHperTypeVuurwerk[jaarwisseling], firstTime);
      makePiechart(gPiechartSEHstatusVuurwerk, pieSEHstatusVuurwerk,
         pathSEHstatusVuurwerk,
        colorsPiechartSEHstatusVuurwerk, labelSEHstatusVuurwerk, "status",
        dataPiechartSEHstatusVuurwerk[jaarwisseling], firstTime);
    };

    function makePiechart(gPiechart, pie, path, colorsPiechart,
       label, dataItem, dataChosen, firstTime) {
       /*   Creates a piechart for the given data.
            Args: An appriopiate data set.
       */
       if (!firstTime){
         gPiechart.selectAll(".arc").data([]).exit().remove();
       };

       var arc = gPiechart.selectAll(".arc")
          .data(pie(dataChosen))
          .enter().append("g")
          .attr("class", "arc");

      arc.append("path")
          .attr("d", path)
          .attr("fill",
          function(d) { return colorsPiechart(d.data[dataItem]); })
          .on("mousemove", function(d) {
               div.transition()
                   .duration(1)
                   .style("opacity", 1);
                  //console.log(d.data.number);
               div.html(d.data.number + " mensen" )
                   .style("left", (d3.event.pageX) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
               //d3.select(this).style("opacity", 1);
               })
           .on("mouseout", function(d) {
               div.transition()
                   .duration(1)
                   .style("opacity", 0);
               //d3.select(this).style("opacity", 0.5);
           });

      arc.append("text")
          .attr("transform",
          function(d) { return "translate(" + label.centroid(d) + ")"; })
          .text(function(d) { return d.data[dataItem]; });
    };

    function makeBarchart(x, y, z, gBarchart, dataChosen,
       dataPiechartSEHperLeeftijd,
       dataPiechartSEHomstander, dataPiechartSEHperTypeVuurwerk,
        dataPiechartSEHstatusVuurwerk, unit, nameY) {
       /*   Creates a barchart for the given data.
            Args: An appriopiate data set.
       */
       var keys = dataChosen.columns.slice(1);

       x.domain(dataChosen.map(function(d) { return d.jaarwisseling; }));
       y.domain([0, d3.max(dataChosen, function(d) { return d.total; })]).nice();
       z.domain(keys);

       // make the barchart about SEH
       gBarchart.append("g")
           .selectAll("g")
           .data(d3.stack().keys(keys)(dataChosen))
           .enter().append("g")
           .attr("fill", function(d) { return z(d.key); })
           .selectAll("rect")
           .data(function(d) { return d; })
           .enter().append("rect")
           .attr("class", function(d) { return "jaarwisseling" +
            d.data.jaarwisseling; })
           .attr("x", function(d) { return x(d.data.jaarwisseling); })
           .attr("y", function(d) { return y(d[1]); })
           .attr("height", function(d) { return y(d[0]) - y(d[1]); })
           .attr("width", x.bandwidth())
           .attr('opacity', 0.4)
           .on("mousemove", function(d) {
                div.transition()
                    .duration(5)
                    .style("opacity", 1);
                div	.html(Math.abs(d[0] - d[1]) + unit )
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                //d3.select(this).style("opacity", 1);
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(5)
                    .style("opacity", 0);
                //d3.select(this).style("opacity", 0.5);
            })

           .on("click", function(d) {

               // obtain x and y position
               d3.selectAll("rect").attr('opacity', 0.4);

               var xPosition = d.data.jaarwisseling;
               var yPosition = d3.select(this.parentNode).attr("fill");
               d3.selectAll(".jaarwisseling" + xPosition).attr('opacity', 1);

               d3.select("#titlePiechartsSection")
               .html("Onderverdeling slachtoffers " + xPosition);

               // attempt to update the selection in the dropdown menu
               d3.select("#j" + xPosition);

               // remake piecharts
               updatePiecharts(xPosition, dataPiechartSEHperLeeftijd,
                  dataPiechartSEHomstander,
                  dataPiechartSEHperTypeVuurwerk,
                   dataPiechartSEHstatusVuurwerk, false);
               return



           });

      // default 14-155 is selected
      d3.selectAll(".jaarwisseling14-15").attr('opacity', 1);

       // make x axis
       gBarchart.append("g")
           .attr("class", "axis")
           .attr("transform", "translate(0," + heightBarchart + ")")
           .call(d3.axisBottom(x))
           .append("text")
           .attr("x", widthBarchart + 4)
           .attr("dy", "0.2em")
           .attr("fill", "#000")
           .attr("text-anchor", "start")
           .text("Jaarwisseling");

     // make y axis
     gBarchart.append("g")
           .attr("class", "axis")
           .call(d3.axisLeft(y))
           .append("text")
           .attr("x", 2)
           .attr("y", y(y.ticks().pop()) + 0.5)
           .attr("dy", "0.2em")
           .attr("fill", "#000")
           .attr("text-anchor", "start")
           .text(nameY);

     // add legend to the barchart
     var legend = gBarchart.append("g")
           .attr("font-family", "sans-serif")
           .attr("font-size", 10)
           .attr("text-anchor", "end")
           .selectAll("g")
           .data(keys.slice().reverse())
           .enter().append("g")
           .attr("transform",
           function(d, i) { return "translate(0," + i * 20 + ")"; });

     legend.append("rect")
           .attr("x", widthBarchart + 60)
           .attr("width", 19)
           .attr("height", 19)
           .attr("fill", z);

     legend.append("text")
           .attr("x", widthBarchart + 50)
           .attr("y", 9.5)
           .attr("dy", "0.32em")
           .text(function(d) { return d; });



    };




};
