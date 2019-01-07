/* ------------------------------------------------------------------------------
*
*  # Sullexis CI Protoype Main APP
*
*  JS Fire Offs and Includes for Analytics App
*
*  Version: 1.0
*  Long Live the Fighters
*
* ---------------------------------------------------------------------------- */
$(function() {

    const PRODUCTION_SERVICE_URL = '@prod.api.root@'; //substituted during maven build
    const DEFAULT_SERVICE_URL = 'http://localhost:8080/';
    //following uses the DEFAULT_SERVICE_URL if used without maven processing (e.g., IDE testing)
    const SERVICE_URL = (PRODUCTION_SERVICE_URL.includes('prod.api.root')) ? DEFAULT_SERVICE_URL : PRODUCTION_SERVICE_URL;

    var WELL_OPERATORS_URL = SERVICE_URL + 'api/v1/wells/operators';
    var WELL_MULTILATERALS_URL = SERVICE_URL + 'api/v1/wells/multilaterals';

    // Date Range Slider for Analytic
    $("#ion-moment-basic").ionRangeSlider({
        grid: true,
		type: "double",
        min: +moment().subtract(2, "years").format("x"),
        max: +moment().format("x"),
        from: +moment(new Date("June 15, 2016")).format("x"), //+moment().subtract(18, "months").format("x"),
		to: +moment(new Date("December 15, 2016")).format("x"), //+moment().subtract(6, "months").format("x"),
        force_edges: true,
        prettify: function (num) {
            return moment(num, "x").format("ll");
        },
        onFinish : function() {
            timeSliderChanged();
        }
    });

	// Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: 'assets/js/plugins/visualization/echarts'
        }
    });


    // Configuration
    // ------------------------------
    var efficiency_columns;
    var basic_scatter;
    var category_scatter;
    var rose_diagram_visible;
    //var radar_basic;
    var funnel_multiple_overlay;
    var stacked_area;

    require(
        [
            'echarts',
            'echarts/theme/sullexis',
			'echarts/chart/pie',
            'echarts/chart/scatter',
			'echarts/chart/funnel',
			'echarts/chart/radar',
			'echarts/chart/bar',
            'echarts/chart/line'
        ],


        // Charts setup
        function (ec, sullexis) {


            // Initialize charts
            // ------------------------------
			efficiency_columns = ec.init(document.getElementById('basic_columns'), sullexis);
            basic_scatter = ec.init(document.getElementById('basic_scatter'), sullexis);
            category_scatter = ec.init(document.getElementById('category_scatter'), sullexis);
			rose_diagram_visible = ec.init(document.getElementById('rose_diagram_visible'), sullexis);
			//radar_basic = ec.init(document.getElementById('radar_basic'), sullexis);
			funnel_multiple_overlay = ec.init(document.getElementById('funnel_multiple_overlay'), sullexis);
			stacked_area = ec.init(document.getElementById('stacked_area'), sullexis);

			// Charts setup
            // ------------------------------

            //
            // Basic columns options
            //

            sidetrack_xAxis_data = ["Loading"];

            sidetrack_xAxis_options = {
                type: 'category',
                axisLabel: {
                    rotate:-90
                },
                data: sidetrack_xAxis_data
            };

            sidetrack_wellcount = {
                name: 'WellCount',
                type: 'bar',
                data: [ 0 ],
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            textStyle: {
                                fontWeight: 500
                            }
                        }
                    }
                },
                markLine: {
                    data: [{type: 'average', name: 'Average'}]
                }
            };

            sidetrack_multilaterals = {
                name: 'Multilaterals',
                type: 'bar',
                data: [ 0 ],
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            textStyle: {
                                fontWeight: 500
                            }
                        }
                    }
                },
                markLine: {
                    data: [{type: 'average', name: 'Average'}]
                }
            };

            sidetrack_efficiency = {
                name: 'Efficiency',
                type: 'bar',
                data: [ 0 ],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                fontWeight: 500
                            }
                        }
                    }
                },
                markLine: {
                    data: [{type: 'average', name: 'Average'}]
                }
            };


            sidetrack_columns_options = {

                // Setup grid
                grid: {
                    x: 40,
                    x2: 40,
                    y: 55,
                    y2: 150
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['WellCount', 'Multilaterals', 'Efficiency']
                },

				// Add data zoom
                dataZoom: {
                    show: true,
                    start: 00,
                    end: 30,
                    height: 40
                },

                // Enable drag recalculate
                calculable: false,

                // Horizontal axis
                xAxis: [ sidetrack_xAxis_options ],

                // Vertical axis
                yAxis: [{
                    type: 'value'
                }],

                // Add series
                series: [
                    sidetrack_wellcount,
                    sidetrack_multilaterals,
					sidetrack_efficiency
                ]
            };

			//
            // Basic scatter chart options
            //

            basic_scatter_options = {

                // Setup grid
                grid: {
                    x: 50,
                    x2: 45,
                    y: 35,
                    y2: 25
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    showDelay: 0,
                    formatter: function (params) {
                        if (params.value.length > 1) {
                            return params.seriesName + ':<br/>'
                            + params.value[0] + 'Bbl '
                            + params.value[1] + 'Ft ';
                        }
                        else {
                            return params.seriesName + ':<br/>'
                            + params.name + ': '
                            + params.value + 'Ft ';
                        }
                    },
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    }
                },

                // Add legend
                legend: {
                    data: ['Oasis','Competitor']
                },

                // Horizontal axis
                xAxis: [{
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} Bbl'
                    }
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} Ft'
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'Oasis',
                        type: 'scatter',
                        symbolSize: 5,
                        data: [
                            [161555.2, 5155.6], [167555.5, 5955.0], [159555.5, 4955.2], [157555.0, 6355.0], [155555.8, 5355.6],
                            [170555.0, 5955.0], [159555.1, 4755.6], [166555.0, 6955.8], [176555.2, 6655.8], [160555.2, 7555.2],
                            [172555.5, 5555.2], [170555.9, 5455.2], [172555.9, 6255.5], [153555.4, 4255.0], [160555.0, 5055.0],
                            [147555.2, 4955.8], [168555.2, 4955.2], [175555.0, 7355.2], [157555.0, 4755.8], [167555.6, 6855.8],
                            [159555.5, 5055.6], [175555.0, 8255.5], [166555.8, 5755.2], [176555.5, 8755.8], [170555.2, 7255.8],
                            [174555.0, 5455.5], [173555.0, 5955.8], [179555.9, 6755.3], [170555.5, 6755.8], [160555.0, 4755.0],
                            [154555.4, 4655.2], [162555.0, 5555.0], [176555.5, 8355.0], [160555.0, 5455.4], [152555.0, 4555.8],
                            [162555.1, 5355.6], [170555.0, 7355.2], [160555.2, 5255.1], [161555.3, 6755.9], [166555.4, 5655.6],
                            [168555.9, 6255.3], [163555.8, 5855.5], [167555.6, 5455.5], [160555.0, 5055.2], [161555.3, 6055.3],
                            [167555.6, 5855.3], [165555.1, 5655.2], [160555.0, 5055.2], [170555.0, 7255.9], [157555.5, 5955.8],
                            [167555.6, 6155.0], [160555.7, 6955.1], [163555.2, 5555.9], [152555.4, 4655.5], [157555.5, 5455.3],
                            [168555.3, 5455.8], [180555.3, 6055.7], [165555.5, 6055.0], [165555.0, 6255.0], [164555.5, 6055.3],
                            [156555.0, 5255.7], [160555.0, 7455.3], [163555.0, 6255.0], [165555.7, 7355.1], [161555.0, 8055.0]

                        ],
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Average'
                            }]
                        }
                    },
                    {
                        name: 'Competitor',
                        type: 'scatter',
                        symbolSize: 5,
                        data: [
                            [174555.0, 6555.6], [175555.3, 7155.8], [193555.5, 8055.7], [186555.5, 7255.6], [187555.2, 7855.8],
                            [181555.5, 7455.8], [184555.0, 8655.4], [184555.5, 7855.4], [175555.0, 6255.0], [184555.0, 8155.6],
                            [180555.0, 7655.6], [177555.8, 8355.6], [192555.0, 9055.0], [176555.0, 7455.6], [174555.0, 7155.0],
                            [184555.0, 7955.6], [192555.7, 9355.8], [171555.5, 7055.0], [173555.0, 7255.4], [176555.0, 8555.9],
                            [176555.0, 7855.8], [180555.5, 7755.8], [172555.7, 6655.2], [176555.0, 8655.4], [173555.5, 8155.8],
                            [178555.0, 8955.6], [180555.3, 8255.8], [180555.3, 7655.4], [164555.5, 6355.2], [173555.0, 6055.9],
                            [183555.5, 7455.8], [175555.5, 7055.0], [188555.0, 7255.4], [189555.2, 8455.1], [172555.8, 6955.1],
                            [170555.0, 5955.5], [182555.0, 6755.2], [170555.0, 6155.3], [177555.8, 6855.6], [184555.2, 8055.1],
                            [186555.7, 8755.8], [171555.4, 8455.7], [172555.7, 7355.4], [175555.3, 7255.1], [180555.3, 8255.6],
                            [182555.9, 8855.7], [188555.0, 8455.1], [177555.2, 9455.1], [172555.1, 7455.9], [167555.0, 5955.1],
                            [169555.5, 7555.6], [174555.0, 8655.2], [172555.7, 7555.3], [182555.2, 8755.1], [164555.1, 5555.2],
                            [163555.0, 5755.0], [171555.5, 6155.4], [184555.2, 7655.8], [174555.0, 8655.8], [174555.0, 7255.2],
                            [177555.0, 7155.6], [186555.0, 8455.8], [167555.0, 6855.2], [171555.8, 6655.1], [182555.0, 7255.0]
                        ],
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Average'
                            }]
                        }
                    }
                ]
            };

			//
            // Category scatter options
            //

            category_scatter_options = {

                // Setup grid
                grid: {
                    x: 35,
                    x2: 30,
                    y: 70,
                    y2: 90
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    }
                },

                // Add data zoom
                dataZoom: {
                    show: true,
                    start: 40,
                    end: 60,
                    height: 40
                },

                // Add legend
                legend: {
                    data: ['Perameter1', 'Perameter2']
                },

                // Display data range
                dataRange: {
                    min: 0,
                    max: 100,
                    orient: 'horizontal',
                    y: 35,
                    x: 'center',
                    splitNumber: 5
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: function () {
                        var list = [];
                        var len = 0;
                        while (len++ < 300) {
                            list.push(len);
                        }
                        return list;
                    }()
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value'
                }],

                // Add series
                series: [
                    {
                        name: 'Perameter1',
                        type: 'scatter',
                        tooltip: {
                            trigger: 'item',
                            formatter: function (params) {
                                return params.seriesName + ' （'  + 'Category' + params.value[0] + '）<br/>'
                                + params.value[1] + ', '
                                + params.value[2];
                            },
                            axisPointer: {
                                show: true
                            }
                        },
                        symbolSize: function (value) {
                            return Math.round(value[2]/10);
                        },
                        data: (function () {
                            var d = [];
                            var len = 0;
                            var value;
                            while (len++ < 300) {
                                d.push([
                                    len,
                                    (Math.random()*30).toFixed(2) - 0,
                                    (Math.random()*100).toFixed(2) - 0
                                ]);
                            }
                            return d;
                        })()
                    },

                    {
                        name: 'Perameter2',
                        type: 'scatter',
                        tooltip: {
                            trigger: 'item',
                            formatter: function (params) {
                                return params.seriesName + ' （'  + 'Category' + params.value[0] + '）<br/>'
                                + params.value[1] + ', '
                                + params.value[2];
                            },
                            axisPointer:{
                                show: true
                            }
                        },
                        symbolSize: function (value) {
                            return Math.round(value[2]/10);
                        },
                        data: (function () {
                            var d = [];
                            var len = 0;
                            var value;
                            while (len++ < 300) {
                                d.push([
                                    len,
                                    (Math.random()*30).toFixed(2) - 0,
                                    (Math.random()*100).toFixed(2) - 0
                                ]);
                            }
                            return d;
                        })()
                    }
                ]
            };


            //
            // Nightingale roses with visible labels options
            //

            rose_diagram_visible_options = {

                // Add title
                title: {
                    text: 'Overall Well Production',
                    subtext: 'Fiscal Year 2016',
                    x: 'center'
                },

                // Add tooltip
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: +{c}$ ({d}%)"
                },

                // Add legend
                legend: {
                    x: 'left',
                    y: 'top',
                    orient: 'vertical',
                    data: ['January','February','March','April','May','June','July','August','September','October','November','December']
                },

                // Display toolbox
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false,
                            title: 'View data',
                            lang: ['View chart data', 'Close', 'Update']
                        },
                        magicType: {
                            show: true,
                            title: {
                                pie: 'Switch to pies',
                                funnel: 'Switch to funnel',
                            },
                            type: ['pie', 'funnel']
                        },
                        restore: {
                            show: true,
                            title: 'Restore'
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Same as image',
                            lang: ['Save']
                        }
                    }
                },

                // Enable drag recalculate
                calculable: true,

                // Add series
                series: [
                    {
                        name: 'Increase over 2015',
                        type: 'pie',
                        radius: ['15%', '73%'],
                        center: ['50%', '57%'],
                        roseType: 'area',

                        // Funnel
                        width: '40%',
                        height: '78%',
                        x: '30%',
                        y: '17.5%',
                        max: 450,
                        sort: 'ascending',

                        data: [
                            {value: 440, name: 'January'},
                            {value: 260, name: 'February'},
                            {value: 350, name: 'March'},
                            {value: 250, name: 'April'},
                            {value: 210, name: 'May'},
                            {value: 350, name: 'June'},
                            {value: 300, name: 'July'},
                            {value: 430, name: 'August'},
                            {value: 400, name: 'September'},
                            {value: 450, name: 'October'},
                            {value: 330, name: 'November'},
                            {value: 200, name: 'December'}
                        ]
                    }
                ]
            };

			//
            // Drilling Direction radar chart
            //

