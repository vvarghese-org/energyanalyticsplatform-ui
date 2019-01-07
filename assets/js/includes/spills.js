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

    var WELL_OPERATORS_URL = SERVICE_URL + 'api/v1/spills/operators';
    var WELL_INCIDENTS_URL = SERVICE_URL + 'api/v1/spills/incidents';

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: 'assets/js/plugins/visualization/echarts'
        }
    });


    // Configuration
    // ------------------------------
    /* ALL CHARTS */
    var bar_all_incidents;
    var bar_all_volumes;
    var bar_all_incidents_by_production;
    var scatter_all_incidents_by_production;
    var bar_all_spillvol_by_production;
    var scatter_all_spillvol_by_production;
    var bar_all_incidents_by_wellcount;
    var scatter_all_incidents_by_wellcount;
    var bar_all_spillvol_by_wellcount;
    var scatter_all_spillvol_by_wellcount;
    /* OIL CHARTS */
    var bar_oil_incidents;
    var bar_oil_volumes;
    var bar_oil_incidents_by_production;
    var scatter_oil_incidents_by_production;
    var bar_oil_spillvol_by_production;
    var scatter_oil_spillvol_by_production;
    var bar_oil_incidents_by_wellcount;
    var scatter_oil_incidents_by_wellcount;
    var bar_oil_spillvol_by_wellcount;
    var scatter_oil_spillvol_by_wellcount;
    /* SALTWATER CHARTS */
    var bar_saltwater_incidents;
    var bar_saltwater_volumes;
    var bar_saltwater_incidents_by_production;
    var scatter_saltwater_incidents_by_production;
    var bar_saltwater_spillvol_by_production;
    var scatter_saltwater_spillvol_by_production;
    var bar_saltwater_incidents_by_wellcount;
    var scatter_saltwater_incidents_by_wellcount;
    var bar_saltwater_spillvol_by_wellcount;
    var scatter_saltwater_spillvol_by_wellcount;
    /* OTHER CHARTS */
    var bar_other_incidents;
    var bar_other_volumes;
    var bar_other_incidents_by_production;
    var scatter_other_incidents_by_production;
    var bar_other_spillvol_by_production;
    var scatter_other_spillvol_by_production;
    var bar_other_incidents_by_wellcount;
    var scatter_other_incidents_by_wellcount;
    var bar_other_spillvol_by_wellcount;
    var scatter_other_spillvol_by_wellcount;

    require(
        [
            'echarts',
            'echarts/theme/sullexis',
            'echarts/chart/scatter',
			'echarts/chart/bar'
        ],


        // Charts setup
        function (ec, sullexis) {


            // Initialize charts
            // ------------------------------
            /* ALL CHARTS */
            bar_all_incidents = ec.init(document.getElementById('bar_all_incidents'), sullexis);
            bar_all_volumes = ec.init(document.getElementById('bar_all_volumes'), sullexis);
            bar_all_incidents_by_production = ec.init(document.getElementById('bar_all_incidents_by_production'), sullexis);
            scatter_all_incidents_by_production = ec.init(document.getElementById('scatter_all_incidents_by_production'), sullexis);
            bar_all_spillvol_by_production = ec.init(document.getElementById('bar_all_spillvol_by_production'), sullexis);
            scatter_all_spillvol_by_production = ec.init(document.getElementById('scatter_all_spillvol_by_production'), sullexis);
            bar_all_incidents_by_wellcount = ec.init(document.getElementById('bar_all_incidents_by_wellcount'), sullexis);
            scatter_all_incidents_by_wellcount = ec.init(document.getElementById('scatter_all_incidents_by_wellcount'), sullexis);
            bar_all_spillvol_by_wellcount = ec.init(document.getElementById('bar_all_spillvol_by_wellcount'), sullexis);
            scatter_all_spillvol_by_wellcount = ec.init(document.getElementById('scatter_all_spillvol_by_wellcount'), sullexis);
            /* OIL CHARTS */
            bar_oil_incidents = ec.init(document.getElementById('bar_oil_incidents'), sullexis);
            bar_oil_volumes = ec.init(document.getElementById('bar_oil_volumes'), sullexis);
            bar_oil_incidents_by_production = ec.init(document.getElementById('bar_oil_incidents_by_production'), sullexis);
            scatter_oil_incidents_by_production = ec.init(document.getElementById('scatter_oil_incidents_by_production'), sullexis);
            bar_oil_spillvol_by_production = ec.init(document.getElementById('bar_oil_spillvol_by_production'), sullexis);
            scatter_oil_spillvol_by_production = ec.init(document.getElementById('scatter_oil_spillvol_by_production'), sullexis);
            bar_oil_incidents_by_wellcount = ec.init(document.getElementById('bar_oil_incidents_by_wellcount'), sullexis);
            scatter_oil_incidents_by_wellcount = ec.init(document.getElementById('scatter_oil_incidents_by_wellcount'), sullexis);
            bar_oil_spillvol_by_wellcount = ec.init(document.getElementById('bar_oil_spillvol_by_wellcount'), sullexis);
            scatter_oil_spillvol_by_wellcount = ec.init(document.getElementById('scatter_oil_spillvol_by_wellcount'), sullexis);
            /* SALTWATER CHARTS */
            bar_saltwater_incidents = ec.init(document.getElementById('bar_saltwater_incidents'), sullexis);
            bar_saltwater_volumes = ec.init(document.getElementById('bar_saltwater_volumes'), sullexis);
            bar_saltwater_incidents_by_production = ec.init(document.getElementById('bar_saltwater_incidents_by_production'), sullexis);
            scatter_saltwater_incidents_by_production = ec.init(document.getElementById('scatter_saltwater_incidents_by_production'), sullexis);
            bar_saltwater_spillvol_by_production = ec.init(document.getElementById('bar_saltwater_spillvol_by_production'), sullexis);
            scatter_saltwater_spillvol_by_production = ec.init(document.getElementById('scatter_saltwater_spillvol_by_production'), sullexis);
            bar_saltwater_incidents_by_wellcount = ec.init(document.getElementById('bar_saltwater_incidents_by_wellcount'), sullexis);
            scatter_saltwater_incidents_by_wellcount = ec.init(document.getElementById('scatter_saltwater_incidents_by_wellcount'), sullexis);
            bar_saltwater_spillvol_by_wellcount = ec.init(document.getElementById('bar_saltwater_spillvol_by_wellcount'), sullexis);
            scatter_saltwater_spillvol_by_wellcount = ec.init(document.getElementById('scatter_saltwater_spillvol_by_wellcount'), sullexis);
            /* OTHER CHARTS */
            bar_other_incidents = ec.init(document.getElementById('bar_other_incidents'), sullexis);
            bar_other_volumes = ec.init(document.getElementById('bar_other_volumes'), sullexis);
            bar_other_incidents_by_production = ec.init(document.getElementById('bar_other_incidents_by_production'), sullexis);
            scatter_other_incidents_by_production = ec.init(document.getElementById('scatter_other_incidents_by_production'), sullexis);
            bar_other_spillvol_by_production = ec.init(document.getElementById('bar_other_spillvol_by_production'), sullexis);
            scatter_other_spillvol_by_production = ec.init(document.getElementById('scatter_other_spillvol_by_production'), sullexis);
            bar_other_incidents_by_wellcount = ec.init(document.getElementById('bar_other_incidents_by_wellcount'), sullexis);
            scatter_other_incidents_by_wellcount = ec.init(document.getElementById('scatter_other_incidents_by_wellcount'), sullexis);
            bar_other_spillvol_by_wellcount = ec.init(document.getElementById('bar_other_spillvol_by_wellcount'), sullexis);
            scatter_other_spillvol_by_wellcount = ec.init(document.getElementById('scatter_other_spillvol_by_wellcount'), sullexis);

			// Charts setup
            // ------------------------------

            /*
            CHART DATA
             */

            all_incidentsTotal_keys = { data: ["Loading"] };
            all_incidentsTotal = {
                name: 'All Incidents',
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

            oil_incidentsTotal_keys = { data: ["Loading"] };
            oil_incidentsTotal = {
                name: 'Oil Incidents',
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

            saltwater_incidentsTotal_keys = { data: ["Loading"] };
            saltwater_incidentsTotal = {
                name: 'Saltwater Incidents',
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

            other_incidentsTotal_keys = { data: ["Loading"] };
            other_incidentsTotal = {
                name: 'Other Incidents',
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

            all_spillVolumeTotal_keys = { data: ["Loading"] };
            all_spillVolumeTotal = {
                name: 'All Volume Spilled',
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

            oil_spillVolumeTotal_keys = { data: ["Loading"] };
            oil_spillVolumeTotal = {
                name: 'Oil Volume Spilled',
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

            saltwater_spillVolumeTotal_keys = { data: ["Loading"] };
            saltwater_spillVolumeTotal = {
                name: 'Saltwater Volume Spilled',
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

            other_spillVolumeTotal_keys = { data: ["Loading"] };
            other_spillVolumeTotal = {
                name: 'Other Volume Spilled',
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


            all_incidentsPerWell_keys = { data: ["Loading"] };
            all_incidentsPerWell = {
                name: 'All Incidents Per Well',
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

            oil_incidentsPerWell_keys = { data: ["Loading"] };
            oil_incidentsPerWell = {
                name: 'Oil Incidents Per Well',
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

            saltwater_incidentsPerWell_keys = { data: ["Loading"] };
            saltwater_incidentsPerWell = {
                name: 'Saltwater Incidents Per Well',
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

            other_incidentsPerWell_keys = { data: ["Loading"] };
            other_incidentsPerWell = {
                name: 'Other Incidents Per Well',
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

            all_incidentsPerProdVol_keys = { data: ["Loading"] };
            all_incidentsPerProdVol = {
                name: 'Avg MBbls Produced per Incident',
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
                }
            };

            oil_incidentsPerProdVol_keys = { data: ["Loading"] };
            oil_incidentsPerProdVol = {
                name: 'MBbls Production Volume per Oil Incident',
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
                }
            };

            saltwater_incidentsPerSaltwaterVol_keys = { data: ["Loading"] };
            saltwater_incidentsPerSaltwaterVol = {
                name: 'MBbls Saltwater Produced per Saltwater Incident',
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
                }
            };

            other_incidentsPerProdVol_keys = { data: ["Loading"] };
            other_incidentsPerProdVol = {
                name: 'MBbls Produced per Other Incident',
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
                }
            };

            all_spillVolumePerProdVol_keys = { data: ["Loading"] };
            all_spillVolumePerProdVol = {
                name: 'Produced Bbls per Spilled Bbl',
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
                }
            };

            oil_spillVolumePerProdVol_keys = { data: ["Loading"] };
            oil_spillVolumePerProdVol = {
                name: 'Produced Bbls per Spilled Oil Bbl',
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
                }
            };

            saltwater_spillVolumePerSaltwaterVol_keys = { data: ["Loading"] };
            saltwater_spillVolumePerSaltwaterVol = {
                name: 'Produced Saltwater Bbls per Spilled Saltwater Bbl',
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
                }
            };

            other_spillVolumePerProdVol_keys = { data: ["Loading"] };
            other_spillVolumePerProdVol = {
                name: 'Produced Bbls per Other Spilled Bbl',
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
                }
            };

            all_spillVolumePerWell_keys = { data: ["Loading"] };
            all_spillVolumePerWell = {
                name: 'All Spill Volume Per Well',
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

            oil_spillVolumePerWell_keys = { data: ["Loading"] };
            oil_spillVolumePerWell = {
                name: 'Oil Spill Volume Per Well',
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

            saltwater_spillVolumePerWell_keys = { data: ["Loading"] };
            saltwater_spillVolumePerWell = {
                name: 'Saltwater Spill Volume Per Well',
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

            other_spillVolumePerWell_keys = { data: ["Loading"] };
            other_spillVolumePerWell = {
                name: 'Other Spill Volume Per Well',
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


            /*
            CHART OPTIONS
             */

            barchart_xAxis_options = {
                type: 'category',
                axisLabel: {
                    rotate:-90
                }
            };

            /* 'ALL' OPTIONS */

            barOptions_all_incidents = {
                legend: {data: ['Total Incidents']}, // Add legend
                series: [all_incidentsTotal], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(all_incidentsTotal_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_all_volumes = {
                legend: {data: ['Total Spill Volumes']}, // Add legend
                series: [all_spillVolumeTotal], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(all_spillVolumeTotal_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_all_incidents_by_production = {
                legend: {data: ['MBbls Production per Incident']}, // Add legend
                series: [all_incidentsPerProdVol], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(all_incidentsPerProdVol_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_all_spillvol_by_production = {
                legend: {data: ['Produced Bbls per Total Spilled Bbls']}, // Add legend
                series: [all_spillVolumePerProdVol], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(all_spillVolumePerProdVol_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_all_incidents_by_wellcount = {
                legend: {data: ['Total Spill Incidents by Well Count']}, // Add legend
                series: [all_incidentsPerWell], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(all_incidentsPerWell_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_all_spillvol_by_wellcount = {
                legend: {data: ['Total Spill Vol by Well Count']}, // Add legend
                series: [all_spillVolumePerWell], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(all_spillVolumePerWell_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            /* OIL OPTIONS */

            barOptions_oil_incidents = {
                legend: {data: ['Oil Incidents']}, // Add legend
                series: [oil_incidentsTotal], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(oil_incidentsTotal_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_oil_volumes = {
                legend: {data: ['Oil Spill Volumes']}, // Add legend
                series: [oil_spillVolumeTotal], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(oil_spillVolumeTotal_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_oil_incidents_by_production = {
                legend: {data: ['MBbls Production per Oil Incident']}, // Add legend
                series: [oil_incidentsPerProdVol], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(oil_incidentsPerProdVol_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_oil_spillvol_by_production = {
                legend: {data: ['Produced Bbls per Spilled Oil Bbl']}, // Add legend
                series: [oil_spillVolumePerProdVol], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(oil_spillVolumePerProdVol_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_oil_incidents_by_wellcount = {
                legend: {data: ['Oil Spill Incidents by Well Count']}, // Add legend
                series: [oil_incidentsPerWell], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(oil_incidentsPerWell_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_oil_spillvol_by_wellcount = {
                legend: {data: ['Oil Spill Vol by Well Count']}, // Add legend
                series: [oil_spillVolumePerWell], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(oil_spillVolumePerWell_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            /* SALTWATER OPTIONS */

            barOptions_saltwater_incidents = {
                legend: {data: ['Saltwater Incidents']}, // Add legend
                series: [saltwater_incidentsTotal], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(saltwater_incidentsTotal_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_saltwater_volumes = {
                legend: {data: ['Saltwater Spill Volumes']}, // Add legend
                series: [saltwater_spillVolumeTotal], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(saltwater_spillVolumeTotal_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_saltwater_incidents_by_production = {
                legend: {data: ['MBbls Saltwater Produced per Saltwater Incident']}, // Add legend
                series: [saltwater_incidentsPerSaltwaterVol], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(saltwater_incidentsPerSaltwaterVol_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_saltwater_spillvol_by_production = {
                legend: {data: ['Saltwater Bbls Produced per Bbl Spilled']}, // Add legend
                series: [saltwater_spillVolumePerSaltwaterVol], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(saltwater_spillVolumePerSaltwaterVol_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_saltwater_incidents_by_wellcount = {
                legend: {data: ['Saltwater Spill Incidents by Well Count']}, // Add legend
                series: [saltwater_incidentsPerWell], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(saltwater_incidentsPerWell_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_saltwater_spillvol_by_wellcount = {
                legend: {data: ['Saltwater Spill Vol by Well Count']}, // Add legend
                series: [saltwater_spillVolumePerWell], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(saltwater_spillVolumePerWell_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            /* OTHER OPTIONS */

            barOptions_other_incidents = {
                legend: {data: ['Other Incidents']}, // Add legend
                series: [other_incidentsTotal], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(other_incidentsTotal_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_other_volumes = {
                legend: {data: ['Other Spill Volumes']}, // Add legend
                series: [other_spillVolumeTotal], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(other_spillVolumeTotal_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_other_incidents_by_production = {
                legend: {data: ['MBbls Production per Other Incident']}, // Add legend
                series: [other_incidentsPerProdVol], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(other_incidentsPerProdVol_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_other_spillvol_by_production = {
                legend: {data: ['Produced Bbls per Spilled Other Bbl']}, // Add legend
                series: [other_spillVolumePerProdVol], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(other_spillVolumePerProdVol_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_other_incidents_by_wellcount = {
                legend: {data: ['Other Spill Incidents by Well Count']}, // Add legend
                series: [other_incidentsPerWell], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(other_incidentsPerWell_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };

            barOptions_other_spillvol_by_wellcount = {
                legend: {data: ['Other Spill Vol by Well Count']}, // Add legend
                series: [other_spillVolumePerWell], // Add series

                grid: {x: 40, x2: 40, y: 55, y2: 150}, // Setup grid
                tooltip: {trigger: 'axis'}, // Add tooltip
                dataZoom: {show: true, start: 00, end: 30, height: 40}, // Add data zoom
                calculable: false, // Enable drag recalculate
                xAxis: [ Object.assign(other_spillVolumePerWell_keys, barchart_xAxis_options) ], // Horizontal axis
                yAxis: [{type: 'value'}] // Vertical axis
            };


            //
            // Basic scatter chart options
            //
            basic_scatter_options = {
                tooltip: {
                    trigger: 'axis',
                    showDelay: 0,
                    formatter: function (params) {
                        if (params.value.length > 1) {
                            return params.seriesName + '<br/>'
                                + params.value[0] + ', ' + params.value[1] + '';
                        }
                        else {
                            return params.seriesName + '<br/>'
                                + params.name + ': ' + params.value;
                        }
                    },
                    axisPointer: {show: true, type: 'cross', lineStyle: {type: 'dashed', width: 1}}
                },
                grid: {x: 50, x2: 45, y: 35, y2: 25} // Setup grid
            };

            /* ALL SCATTER OPTIONS */

            scatterOptions_all_incidents_by_production = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value}MM Bbl'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Spills'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_all_spillvol_by_production = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value}MM Bbl'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Bbl'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_all_incidents_by_wellcount = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Wells'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Spills'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_all_spillvol_by_wellcount = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Wells'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Bbl'}}], // Vertical axis
            }, basic_scatter_options);

            /* OIL SCATTER OPTIONS */

            scatterOptions_oil_incidents_by_production = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value}MM Bbl'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Spills'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_oil_spillvol_by_production = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value}MM Bbl'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Bbl'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_oil_incidents_by_wellcount = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Wells'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Spills'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_oil_spillvol_by_wellcount = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Wells'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Bbl'}}], // Vertical axis
            }, basic_scatter_options);

            /* SALTWATER SCATTER OPTIONS */

            scatterOptions_saltwater_incidents_by_production = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value}MM Bbl'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Spills'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_saltwater_spillvol_by_production = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value}MM Bbl'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Bbl'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_saltwater_incidents_by_wellcount = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Wells'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Spills'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_saltwater_spillvol_by_wellcount = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Wells'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Bbl'}}], // Vertical axis
            }, basic_scatter_options);

            /* OTHER SCATTER OPTIONS */

            scatterOptions_other_incidents_by_production = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value}MM Bbl'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Spills'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_other_spillvol_by_production = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value}MM Bbl'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Bbl'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_other_incidents_by_wellcount = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Wells'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Spills'}}], // Vertical axis
            }, basic_scatter_options);
            scatterOptions_other_spillvol_by_wellcount = Object.assign({
                xAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Wells'}}], // Horizontal axis
                yAxis: [{type: 'value', scale: true, axisLabel: {formatter: '{value} Bbl'}}], // Vertical axis
            }, basic_scatter_options);



            // Apply options
            // ------------------------------
            /* ALL */
            bar_all_incidents.setOption(barOptions_all_incidents);
            bar_all_volumes.setOption(barOptions_all_incidents);
            bar_all_incidents_by_production.setOption(barOptions_all_incidents);
            scatter_all_incidents_by_production.setOption(scatterOptions_all_incidents_by_production);
            bar_all_spillvol_by_production.setOption(barOptions_all_incidents);
            scatter_all_spillvol_by_production.setOption(scatterOptions_all_spillvol_by_production);
            bar_all_incidents_by_wellcount.setOption(barOptions_all_incidents);
            scatter_all_incidents_by_wellcount.setOption(scatterOptions_all_incidents_by_wellcount);
            bar_all_spillvol_by_wellcount.setOption(barOptions_all_incidents);
            scatter_all_spillvol_by_wellcount.setOption(scatterOptions_all_spillvol_by_wellcount);
            /* OIL */
            bar_oil_incidents.setOption(barOptions_oil_incidents);
            bar_oil_volumes.setOption(barOptions_oil_incidents);
            bar_oil_incidents_by_production.setOption(barOptions_oil_incidents);
            scatter_oil_incidents_by_production.setOption(scatterOptions_oil_incidents_by_production);
            bar_oil_spillvol_by_production.setOption(barOptions_oil_incidents);
            scatter_oil_spillvol_by_production.setOption(scatterOptions_oil_spillvol_by_production);
            bar_oil_incidents_by_wellcount.setOption(barOptions_oil_incidents);
            scatter_oil_incidents_by_wellcount.setOption(scatterOptions_oil_incidents_by_wellcount);
            bar_oil_spillvol_by_wellcount.setOption(barOptions_oil_incidents);
            scatter_oil_spillvol_by_wellcount.setOption(scatterOptions_oil_spillvol_by_wellcount);
            /* SALTWATER */
            bar_saltwater_incidents.setOption(barOptions_saltwater_incidents);
            bar_saltwater_volumes.setOption(barOptions_saltwater_incidents);
            bar_saltwater_incidents_by_production.setOption(barOptions_saltwater_incidents);
            scatter_saltwater_incidents_by_production.setOption(scatterOptions_saltwater_incidents_by_production);
            bar_saltwater_spillvol_by_production.setOption(barOptions_saltwater_incidents);
            scatter_saltwater_spillvol_by_production.setOption(scatterOptions_saltwater_spillvol_by_production);
            bar_saltwater_incidents_by_wellcount.setOption(barOptions_saltwater_incidents);
            scatter_saltwater_incidents_by_wellcount.setOption(scatterOptions_saltwater_incidents_by_wellcount);
            bar_saltwater_spillvol_by_wellcount.setOption(barOptions_saltwater_incidents);
            scatter_saltwater_spillvol_by_wellcount.setOption(scatterOptions_saltwater_spillvol_by_wellcount);
            /* OTHER */
            bar_other_incidents.setOption(barOptions_other_incidents);
            bar_other_volumes.setOption(barOptions_other_incidents);
            bar_other_incidents_by_production.setOption(barOptions_other_incidents);
            scatter_other_incidents_by_production.setOption(scatterOptions_other_incidents_by_production);
            bar_other_spillvol_by_production.setOption(barOptions_other_incidents);
            scatter_other_spillvol_by_production.setOption(scatterOptions_other_spillvol_by_production);
            bar_other_incidents_by_wellcount.setOption(barOptions_other_incidents);
            scatter_other_incidents_by_wellcount.setOption(scatterOptions_other_incidents_by_wellcount);
            bar_other_spillvol_by_wellcount.setOption(barOptions_other_incidents);
            scatter_other_spillvol_by_wellcount.setOption(scatterOptions_other_spillvol_by_wellcount);


            // Resize charts
            // ------------------------------

            window.onresize = function () {
                setTimeout(function (){
                    /* ALL */
                    bar_all_incidents.resize();
                    bar_all_volumes.resize();
                    bar_all_incidents_by_production.resize();
                    scatter_all_incidents_by_production.resize();
                    bar_all_spillvol_by_production.resize();
                    scatter_all_spillvol_by_production.resize();
                    bar_all_incidents_by_wellcount.resize();
                    scatter_all_incidents_by_wellcount.resize();
                    bar_all_spillvol_by_wellcount.resize();
                    scatter_all_spillvol_by_wellcount.resize();
                    /* OIL */
                    bar_oil_incidents.resize();
                    bar_oil_volumes.resize();
                    bar_oil_incidents_by_production.resize();
                    scatter_oil_incidents_by_production.resize();
                    bar_oil_spillvol_by_production.resize();
                    scatter_oil_spillvol_by_production.resize();
                    bar_oil_incidents_by_wellcount.resize();
                    scatter_oil_incidents_by_wellcount.resize();
                    bar_oil_spillvol_by_wellcount.resize();
                    scatter_oil_spillvol_by_wellcount.resize();
                    /* SALTWATER */
                    bar_saltwater_incidents.resize();
                    bar_saltwater_volumes.resize();
                    bar_saltwater_incidents_by_production.resize();
                    scatter_saltwater_incidents_by_production.resize();
                    bar_saltwater_spillvol_by_production.resize();
                    scatter_saltwater_spillvol_by_production.resize();
                    bar_saltwater_incidents_by_wellcount.resize();
                    scatter_saltwater_incidents_by_wellcount.resize();
                    bar_saltwater_spillvol_by_wellcount.resize();
                    scatter_saltwater_spillvol_by_wellcount.resize();
                    /* OTHER */
                    bar_other_incidents.resize();
                    bar_other_volumes.resize();
                    bar_other_incidents_by_production.resize();
                    scatter_other_incidents_by_production.resize();
                    bar_other_spillvol_by_production.resize();
                    scatter_other_spillvol_by_production.resize();
                    bar_other_incidents_by_wellcount.resize();
                    scatter_other_incidents_by_wellcount.resize();
                    bar_other_spillvol_by_wellcount.resize();
                    scatter_other_spillvol_by_wellcount.resize();
                }, 200);
            }
        }
    );

    //SEARCH CRITERIA

    // Initialize Date Picker with Options
    $('#reportrange').daterangepicker(
        {
            startDate: moment().startOf('month').subtract(11, 'months'),
            endDate: moment().endOf('month'),
            //TODO - set minDate and maxDate using the server data
            minDate: moment().subtract(13, 'months'),
            maxDate: moment().endOf('month'),
            dateLimit: { days: 3650 },
            ranges: {
                'Year Ending This Month (default)': [moment().subtract(11, 'months').startOf('month'), moment().endOf('month')],
                'Three Previous Months': [moment().subtract(3, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'This Month': [moment().startOf('month'), moment().endOf('month')]
            },
            opens: 'right',
            buttonClasses: ['btn'],
            applyClass: 'btn-small btn-success btn-block',
            cancelClass: 'btn-small btn-default btn-block',
            locale: {
                applyLabel: 'Submit',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom Range',
                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                firstDay: 1
            }
        },
        function(start, end) {
            $('#reportrange .daterange-custom-display').html(start.format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>') + '<em> – </em>' + end.format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>'));
        }
    );

    // Custom date display layout
    $('#reportrange .daterange-custom-display').html(moment().startOf('month').subtract(11, 'months').format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>') + '<em> – </em>' + moment().endOf('month').format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>'));
    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
        //Update the map when the Apply button is clicked.
        populateData();
    });

    function validateDatePickerSelections(inputDate, isStartDate) {
        var validDate = false;
        var inputDate = new Date(inputDate);
        var startDate = $('#reportrange').data('daterangepicker').startDate._d;
        var minDate = $('#reportrange').data('daterangepicker').minDate._d;
        var endDate = $('#reportrange').data('daterangepicker').endDate._d
        var maxDate = $('#reportrange').data('daterangepicker').maxDate._d

        if(!isNaN(inputDate.getTime()) &&
            inputDate >= minDate &&
            inputDate <= maxDate) {
            if((isStartDate && inputDate < endDate) || (!isStartDate && inputDate > startDate)){
                validDate = true;
            }
        }
        if(validDate) {
            $('.range_inputs .applyBtn').prop("disabled", false)
        }
        else {
            $('.range_inputs .applyBtn').prop("disabled", true);
        }
        return validDate;
    }

    $('input[name=daterangepicker_start]').keyup(function(event) {
        if(validateDatePickerSelections(this.value, true)) {
            $('#reportrange').data('daterangepicker').setStartDate(this.value);
        }
    });
    $('input[name=daterangepicker_end]').keyup(function(event) {
        if(validateDatePickerSelections(this.value, false)) {
            $('#reportrange').data('daterangepicker').setEndDate(this.value);
        }
    });


    //WINDOW FOR INCIDENTS VIEW

    addRowToTable = function(idx, item) {
        $("#incidents-table .table tbody").append(
            '<tr valign="top" data-idx="' + idx + '">' +
            '<td class="footable-visible footable-first-column" valign="top"><span class="footable-toggle"><b>' + item.id  + '</b><br/>' + item.dateOccurred + '<br/><br/><a href="' + item.attachmentURL + '" target="_blank">View PDF</a></span></td>' +
            '<td class="footable-visible" valign="top"><b>' + item.deemedOperator + (item.responsibleParty.length > 0 && item.deemedOperator !== item.responsibleParty ? '</b><br/>' + item.responsibleParty : '') + '</span></td>' +
            '<td class="footable-visible"><span>' + item.oilBarrels + ' Bbls Oil<br/>' + item.saltwaterBarrels + ' Bbls Saltwater<br/>' + item.otherBarrels + ' Bbls Other<br/>Contained: ' + item.contained + '<br/>Contaminant: '+ item.otherContaminant + '</span></td>' +
            '<td class="footable-visible footable-last-column"><span><b>' + item.wellName + '</b><br/>#' + item.wellFileNumber + '<br/>' + item.county + '<br/>' + item.twnRngSec + '</span></td>' +
            '</tr>'
        );
    }

    updateIncidentTable = function() {
        //clear existing table rows
        $("#incidents-table .table tbody tr" ).each( function(){
            this.parentNode.removeChild( this );
        });
        var queryObj = buildOperatorQueryObject();
        $.ajax({
            url: WELL_INCIDENTS_URL,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify(queryObj),
            success: function (jsonData) {
                //console.log("incident data: " + JSON.stringify(jsonData));
                var totalElements = jsonData.length;
                for (var i = 0; i < totalElements; i++) {
                    addRowToTable(i+1, jsonData[i]);
                }
            },
            error: function (data) {
                alert(data);
                console.error(JSON.stringify(data,null,4));
            }
        });
        $('#file-modal').dialog('open');
    }

    // Open jQuery File Modal
    $('#file-modal').dialog({
        autoOpen: false,
        width: 1000,
        height: 600,
        resizable: true,
        show: {
            effect: "fade",
            duration: 200
        },
        hide: {
            effect: "fade",
            duration: 200
        },
        buttons: [
            {
                text: 'Close',
                icons: {
                    primary: 'icon-cross3'
                },
                click: function() {
                    $(this).dialog('close');
                }
            }
        ],
    });

    $('body').on('click', '#file-modal-opener', function(event) {
        updateIncidentTable();
        // $('#file-modal').dialog('open');
    });


    //OPERATOR QUERIES

    buildOperatorQueryObject = function() {
        var startDate = $('#reportrange').data('daterangepicker').startDate._d;
        var endDate = $('#reportrange').data('daterangepicker').endDate._d

        var queryObject = {
            "fromDate" : startDate.toISOString(),
            "toDate" : endDate.toISOString()
        };

        var dateSelectionValue = $('input[name=radio-contained]:checked').val();
        if (dateSelectionValue === 'contained') queryObject = Object.assign(queryObject, {"contained":true});
        else if (dateSelectionValue === 'uncontained') queryObject = Object.assign(queryObject, {"contained":false});
        
        // console.log(JSON.stringify(queryObject));
        return queryObject;
    };

    //ensure queryCriteria already stringified
    searchOperators = function(queryCriteria) {
        //console.log("Sending: " + queryCriteria);

        $.ajax({
            url: WELL_OPERATORS_URL,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify(queryCriteria),
            success: function(jsonData) {
                //populate the operator efficiency data to the bar chart
                //console.log("Response: " + JSON.stringify(jsonData, null, 4));
                var results = jsonData.filter((item) => {
                    if (item.name === null) {
                        console.warn("Excluding " + JSON.stringify(item, null, 4));
                        return false;
                    }
                    return true;
                });

                nameFunc = function(item) {return item.name;};

                seriesBuilder = function(inputs, fx, fy, filterx, filtery, fname) {
                    var dataCopy = [];
                    var xAccum = 0, yAccum = 0, xMax = 0, yMax = 0;
                    var series = inputs.filter(function(item) { return filterx(item) && filtery(item) !== null }).map(function(item) {
                        dataCopy.push([fx(item), fy(item)]);
                        xAccum += fx(item);
                        yAccum += fy(item);
                        if (fx(item) > xMax) xMax = fx(item);
                        if (fy(item) > yMax) yMax = fy(item);
                        var option = {
                            name: fname(item),
                            type: 'scatter',
                            symbol: nameFunc(item).indexOf('OASIS') >= 0 ? 'triangle' : 'circle',
                            symbolSize: nameFunc(item).indexOf('OASIS') >= 0 ? 7 : 5,
                            data: [[fx(item), fy(item)]]
                        };
                        return option;
                    });
                    var xAvg = xAccum / dataCopy.length;
                    var yAvg = yAccum / dataCopy.length;
                    var trendYAtXMax = (yAvg * xMax)/xAvg; // + 0 intercept
                    var trendX, trendY;
                    if (trendYAtXMax >= yMax) {
                        //trend line exits top of graph, so plot [0,0] to [x, yMax]
                        trendY = yMax;
                        trendX = (trendY * xAvg)/yAvg;
                    } else {
                        //trend line exits right of graph, so plot [0,0] to [xMax, y]
                        trendX = xMax;
                        trendY = (yAvg * trendX)/xAvg;
                    }
                    series.splice(0,0,{
                        type: 'scatter',
                        symbolSize: 0,
                        data: dataCopy,
                        markLine : {
                            symbol: 'none',
                            data : [
                                [{xAxis: 0, yAxis: 0}, {xAxis: trendX, yAxis: trendY}],
                                {name: 'x avg', type: 'average', valueIndex: 0},
                                {name: 'y avg', type: 'average', valueIndex: 1}
                            ]
                        }
                    });
                    return series;
                };

                /* ALL DATA */

                allSpillers = results.filter(item => true);
                allSpillers.forEach(function(item) { item.allSpillBbls = Number(item.oilSpillBbls) + Number(item.saltwaterSpillBbls) + Number(item.otherSpillBbls) });

                allSpillers.sort((a,b) => {return b.incidentCount - a.incidentCount;});
                all_incidentsTotal_keys.data = allSpillers.map(function (item) { return item.name; });
                all_incidentsTotal.data = allSpillers.map(function(item) {return Number(item.incidentCount);});

                allSpillers.sort((a,b) => {return b.allSpillBbls - a.allSpillBbls;});
                all_spillVolumeTotal_keys.data = allSpillers.map(function (item) { return item.name; });
                all_spillVolumeTotal.data = allSpillers.map(function(item) {return Number(item.allSpillBbls).toFixed(2);});

                allSpillers.forEach(function(item) {
                    if (item.incidentCount && item.incidentCount > 0 && item.productionBbls)
                        item.tmp = (Number(item.productionBbls)/Number(item.incidentCount)/1000).toFixed(0);
                    else item.tmp = 0;
                });
                allSpillers.sort((a,b) => {return a.tmp - b.tmp;});
                all_incidentsPerProdVol_keys.data = allSpillers.filter(function(item) {return item.tmp > 0;}).map(function (item) { return item.name; });
                all_incidentsPerProdVol.data = allSpillers.filter(function(item) {return item.tmp > 0;}).map(function(item) { return item.tmp; });

                allSpillers.forEach(function(item) {
                    if (item.allSpillBbls && item.allSpillBbls > 0 && item.productionBbls)
                        item.tmp = (Number(item.productionBbls)/Number(item.allSpillBbls)).toFixed(0);
                    else item.tmp = 0;
                });
                allSpillers.sort((a,b) => {return a.tmp - b.tmp;});
                all_spillVolumePerProdVol_keys.data = allSpillers.filter(function(item) {return item.tmp > 0;}).map(function (item) { return item.name; });
                all_spillVolumePerProdVol.data = allSpillers.filter(function(item) {return item.tmp > 0;}).map(function(item) { return item.tmp; });

                allSpillers.forEach(function(item) {
                    if (item.incidentCount && item.wellCount)
                        item.tmp = (Number(item.incidentCount)/Number(item.wellCount)).toPrecision(2);
                    else item.tmp = 0;
                });
                allSpillers.sort((a,b) => {return b.tmp - a.tmp;});
                all_incidentsPerWell_keys.data = allSpillers.map(function (item) { return item.name; });
                all_incidentsPerWell.data = allSpillers.map(function(item) { return item.tmp; });

                allSpillers.forEach(function(item) {
                    if (item.allSpillBbls && item.wellCount)
                        item.tmp = (Number(item.allSpillBbls)/Number(item.wellCount)).toPrecision(2);
                    else item.tmp = 0;
                });
                allSpillers.sort((a,b) => {return b.tmp - a.tmp;});
                all_spillVolumePerWell_keys.data = allSpillers.map(function (item) { return item.name; });
                all_spillVolumePerWell.data = allSpillers.map(function(item) { return item.tmp; });

                bar_all_incidents.setOption(barOptions_all_incidents, true); //true for notMerge
                bar_all_volumes.setOption(barOptions_all_volumes, true); //true for notMerge
                bar_all_incidents_by_production.setOption(barOptions_all_incidents_by_production, true); //true for notMerge
                bar_all_spillvol_by_production.setOption(barOptions_all_spillvol_by_production, true); //true for notMerge
                bar_all_incidents_by_wellcount.setOption(barOptions_all_incidents_by_wellcount, true); //true for notMerge
                bar_all_spillvol_by_wellcount.setOption(barOptions_all_spillvol_by_wellcount, true); //true for notMerge

                xFunc = (item) => item.productionBbls/1000000.;
                yFunc = (item) => item.incidentCount;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_all_incidents_by_production.series = seriesBuilder(allSpillers, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_all_incidents_by_production.setOption(scatterOptions_all_incidents_by_production, true); //true for notMerge

                xFunc = (item) => item.productionBbls/1000000.;
                yFunc = (item) => item.allSpillBbls;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_all_spillvol_by_production.series = seriesBuilder(allSpillers, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_all_spillvol_by_production.setOption(scatterOptions_all_spillvol_by_production, true); //true for notMerge

                xFunc = (item) => item.wellCount;
                yFunc = (item) => item.incidentCount;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_all_incidents_by_wellcount.series = seriesBuilder(allSpillers, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_all_incidents_by_wellcount.setOption(scatterOptions_all_incidents_by_wellcount, true); //true for notMerge

                xFunc = (item) => item.wellCount;
                yFunc = (item) => item.allSpillBbls;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_all_spillvol_by_wellcount.series = seriesBuilder(allSpillers, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_all_spillvol_by_wellcount.setOption(scatterOptions_all_spillvol_by_wellcount, true); //true for notMerge                


                /* OIL DATA */

                oilSpillers = results.filter(item => item.oilSpillCount > 0);

                oilSpillers.sort((a,b) => {return b.oilSpillCount - a.oilSpillCount;});
                oil_incidentsTotal_keys.data = oilSpillers.map(function (item) { return item.name; });
                oil_incidentsTotal.data = oilSpillers.map(function(item) {return Number(item.oilSpillCount);});

                oilSpillers.sort((a,b) => {return b.oilSpillBbls - a.oilSpillBbls;});
                oil_spillVolumeTotal_keys.data = oilSpillers.map(function (item) { return item.name; });
                oil_spillVolumeTotal.data = oilSpillers.map(function(item) {return Number(item.oilSpillBbls).toFixed(2);});

                oilSpillers.forEach(function(item) {
                    if (item.oilSpillCount && item.incidentCount > 0 && item.productionBbls)
                        item.tmp = (Number(item.productionBbls)/Number(item.oilSpillCount)/1000).toFixed(0);
                    else item.tmp = 0;
                });
                oilSpillers.sort((a,b) => {return a.tmp - b.tmp;});
                oil_incidentsPerProdVol_keys.data = oilSpillers.filter(function(item) {return item.tmp > 0;}).map(function (item) { return item.name; });
                oil_incidentsPerProdVol.data = oilSpillers.filter(function(item) {return item.tmp > 0;}).map(function(item) { return item.tmp; });

                oilSpillers.forEach(function(item) {
                    if (item.oilSpillBbls && item.oilSpillBbls > 0 && item.productionBbls)
                        item.tmp = (Number(item.productionBbls)/Number(item.oilSpillBbls)).toFixed(0);
                    else item.tmp = 0;
                });
                oilSpillers.sort((a,b) => {return a.tmp - b.tmp;});
                oil_spillVolumePerProdVol_keys.data = oilSpillers.filter(function(item) {return item.tmp > 0;}).map(function (item) { return item.name; });
                oil_spillVolumePerProdVol.data = oilSpillers.filter(function(item) {return item.tmp > 0;}).map(function(item) { return item.tmp; });

                oilSpillers.forEach(function(item) {
                    if (item.oilSpillCount && item.wellCount)
                        item.tmp = (Number(item.oilSpillCount)/Number(item.wellCount)).toPrecision(2);
                    else item.tmp = 0;
                });
                oilSpillers.sort((a,b) => {return b.tmp - a.tmp;});
                oil_incidentsPerWell_keys.data = oilSpillers.map(function (item) { return item.name; });
                oil_incidentsPerWell.data = oilSpillers.map(function(item) { return item.tmp; });

                oilSpillers.forEach(function(item) {
                    if (item.oilSpillBbls && item.wellCount)
                        item.tmp = (Number(item.oilSpillBbls)/Number(item.wellCount)).toPrecision(2);
                    else item.tmp = 0;
                });
                oilSpillers.sort((a,b) => {return b.tmp - a.tmp;});
                oil_spillVolumePerWell_keys.data = oilSpillers.map(function (item) { return item.name; });
                oil_spillVolumePerWell.data = oilSpillers.map(function(item) { return item.tmp; });

                bar_oil_incidents.setOption(barOptions_oil_incidents, true); //true for notMerge
                bar_oil_volumes.setOption(barOptions_oil_volumes, true); //true for notMerge
                bar_oil_incidents_by_production.setOption(barOptions_oil_incidents_by_production, true); //true for notMerge
                bar_oil_spillvol_by_production.setOption(barOptions_oil_spillvol_by_production, true); //true for notMerge
                bar_oil_incidents_by_wellcount.setOption(barOptions_oil_incidents_by_wellcount, true); //true for notMerge
                bar_oil_spillvol_by_wellcount.setOption(barOptions_oil_spillvol_by_wellcount, true); //true for notMerge

                xFunc = (item) => item.productionBbls/1000000.;
                yFunc = (item) => item.oilSpillCount;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_oil_incidents_by_production.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_oil_incidents_by_production.setOption(scatterOptions_oil_incidents_by_production, true); //true for notMerge

                xFunc = (item) => item.productionBbls/1000000.;
                yFunc = (item) => item.oilSpillBbls;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_oil_spillvol_by_production.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_oil_spillvol_by_production.setOption(scatterOptions_oil_spillvol_by_production, true); //true for notMerge

                xFunc = (item) => item.wellCount;
                yFunc = (item) => item.oilSpillCount;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_oil_incidents_by_wellcount.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_oil_incidents_by_wellcount.setOption(scatterOptions_oil_incidents_by_wellcount, true); //true for notMerge

                xFunc = (item) => item.wellCount;
                yFunc = (item) => item.oilSpillBbls;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_oil_spillvol_by_wellcount.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_oil_spillvol_by_wellcount.setOption(scatterOptions_oil_spillvol_by_wellcount, true); //true for notMerge


                /* SALTWATER DATA */

                saltwaterSpillers = results.filter(item => item.saltwaterSpillCount > 0);

                saltwaterSpillers.sort((a,b) => {return b.saltwaterSpillCount - a.saltwaterSpillCount;});
                saltwater_incidentsTotal_keys.data = saltwaterSpillers.map(function (item) { return item.name; });
                saltwater_incidentsTotal.data = saltwaterSpillers.map(function(item) {return Number(item.saltwaterSpillCount);});

                saltwaterSpillers.sort((a,b) => {return b.saltwaterSpillBbls - a.saltwaterSpillBbls;});
                saltwater_spillVolumeTotal_keys.data = saltwaterSpillers.map(function (item) { return item.name; });
                saltwater_spillVolumeTotal.data = saltwaterSpillers.map(function(item) {return Number(item.saltwaterSpillBbls).toFixed(2);});

                saltwaterSpillers.forEach(function(item) {
                    if (item.saltwaterSpillCount && item.incidentCount > 0 && item.productionSaltwaterBbls)
                        item.tmp = (Number(item.productionSaltwaterBbls)/Number(item.saltwaterSpillCount)/1000).toFixed(0);
                    else item.tmp = 0;
                });
                saltwaterSpillers.sort((a,b) => {return a.tmp - b.tmp;});
                saltwater_incidentsPerSaltwaterVol_keys.data = saltwaterSpillers.filter(function(item) {return item.tmp > 0;}).map(function (item) { return item.name; });
                saltwater_incidentsPerSaltwaterVol.data = saltwaterSpillers.filter(function(item) {return item.tmp > 0;}).map(function(item) { return item.tmp; });

                saltwaterSpillers.forEach(function(item) {
                    if (item.saltwaterSpillBbls && item.saltwaterSpillBbls > 0 && item.productionSaltwaterBbls)
                        item.tmp = (Number(item.productionSaltwaterBbls)/Number(item.saltwaterSpillBbls)).toFixed(0);
                    else item.tmp = 0;
                });
                saltwaterSpillers.sort((a,b) => {return a.tmp - b.tmp;});
                saltwater_spillVolumePerSaltwaterVol_keys.data = saltwaterSpillers.filter(function(item) {return item.tmp > 0;}).map(function (item) { return item.name; });
                saltwater_spillVolumePerSaltwaterVol.data = saltwaterSpillers.filter(function(item) {return item.tmp > 0;}).map(function(item) { return item.tmp; });

                saltwaterSpillers.forEach(function(item) {
                    if (item.saltwaterSpillCount && item.wellCount)
                        item.tmp = (Number(item.saltwaterSpillCount)/Number(item.wellCount)).toPrecision(2);
                    else item.tmp = 0;
                });
                saltwaterSpillers.sort((a,b) => {return b.tmp - a.tmp;});
                saltwater_incidentsPerWell_keys.data = saltwaterSpillers.map(function (item) { return item.name; });
                saltwater_incidentsPerWell.data = saltwaterSpillers.map(function(item) { return item.tmp; });

                saltwaterSpillers.forEach(function(item) {
                    if (item.saltwaterSpillBbls && item.wellCount)
                        item.tmp = (Number(item.saltwaterSpillBbls)/Number(item.wellCount)).toPrecision(2);
                    else item.tmp = 0;
                });
                saltwaterSpillers.sort((a,b) => {return b.tmp - a.tmp;});
                saltwater_spillVolumePerWell_keys.data = saltwaterSpillers.map(function (item) { return item.name; });
                saltwater_spillVolumePerWell.data = saltwaterSpillers.map(function(item) { return item.tmp; });

                bar_saltwater_incidents.setOption(barOptions_saltwater_incidents, true); //true for notMerge
                bar_saltwater_volumes.setOption(barOptions_saltwater_volumes, true); //true for notMerge
                bar_saltwater_incidents_by_production.setOption(barOptions_saltwater_incidents_by_production, true); //true for notMerge
                bar_saltwater_spillvol_by_production.setOption(barOptions_saltwater_spillvol_by_production, true); //true for notMerge
                bar_saltwater_incidents_by_wellcount.setOption(barOptions_saltwater_incidents_by_wellcount, true); //true for notMerge
                bar_saltwater_spillvol_by_wellcount.setOption(barOptions_saltwater_spillvol_by_wellcount, true); //true for notMerge

                xFunc = (item) => item.productionBbls/1000000.;
                yFunc = (item) => item.saltwaterSpillCount;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_saltwater_incidents_by_production.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_saltwater_incidents_by_production.setOption(scatterOptions_saltwater_incidents_by_production, true); //true for notMerge

                xFunc = (item) => item.productionBbls/1000000.;
                yFunc = (item) => item.saltwaterSpillBbls;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_saltwater_spillvol_by_production.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_saltwater_spillvol_by_production.setOption(scatterOptions_saltwater_spillvol_by_production, true); //true for notMerge

                xFunc = (item) => item.wellCount;
                yFunc = (item) => item.saltwaterSpillCount;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_saltwater_incidents_by_wellcount.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_saltwater_incidents_by_wellcount.setOption(scatterOptions_saltwater_incidents_by_wellcount, true); //true for notMerge

                xFunc = (item) => item.wellCount;
                yFunc = (item) => item.saltwaterSpillBbls;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_saltwater_spillvol_by_wellcount.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_saltwater_spillvol_by_wellcount.setOption(scatterOptions_saltwater_spillvol_by_wellcount, true); //true for notMerge                


                /* OTHER DATA */

                otherSpillers = results.filter(item => item.otherSpillCount > 0);

                otherSpillers.sort((a,b) => {return b.otherSpillCount - a.otherSpillCount;});
                other_incidentsTotal_keys.data = otherSpillers.map(function (item) { return item.name; });
                other_incidentsTotal.data = otherSpillers.map(function(item) {return Number(item.otherSpillCount);});

                otherSpillers.sort((a,b) => {return b.otherSpillBbls - a.otherSpillBbls;});
                other_spillVolumeTotal_keys.data = otherSpillers.map(function (item) { return item.name; });
                other_spillVolumeTotal.data = otherSpillers.map(function(item) {return Number(item.otherSpillBbls).toFixed(2);});

                otherSpillers.forEach(function(item) {
                    if (item.otherSpillCount && item.incidentCount > 0 && item.productionBbls)
                        item.tmp = (Number(item.productionBbls)/Number(item.otherSpillCount)/1000).toFixed(0);
                    else item.tmp = 0;
                });
                otherSpillers.sort((a,b) => {return a.tmp - b.tmp;});
                other_incidentsPerProdVol_keys.data = otherSpillers.filter(function(item) {return item.tmp > 0;}).map(function (item) { return item.name; });
                other_incidentsPerProdVol.data = otherSpillers.filter(function(item) {return item.tmp > 0;}).map(function(item) { return item.tmp; });

                otherSpillers.forEach(function(item) {
                    if (item.otherSpillBbls && item.otherSpillBbls > 0 && item.productionBbls)
                        item.tmp = (Number(item.productionBbls)/Number(item.otherSpillBbls)).toFixed(0);
                    else item.tmp = 0;
                });
                otherSpillers.sort((a,b) => {return a.tmp - b.tmp;});
                other_spillVolumePerProdVol_keys.data = otherSpillers.filter(function(item) {return item.tmp > 0;}).map(function (item) { return item.name; });
                other_spillVolumePerProdVol.data = otherSpillers.filter(function(item) {return item.tmp > 0;}).map(function(item) { return item.tmp; });

                otherSpillers.forEach(function(item) {
                    if (item.otherSpillCount && item.wellCount)
                        item.tmp = (Number(item.otherSpillCount)/Number(item.wellCount)).toPrecision(2);
                    else item.tmp = 0;
                });
                otherSpillers.sort((a,b) => {return b.tmp - a.tmp;});
                other_incidentsPerWell_keys.data = otherSpillers.map(function (item) { return item.name; });
                other_incidentsPerWell.data = otherSpillers.map(function(item) { return item.tmp; });

                otherSpillers.forEach(function(item) {
                    if (item.otherSpillBbls && item.wellCount)
                        item.tmp = (Number(item.otherSpillBbls)/Number(item.wellCount)).toPrecision(2);
                    else item.tmp = 0;
                });
                otherSpillers.sort((a,b) => {return b.tmp - a.tmp;});
                other_spillVolumePerWell_keys.data = otherSpillers.map(function (item) { return item.name; });
                other_spillVolumePerWell.data = otherSpillers.map(function(item) { return item.tmp; });

                bar_other_incidents.setOption(barOptions_other_incidents, true); //true for notMerge
                bar_other_volumes.setOption(barOptions_other_volumes, true); //true for notMerge
                bar_other_incidents_by_production.setOption(barOptions_other_incidents_by_production, true); //true for notMerge
                bar_other_spillvol_by_production.setOption(barOptions_other_spillvol_by_production, true); //true for notMerge
                bar_other_incidents_by_wellcount.setOption(barOptions_other_incidents_by_wellcount, true); //true for notMerge
                bar_other_spillvol_by_wellcount.setOption(barOptions_other_spillvol_by_wellcount, true); //true for notMerge

                xFunc = (item) => item.productionBbls/1000000.;
                yFunc = (item) => item.otherSpillCount;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_other_incidents_by_production.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_other_incidents_by_production.setOption(scatterOptions_other_incidents_by_production, true); //true for notMerge

                xFunc = (item) => item.productionBbls/1000000.;
                yFunc = (item) => item.otherSpillBbls;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_other_spillvol_by_production.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_other_spillvol_by_production.setOption(scatterOptions_other_spillvol_by_production, true); //true for notMerge

                xFunc = (item) => item.wellCount;
                yFunc = (item) => item.otherSpillCount;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_other_incidents_by_wellcount.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_other_incidents_by_wellcount.setOption(scatterOptions_other_incidents_by_wellcount, true); //true for notMerge

                xFunc = (item) => item.wellCount;
                yFunc = (item) => item.otherSpillBbls;
                xFilter = (item) => xFunc(item) !== null && xFunc(item) > 0;
                yFilter = (item) => yFunc(item) !== null;
                scatterOptions_other_spillvol_by_wellcount.series = seriesBuilder(results, xFunc, yFunc, xFilter, yFilter, nameFunc);
                scatter_other_spillvol_by_wellcount.setOption(scatterOptions_other_spillvol_by_wellcount, true); //true for notMerge
            },
            error: function (data) {
                console.log(JSON.stringify(data, null, 4));
                alert("Error " + data);
            }
        });
    };

    prepareDownloadFormHiddenParams = function() {
        var queryObj = buildOperatorQueryObject();

        if (queryObj.hasOwnProperty('contained')) {
            $("#input-download-contained").attr('disabled', false);
            $("#input-download-contained").attr('value', queryObj.contained ? 'true' : 'false');
        } else {
            $("#input-download-contained").attr('disabled', true);
        }
        $("#input-download-fromDate").attr('value', queryObj.fromDate);
        $("#input-download-toDate").attr('value', queryObj.toDate);
    }

    downloadCSVOperatorSummaries = function (event) {
        event.preventDefault();
        prepareDownloadFormHiddenParams();
        var form = $("#form-download");
        form.attr('action', WELL_OPERATORS_URL + "/csv");
        form.submit();
    }

    downloadJSONOperatorSummaries = function (event) {
        event.preventDefault();
        prepareDownloadFormHiddenParams();
        var form = $("#form-download");
        form.attr('action', WELL_OPERATORS_URL + "/json");
        form.submit();
    }

    downloadCSVEnvironmentalIncidents = function (event) {
        event.preventDefault();
        prepareDownloadFormHiddenParams();
        var form = $("#form-download");
        form.attr('action', WELL_INCIDENTS_URL + "/csv");
        form.submit();
    }

    downloadJSONEnvironmentalIncidents = function (event) {
        event.preventDefault();
        prepareDownloadFormHiddenParams();
        var form = $("#form-download");
        form.attr('action', WELL_INCIDENTS_URL + "/json");
        form.submit();
    }

    //onChange method to bind controls which should initiate refresh of operators & wells
    function populateData(data) {
        var queryObj = buildOperatorQueryObject();
        searchOperators(queryObj);
    };

    // PAGE READY

    $(document).ready(function () {
        //Add the event handlers to the radio buttons
        $("#containedGroup :radio").change(
            function(){
                populateData();
            }
        );

        $("#button-download-csv-summaries").click(downloadCSVOperatorSummaries);
        $("#button-download-csv-incidents").click(downloadCSVEnvironmentalIncidents);
        $("#button-download-json-summaries").click(downloadJSONOperatorSummaries);
        $("#button-download-json-incidents").click(downloadJSONEnvironmentalIncidents);

        populateData();
    });

});
