
var svgBar = d3.select(".bar-chart"),
    svgArea = d3.select(".area-chart"),
    margin = { top: 30, right: 20, bottom: 100, left: 60 },
    width = +svgBar.attr("width") - margin.left - margin.right,
    height = +svgBar.attr("height") - margin.top - margin.bottom,
    gBar = svgBar.append("g").attr("transform", `translate(${margin.left},${margin.top})`),
    gArea = svgArea.append("g").attr("transform", `translate(${margin.left},${margin.top})`);


var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    yScale = d3.scaleLinear().range([height, 0]),
    tooltip = d3.select("#tooltip");

// Custom colors based on your category
var colorMap = {
    'Diplomat': '#c1e7b6',  // green
    'Adventurer': '#f0d264', // yellow
    'Defender': '#8cbcf3', // blue
    'Analyst': '#d9bbf9'  // purple
};

// MBTI category mapping
var categoryMap = {
    'INTJ': 'Analyst', 'INTP': 'Analyst', 'ENTP': 'Analyst', 'ENTJ': 'Analyst',
    'ISTJ': 'Defender', 'ISFJ': 'Defender', 'ESTJ': 'Defender', 'ESFJ': 'Defender',
    'ISTP': 'Adventurer', 'ISFP': 'Adventurer', 'ESTP': 'Adventurer', 'ESFP': 'Adventurer',
    'INFJ': 'Diplomat', 'INFP': 'Diplomat', 'ENFJ': 'Diplomat', 'ENFP': 'Diplomat'
};
var mbtiColorMap = {
    'INTJ': '#4E79A7', // 蓝色
    'INTP': '#F28E2B', // 橙色
    'ENTP': '#E15759', // 红色
    'ENTJ': '#76B7B2', // 青色

    'ISTJ': '#4E79A7',
    'ISFJ': '#F28E2B',
    'ESTJ': '#E15759',
    'ESFJ': '#76B7B2',

    'ISTP': '#4E79A7',
    'ISFP': '#F28E2B',
    'ESTP': '#E15759',
    'ESFP': '#76B7B2',

    'INFJ': '#4E79A7',
    'INFP': '#F28E2B',
    'ENFJ': '#E15759',
    'ENFP': '#76B7B2'
};

// Descriptions sourced from https://www.16personalities.com/ but shortened
var mbtiDescriptions = {
    'INTJ': 'Imaginative and strategic thinkers, with a plan for everything.',
    'INTP': 'Innovative inventors with an unquenchable thirst for knowledge.',
    'ENTP': 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    'ENTJ': 'Bold, imaginative and strong-willed leaders, always finding a way - or making one.',

    'ISTJ': 'Responsible organizers, driven to create and enforce order.',
    'ISFJ': 'Practical and altruistic caretakers, eager to help.',
    'ESTJ': 'Dedicated and strong-willed individuals, always ready to defend their values.',
    'ESFJ': 'Social butterflies, always ready to help and to socialize.',

    'ISTP': 'Bold and practical experimenters, masters of all kinds of tools.',
    'ISFP': 'Flexible and charming artists, always ready to explore and experience something new.',
    'ESTP': 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
    'ESFP': 'Spontaneous, energetic and enthusiastic people - life is never boring around them.',

    'INFJ': 'Quiet and mystical, yet very inspiring and tireless idealists.',
    'INFP': 'Poetic, kind and altruistic people, always eager to help a good cause.',
    'ENFJ': 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    'ENFP': 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.'
};