//            radar_basic_options = {
//
//                // Add title
//                title: {
//                    text: 'Lateral Drilling Direction',
//                    subtext: 'NDIC Source Data',
//                    x: 'right'
//                },
//
//                // Add tooltip
//                tooltip: {
//                    trigger: 'axis'
//                },
//
//                // Add legend
//                legend: {
//                    orient: 'vertical',
//                    x: 'left',
//                    data: ['Oasis Lateral Direction','Competitor Lateral Direction']
//                },
//
//                // Setup polar coordinates
//                polar: [{
//                    radius: '80%',
//                    indicator: [
//                        {text: '360 (N)', max: 25000},
//                        {text: '315 (NW)', max: 25000},
//                        {text: '225 (SW)', max: 25000},
//                        {text: '180 (S)', max: 25000},
//                        {text: '135 (SE)', max: 25000},
//                        {text: '45 (NE)', max: 25000}
//                    ]
//                }],
//
//                // Enable drag recalculate
//                calculable: true,
//
//                // Add series
//                series: [{
//                    name: 'Oasis vs. Competitor Laterial Direction',
//                    type: 'radar',
//                    data: [
//                        {
//                            value: [1000, 1000, 5000, 13000, 2200, 1800],
//                            name: 'Oasis Lateral Direction'
//                        },
//                        {
//                            value: [1000, 1000, 1000, 2000, 3000, 22500],
//                            name: 'Competitor Lateral Direction'
//                        }
//                    ]
//                }]
//            };

			//
            // Multiple funnels (overlay) options
            //

            funnel_multiple_overlay_options = {

                // Add colors
                color: [
                    'rgba(45, 184, 32, 0.5)',
                    'rgba(0, 74, 111, 0.5)',
                    'rgba(111, 0, 42, 0.5)',
                    'rgba(26, 111, 0, 0.5)',
                    'rgba(55, 200, 100, 0.5)'
                ],

                // Add title
                title: {
                    text: 'Expected vs Actual Revenue',
                    subtext: 'By Well Type',
                    x: 'center'
                },

                // Add tooltip
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}%"
                },

                // Display toolbox
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    y: 75,
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false,
                            title: 'View data',
                            lang: ['View chart data', 'Close', 'Update']
                        },
                        restore: {
                            show: true,
                            title: 'Restore'
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Same as image',
                            lang: ['Save']
                        }
                    }
                },

                // Add legend
                legend: {
                    data: ['DIR','HOR','VER'],
                    orient: 'vertical',
                    x: 'left',
                    y: 75
                },

                // Enable drag recalculate
                calculable: true,

                // Add series
                series: [
                    {
                        name: 'Expected',
                        type: 'funnel',
                        y: '17.5%',
                        x: '25%',
                        x2: '25%',
                        width: '50%',
                        height: '80%',
                        itemStyle: {
                            normal: {
                                label: {
                                    formatter: '{b}'
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    position: 'inside',
                                    formatter: '{b}: {c}%'
                                }
                            }
                        },
                        data: [
                            {value: 45, name: 'DIR'},
                            {value: 60, name: 'HOR'},
                            {value: 70, name: 'VER'}
                        ]
                    },
                    {
                        name: 'Actual',
                        type: 'funnel',
                        y: '17.5%',
                        x: '25%',
                        x2: '25%',
                        width: '50%',
                        height: '80%',
                        maxSize: '80%',
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 2,
                                label: {
                                    position: 'inside',
                                    formatter: '{c}%',
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            emphasis: {
                                label: {
                                    position: 'inside',
                                    formatter: '{b}: {c}%'
                                }
                            }
                        },
                        data: [
                            {value: 30, name: 'DIR'},
                            {value: 48, name: 'HOR'},
                            {value: 66, name: 'VER'}
                        ]
                    }
                ]
            };

			//
            // Stacked area options
            //

            stacked_area_options = {

                // Setup grid
                grid: {
                    x: 40,
                    x2: 20,
                    y: 35,
                    y2: 25
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['DIR', 'HOR', 'VER']
                },

                // Enable drag recalculate
                calculable: true,

                // Add horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['0-1000', '1001-2000', '2001-3000', '3001-4000', '4001-5000', '5001-6000', '6001-10000']
                }],

                // Add vertical axis
                yAxis: [{
                    type: 'value'
                }],

                // Add series
                series: [
                    {
                        name: 'DIR',
                        type: 'line',
                        stack: 'Total',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [120, 132, 101, 134, 490, 230, 210]
                    },
                    {
                        name: 'HOR',
                        type: 'line',
                        stack: 'Total',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [150, 1232, 901, 154, 190, 330, 810]
                    },
                    {
                        name: 'VER',
                        type: 'line',
                        stack: 'Total',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [320, 1332, 1801, 1334, 590, 830, 1220]
                    }
                ]
            };


            // Apply options
            // ------------------------------
			efficiency_columns.setOption(sidetrack_columns_options);
            basic_scatter.setOption(basic_scatter_options);
            category_scatter.setOption(category_scatter_options);
			rose_diagram_visible.setOption(rose_diagram_visible_options);
			//radar_basic.setOption(radar_basic_options);
			funnel_multiple_overlay.setOption(funnel_multiple_overlay_options);
			stacked_area.setOption(stacked_area_options);


            // Resize charts
            // ------------------------------

            window.onresize = function () {
                setTimeout(function (){
                    efficiency_columns.resize();
					basic_scatter.resize();
					category_scatter.resize();
					rose_diagram_visible.resize();
					//radar_basic.resize();
					funnel_multiple_overlay.resize();
					stacked_area.resize();
                }, 200);
            }
        }
    );

	// Google Maps Integration

	var map, heatmap;

	function getMap() {
        if (map) return map;
        map = new google.maps.Map(document.getElementById('multilateral-map'), {
            zoom: 8,
            center: {lat: 47.97, lng: -103.14},
            mapTypeId: 'terrain'
        });
        return map;
    }

    // Load maps
    //google.maps.event.addDomListener(window, 'load', initialize);

    //HEAT MAP QUERIES

    function createHeatMapPoints(wellHeaders) {
	    //var mymap = getMap();
        if (heatmap) heatmap.setMap(null);
        var mydata = wellHeaders.map(function(header) {
            var lat = header.latitude;
            var lon = header.longitude;
            return new google.maps.LatLng(+lat, +lon);
        });
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: mydata,
            radius: 20,
            dissipating: true,
            map: getMap()
        });
        //console.log(JSON.stringify(mydata));
    };

    buildWellsQueryObject = function() {
        var startDate = $("#ion-moment-basic").data("ionRangeSlider").result.from;
        var endDate = $("#ion-moment-basic").data("ionRangeSlider").result.to;

        var queryObject = {
            "multilateral": {
                "selectedMinValue": true,
                "selectedMaxValue": true,
                "enabled": true
            },
            "completionDate" : {
                "selectedMinValue": new Date(startDate).toUTCString(),
                "selectedMaxValue": new Date(endDate).toUTCString(),
                "enabled": true
            }
        };

        // console.log(JSON.stringify(queryObject));
        return JSON.stringify(queryObject);

    };

    searchWells = function(queryCriteria){
        $.ajax({
            url: WELL_MULTILATERALS_URL,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            data: queryCriteria,
            success: function (jsonData) {
                //Use the data to update the map
                //console.log(JSON.stringify(jsonData));
                // console.log(jsonData.count);
                // if (jsonData.wellHeaders.length) console.log("First header: " + JSON.stringify(jsonData.wellHeaders[0]));

                createHeatMapPoints(jsonData.files);
            },
            error: function (data) {
                console.log(JSON.stringify(data,null,4));
            }
        });
    };


    //OPERATOR QUERIES

    buildOperatorQueryObject = function() {
        var startDate = $("#ion-moment-basic").data("ionRangeSlider").result.from;
        var endDate = $("#ion-moment-basic").data("ionRangeSlider").result.to;

        var queryObject = {
            "wellCount": {
                "selectedMinValue": 10,
                "selectedMaxValue": 9999999,
                "enabled": true
            }
        };

        var dateSelectionData = {
            "selectedMinValue" : new Date(startDate).toUTCString(),
            "selectedMaxValue" : new Date(endDate).toUTCString(),
            "enabled" : true
        };
        queryObject["completionDate"] = dateSelectionData;

        // console.log(JSON.stringify(queryObject));
        return JSON.stringify(queryObject);

    };

    //onChange method to bind controls which should initiate refresh of operators & wells
    function timeSliderChanged(data) {
        var queryObj = buildOperatorQueryObject();
        searchOperators(queryObj);

        queryObj = buildWellsQueryObject();
        searchWells(queryObj);
    };

    //ensure queryCriteria already stringified
    searchOperators = function(queryCriteria) {
        //console.log("Sending: " + queryCriteria);

        $.ajax({
            url: WELL_OPERATORS_URL,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            data: queryCriteria,
            success: function (jsonData) {
                //populate the operator efficiency data to the bar chart
                //console.log("Response: " + JSON.stringify(jsonData, null, 4));
                sidetrack_xAxis_data = jsonData.files.map(function (oper) { return oper.current_operator_name; });
                sidetrack_xAxis_options.data = sidetrack_xAxis_data;
                sidetrack_columns_options.xAxis = [ sidetrack_xAxis_options ];
                sidetrack_wellcount.data = jsonData.files.map(function(oper) { return Number(oper.well_count); });
                sidetrack_multilaterals.data = jsonData.files.map(function(oper) { return Number(oper.multilaterals); });
                sidetrack_efficiency.data = jsonData.files.map(function(oper) { return Number(oper.efficiency).toPrecision(2); });
                sidetrack_columns_options.series = [sidetrack_wellcount, sidetrack_multilaterals, sidetrack_efficiency];
                efficiency_columns.setOption(sidetrack_columns_options, true); //true for notMerge
            },
            error: function (data) {
                console.log(JSON.stringify(data, null, 4));
                alert("Error " + data);
            }
        });
    };

    // PAGE READY

    $(document).ready(function () {
        timeSliderChanged();
    });

});
