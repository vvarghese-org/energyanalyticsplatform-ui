define(function() {

var theme10 = {
    color: [
        '#2ec7c9','#315374','#5ab1ef','#ffb980','#d87a80',
        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
    ],

    
    title: {
        textStyle: {
            fontWeight: 'normal',
            fontSize: 17,
            color: '#008acd'          
        }
    },
    
    
    dataRange: {
        itemWidth: 15,
        color: ['#2ec7c9','#315374']
    },

    // Tools
    toolbox: {
        /*
        color : ['#000000', '#1e90ff', '#1e90ff', '#1e90ff'],
        effectiveColor : '#ff4500',
        feature : {
            mark : {
                title : {
                    mark : 'Markline switch',
                    markUndo : 'Undo markline',
                    markClear : 'Clear markline'
                }
            }
        }
        */
    },


    animationDuration: 1000,

    legend: {
        itemGap: 15
    },

    
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',     
        padding: [8, 12, 8, 12],
        axisPointer : {            
            type : 'line',         // 'line' | 'shadow'
            lineStyle : {          
                color: '#607D8B',
                width: 1
            },
            crossStyle: {
                color: '#607D8B'
            },
            shadowStyle : {                     
                color: 'rgba(200,200,200,0.2)'
            }
        },
        textStyle: {
            fontFamily: 'Roboto, sans-serif'
        }
    },

    
    dataZoom: {
        dataBackgroundColor: '#eceff1',
        fillerColor: 'rgba(96,125,139,0.1)',   
        handleColor: '#607D8B',
        handleSize: 10
    },

    
    grid: {
        borderColor: '#eee'
    },

    
    categoryAxis: {
        axisLine: {            
            lineStyle: {       
                color: '#999',
                width: 1
            }
        },
        splitLine: {           
            lineStyle: {       
                color: ['#eee']
            }
        },
        nameTextStyle: {
          fontFamily: 'Roboto, sans-serif'
        },
        axisLabel: {
            textStyle: {
                fontFamily: 'Roboto, sans-serif'
            }
        }
    },

    
    valueAxis: {
        axisLine: {            
            lineStyle: {       
                color: '#999',
                width: 1
            }
        },
        splitArea : {
            show : true,
            areaStyle : {
                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
            }
        },
        splitLine: {           
            lineStyle: {       
                color: ['#eee']
            }
        },
        nameTextStyle: {
          fontFamily: 'Roboto, sans-serif'
        },
        axisLabel: {
            textStyle: {
                fontFamily: 'Roboto, sans-serif'
            }
        }
    },

    polar : {
        axisLine: {            
            lineStyle: {       
                color: '#ddd'
            }
        },
        splitArea : {
            show : true,
            areaStyle : {
                color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
            }
        },
        splitLine : {
            lineStyle : {
                color : '#ddd'
            }
        }
    },

    timeline : {
        lineStyle : {
            color : '#008acd'
        },
        controlStyle : {
            normal : { color : '#008acd'},
            emphasis : { color : '#008acd'}
        },
        symbol : 'emptyCircle',
        symbolSize : 3
    },

    
    bar: {
        itemStyle: {
            normal: {
                barBorderRadius: 0
            },
            emphasis: {
                barBorderRadius: 0
            }
        }
    },


    // Pies
    pie: {
        itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor: '#fff'
            },
            emphasis: {
                borderWidth: 1,
                borderColor: '#fff'
            }
        }
    },


    // Default line
    line: {
        smooth : true,
        symbol: 'emptyCircle',  // Symbol type
        symbolSize: 3           // Circle dot size
    },
    
   
    k: {
        itemStyle: {
            normal: {
                color: '#d87a80',       
                color0: '#2ec7c9',      
                lineStyle: {
                    color: '#d87a80',   
                    color0: '#2ec7c9'   
                }
            }
        }
    },
    
    
    scatter: {
        symbol: 'circle',    
        symbolSize: 4        
    },

    // 雷达图默认参数
    radar : {
        symbol: 'emptyCircle',    
        symbolSize:3
        //symbol: null,         
        //symbolRotate : null,  
    },

    map: {
        itemStyle: {
            normal: {
                areaStyle: {
                    color: '#ddd'
                },
                label: {
                    textStyle: {
                        color: '#d87a80'
                    }
                }
            },
            emphasis: {                 
                areaStyle: {
                    color: '#fe994e'
                }
            }
        }
    },
    
    force : {
        itemStyle: {
            normal: {
                linkStyle : {
                    color : '#1e90ff'
                }
            }
        }
    },

    chord : {
        itemStyle : {
            normal : {
                borderWidth: 1,
                borderColor: 'rgba(128, 128, 128, 0.5)',
                chordStyle : {
                    lineStyle : {
                        color : 'rgba(128, 128, 128, 0.5)'
                    }
                }
            },
            emphasis : {
                borderWidth: 1,
                borderColor: 'rgba(128, 128, 128, 0.5)',
                chordStyle : {
                    lineStyle : {
                        color : 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        }
    },

    gauge : {
        axisLine: {            
            lineStyle: {       
                color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']], 
                width: 10
            }
        },
        axisTick: {            
            splitNumber: 10,   
            length :15,        
            lineStyle: {       
                color: 'auto'
            }
        },
        splitLine: {           
            length :22,        
            lineStyle: {       
                color: 'auto'
            }
        },
        pointer : {
            width : 5
        }
    },
    
    textStyle: {
        fontFamily: 'Roboto, sans-serif'
    }
};

    return theme10;
});