d3.select(".mbti-table").selectAll("td.mbti-cell")
    .on("mouseover", function (event) {
        var mbti = d3.select(this).text();
        tooltip.html(`${mbtiDescriptions[mbti]}`)
            .style("opacity", 1)
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY - 28}px`);
    })
    .on("mouseout", () => tooltip.style("opacity", 0));




// Processing the CSV file
d3.csv("data/new_movie_1.csv").then(function (data) {
    // Transform data to sum counts by category for each year
    var keys = ["Diplomat", "Adventurer", "Defender", "Analyst"]; // Use category names as keys

    var groupedData = Array.from(d3.group(data, d => d.year), ([year, values]) => {
        var counts = values.reduce((acc, val) => {
            var category = categoryMap[val.MBTI];
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
        return { year, ...counts };
    });

    // Ensure data is sorted by year (in ascending order) and convert year to integer
    groupedData.sort((a, b) => parseFloat(a.year) - parseFloat(b.year));
    groupedData.forEach(d => d.year = Math.floor(+d.year));

    // Stack the data
    var stack = d3.stack()
        .keys(keys)
        .offset(d3.stackOffsetExpand) // normalize the stack
        (groupedData);

    // Set scales domains
    xScale.domain(groupedData.map(d => d.year));
    yScale.domain([0, 1]); // Stack is normalized to 1

    // Creating the bars
    var serie = gBar.selectAll(".serie")
        .data(stack)
        .enter().append("g")
        .attr("fill", d => colorMap[d.key])
        .attr("class", "serie"); // 给每个系列添加一个类，便于引用

    serie.selectAll("rect")
        .data(d => d)
        .enter().append("rect")
        .attr("x", (d, i) => xScale(d.data.year))
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .on("mouseover", function (event, d) {
            // 获取当前系列的键值（类别名称）
            var categoryKey = this.parentNode.__data__.key; // 通过父节点访问到系列的数据

            tooltip.html(`
            Category: ${categoryKey} 
            <br> 
            Count: ${d.data[categoryKey]} 
            <br>
            Percentage: ${((d[1] - d[0]) * 100).toFixed(2)}%
            `)
                .style("opacity", 1)
                .style("left", `${event.pageX}px`)
                .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => tooltip.style("opacity", 0))
        .on("click", function (event, d) {
            var categoryKey = d3.select(this.parentNode).datum().key;
            drawAreaChart(getDataForCategory(data, categoryKey), categoryKey);
            // Also hide the scatter plot
            d3.select(".scatter-plot").html("");
        });

    // Adding the X Axis
    // Adding the Y Axis
    gBar.append("g")
        .call(d3.axisLeft(yScale).tickFormat(d3.format(".0%")));

    gBar.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // Title
    gBar.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("MBTI Personality Types by Category over Time");

    // X Axis Label
    gBar.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," + (height + 50) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    // Y Axis Label
    gBar.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Percentage");

    // When a row in the mtbi table is clicked, show the area chart for that category
    d3.selectAll(".mbti-row").on("click", function (event) {
        var category = d3.select(this).select(".mbti-cell").text();
        drawAreaChart(getDataForCategory(data, category), category);
        // Also hide the scatter plot
        d3.select(".scatter-plot").html("");
    });
});

d3.csv("data/movies.csv").then(function (data) {
    // first, get list of genres
    var genres = Array.from(new Set(data.map(d => d.genre)));

    // Find all genres which appear less than 40 times
    const genreCounts = d3.rollup(data, v => v.length, d => d.genre);
    // remove genres with less than 40 movies from data
    data = data.filter(d => genreCounts.get(d.genre) >= 50);
    genres = Array.from(new Set(data.map(d => d.genre)));

    // remove Biography genre from genres array and data
    genres = genres.filter(genre => genre !== "Biography");
    data = data.filter(d => d.genre !== "Biography");

    // then, get list of years
    const years = Array.from(new Set(data.map(d => d.year)));
    // then create a an object with genre as key, and dictionary of year:undefinted as value
    const genreGross = genres.reduce((acc, genre) => {
        acc[genre] = years.reduce((acc, year) => {
            acc[year] = [];
            return acc;
        }, {});
        return acc;
    }, {});

    // then, populate the gross revenue for each genre
    data.forEach(d => {
        genreGross[d.genre][d.year].push(d.gross);
    });

    Object.keys(genreGross).forEach(genre => {
        Object.keys(genreGross[genre]).forEach(year => {
            const gross = genreGross[genre][year];
            if (gross.length > 0) {
                genreGross[genre][year] = +d3.mean(gross).toFixed(1);
            } else {
                genreGross[genre][year] = 0;
            }
        });
    });

    // Create line chart
    var xLineScale = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        yLineScale = d3.scaleLinear().range([height, 0]);

    var line = d3.line()
        .x(d => xLineScale(d.year))
        .y(d => yLineScale(d.gross));

    var lineData = genres.map(genre => {
        return {
            genre,
            values: years.map(year => {
                return {
                    year: +year,
                    gross: genreGross[genre][year]
                };
            })
        };
    });

    xLineScale.domain(years);
    yLineScale.domain([0, 4.5e8]);

    var lineSvg = d3.select(".line-chart");
    var lineG = lineSvg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    var lineColor = d3.scaleOrdinal(d3.schemeCategory10);

    // Draw the lines
    lineG.selectAll(".line")
        .data(lineData)
        .enter().append("path")
        .attr("fill", "none")
        .attr("stroke", d => lineColor(d.genre))
        .attr("stroke-width", 2.5)
        .attr("d", d => line(d.values));

    // Add the X Axis
    lineG.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xLineScale).tickFormat(d3.format("d"))) // 格式化为整数
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)"); // 将标签旋转-65度

    // Add the Y Axis
    lineG.append("g")
        .call(d3.axisLeft(yLineScale).ticks(5, "~s"));

    // Title
    lineG.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Average Movie Gross Revenue by Genre over Time");

    // X Axis Label
    lineG.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," + (height + 50) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    // Y Axis Label
    lineG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Gross Revenue (in USD)");

    // legend
    var legend = lineG.selectAll(".legend")
        .data(genres)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-700," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => lineColor(d));

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d);

});

// Function to get data for a specific category
function getDataForCategory(data, category) {
    const filteredData = data.filter(d => categoryMap[d.MBTI] === category);
    const countsByYear = d3.rollups(filteredData,
        v => d3.rollup(v, leaves => leaves.length, d => d.MBTI),
        d => d.year);
    let formattedData = [];
    countsByYear.forEach(([year, mbtis]) => {
        let row = { year: +year };
        mbtis.forEach((count, mbti) => row[mbti] = count);
        formattedData.push(row);
    });
    // add any missing keys from counts being 0
    const keys = Object.keys(mbtiColorMap);
    formattedData.forEach(d => {
        keys.forEach(key => {
            if (!d[key]) {
                d[key] = 0;
            }
        });
    });
    // sort by year
    formattedData.sort((a, b) => a.year - b.year);
    return formattedData;
}

function fetchDataFromDatabase(mbtiType) {
    return d3.csv("data/new_movie_1.csv").then(data => {
        const filteredData = data.filter(d => d.MBTI === mbtiType);
        return filteredData;
    });
}

function drawAreaChart(data, category) {
    // 清除之前的图表
    gArea.selectAll("*").remove();

    // 设置面积图的尺寸和比例尺
    var areaWidth = width,
        areaHeight = height;
    var xAreaScale = d3.scaleBand().range([0, areaWidth]).padding(0.1),
        yAreaScale = d3.scaleLinear().range([areaHeight, 0]);

    // 准备堆叠数据
    var keys = Object.keys(mbtiColorMap); // 假设你已经定义了 mbtiColorMap
    var stack = d3.stack().keys(keys);
    var stackedData = stack(data);

    // 定义面积生成器
    var area = d3.area()
        .x(d => xAreaScale(d.data.year))
        .y0(d => yAreaScale(d[0]))
        .y1(d => yAreaScale(d[1]));

    // 设置比例尺的域
    xAreaScale.domain(data.map(d => d.year));
    yAreaScale.domain([0, d3.max(stackedData, d => d3.max(d, d => d[1]))]);

    // 为每个MBTI类型绘制面积图层
    gArea.selectAll(".area")
        .data(stackedData)
        .enter().append("path")
        .attr("class", "area")
        .attr("fill", d => mbtiColorMap[d.key])
        .attr("d", area)
        .on("click", function (event, d) {
            var mbtiType = d.key;
            // 从数据库中获取相应的 MBTI 类别数据
            fetchDataFromDatabase(mbtiType).then(mbtiData => {
                // 绘制散点图
                drawScatterPlot(mbtiData);
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
        })
        .on("mouseover", function (event, d) {
            // 显示提示框，并更新提示框的内容
            tooltip.html(`MBTI: ${d.key} <br> Total: ${d3.sum(d, d => d[1] - d[0])}`)
                .style("opacity", 1)
                .style("left", (event.pageX + 10) + "px") // 在鼠标右侧显示
                .style("top", (event.pageY + 10) + "px"); // 在鼠标下方显示
        })
        .on("mousemove", function (event) {
            // 更新提示框的位置
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY + 10) + "px");
        })
        .on("mouseout", function () {
            // 隐藏提示框
            tooltip.style("opacity", 0);
        });


    xAreaScale.domain(data.map(d => d.year).sort((a, b) => a - b));
    gArea.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xAreaScale).tickFormat(d3.format("d"))) // 格式化为整数
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)"); // 将标签旋转-65度
    //
    gArea.append("g")
        .call(d3.axisLeft(yAreaScale).ticks(10, "~s"));

    // Title
    gArea.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text((category) + " Personality Types over Time");

    // X Axis Label
    gArea.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," + (height + 50) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    // Y Axis Label
    gArea.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Count");

    // legend in top left, only include MBTI types that are present in the data
    var legend = gArea.selectAll(".legend")
        .data(keys.filter(key => data.some(d => d[key] > 0)))
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-750," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => mbtiColorMap[d]);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d);
}


function drawScatterPlot(data) {
    // Calculate ROI and filter out invalid data
    var validData = data.map(function (d) {
        return {
            movie: d.movie,
            role: d.role,
            genre: d.genre,
            score: +d.score,
            ROI: +d.gross / +d.budget
        };
    }).filter(function (d) {
        return !isNaN(d.ROI) && isFinite(d.ROI) && d.ROI > 0;
    });

    // Remove Paranormal Activity and The Blair Witch Project (both are outliers and screw up the scale)
    validData = validData.filter(function (d) {
        return d.movie !== "Paranormal Activity" && d.movie !== "The Blair Witch Project";
    });

    // Define the scatter plot dimensions and margins
    var scatterWidth = 900 - margin.left - margin.right;
    var scatterHeight = 500 - margin.top - margin.bottom;

    // Define the scales
    var xScale = d3.scaleLinear()
        .domain(d3.extent(validData, function (d) { return d.score; }))
        .range([0, scatterWidth]);
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(validData, function (d) { return d.ROI; })])
        .range([scatterHeight, 0]);

    // Select the SVG element and clear previous content
    var svgScatter = d3.select(".scatter-plot").html("");

    // Append a 'g' element for the scatter plot
    var gScatter = svgScatter.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create a tooltip element
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    gScatter.selectAll("circle.normal")
        .data(validData.filter(function (d) { return d.score >= 5 && d.score <= 9 && d.ROI <= 50; }))
        .enter().append("circle")
        .attr("class", "normal")
        .attr("cx", function (d) { return xScale(d.score); })
        .attr("cy", function (d) { return yScale(d.ROI); })
        .attr("r", 5)
        .attr("fill", "steelblue")
        .on("mouseover", mouseoverFunction)
        .on("mouseout", mouseoutFunction);

    // 绘制图片，为得分小于5或大于9的数据点
    gScatter.selectAll("image.score")
        .data(validData.filter(function (d) { return d.score < 5 || d.score > 8.5; }))
        .enter().append("image")
        .attr("class", "score")
        .attr("xlink:href", function (d) {
            if (d.score < 5) {
                return "imgs/min.png"; // 使用适合的图片
            } else {
                return "imgs/max.png"; // 使用适合的图片
            }
        })
        .attr("x", function (d) { return xScale(d.score) - 15; })
        .attr("y", function (d) { return yScale(d.ROI) - 15; })
        .attr("width", 40)
        .attr("height", 40)
        .on("mouseover", mouseoverFunction)
        .on("mouseout", mouseoutFunction);

    // ROI > 50
    gScatter.selectAll("image.roi")
        .data(validData.filter(function (d) { return d.ROI > 50; }))
        .enter().append("image")
        .attr("class", "roi")
        .attr("xlink:href", "imgs/coin.png")
        .attr("x", function (d) { return xScale(d.score) - (d.ROI > 80 ? 20 : 10); })
        .attr("y", function (d) { return yScale(d.ROI) - (d.ROI > 80 ? 20 : 10); })
        .attr("width", function (d) {
            return d.ROI > 80 ? 50 : 30;
        })
        .attr("height", function (d) {
            return d.ROI > 80 ? 50 : 30;
        })
        .on("mouseover", mouseoverFunction)
        .on("mouseout", mouseoutFunction);



    function mouseoverFunction(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(
            "Movie: " + d.movie +
            "<br/>" +
            "Genre: " + d.genre +
            "<br/>" +
            "Role: " + d.role +
            "<br/>" +
            "ROI: " + d.ROI.toFixed(2) +
            "<br/>" +
            "Score: " + d.score)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

    // // CANNOT ACHIEVE -- The URL in the file 404
    // // ROI和Score前三名
    // var topROI = validData.slice().sort((a, b) => b.ROI - a.ROI).slice(0, 3);
    // var topScore = validData.slice().sort((a, b) => b.score - a.score).slice(0, 3);
    // function drawTopDataPoints(dataPoints, isROI) {
    //     dataPoints.forEach((d, i) => {
    //         // 计算图片位置
    //         let x = xScale(d.score) + 10; 
    //         let y = yScale(d.ROI) - (isROI ? (20 + i * 60) : 20); 

    //         // 绘制图片
    //         gScatter.append("image")
    //             .attr("xlink:href", d.img_url) 
    //             .attr("x", x)
    //             .attr("y", y)
    //             .attr("width", 50)
    //             .attr("height", 50);

    //         // 绘制电影名字
    //         gScatter.append("text")
    //             .attr("x", x + 55) 
    //             .attr("y", y + 25) // 文本位于图片中心的高度
    //             .text(d.movie)
    //             .attr("font-size", "12px")
    //             .attr("fill", "black");
    //     });
    // }
    // // 绘制ROI和Score前三名的数据点
    // drawTopDataPoints(topROI, true);
    // drawTopDataPoints(topScore, false);

    function mouseoutFunction() {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

    // Append X-axis
    gScatter.append("g")
        .attr("transform", "translate(0," + scatterHeight + ")")
        .call(d3.axisBottom(xScale));

    // Append Y-axis
    gScatter.append("g")
        .call(d3.axisLeft(yScale));

    // X-axis label
    gScatter.append("text")
        .attr("text-anchor", "end")
        .attr("x", scatterWidth / 2)
        .attr("y", scatterHeight + margin.top)
        .text("Score");


    // Y-axis label
    gScatter.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left / 2)
        .attr("x", 0 - scatterHeight / 3)
        .text("ROI (Gross/Budget)");

    // Add title
    svgScatter.append("text")
        .attr("class", "chart-title")
        .attr("x", (scatterWidth / 2))
        .attr("y", margin.top)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        // .style("text-decoration", "underline")
        .text(`Score vs. ROI for ${data[0].MBTI}`);

}