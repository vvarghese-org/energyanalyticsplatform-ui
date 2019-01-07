/* ------------------------------------------------------------------------------
*
*  # Sullexis CI Protoype Main APP
*
*  JW Fire Offs and Includes for Main App
*
*  Version: 1.0
*  Long Live the Fighters
*
* ---------------------------------------------------------------------------- */

$(function() {

    var socket;
    var stompClient;

    var filesValues;
	var selectedTab = '#wellheader-tab';
	var apiNumbers;
	var wellHeaders;
	var map;
	var infowindow;

	var ndicForm6CurrentPage = 0;
	var ndicScoutTicketCurrentPage = 0;
	var ndicWellHeaderCurrentPage = 0;
	var ndicWellHeaderLogsCurrentPage = 0;
	var fracFocusCurrentPage = 0;

	const PRODUCTION_SERVICE_URL = '@prod.api.root@'; //substituted during maven build
	const DEFAULT_SERVICE_URL = 'http://localhost:8080/';
	//following uses the DEFAULT_SERVICE_URL if used without maven processing (e.g., IDE testing)
	const SERVICE_URL = (PRODUCTION_SERVICE_URL.includes('prod.api.root')) ? DEFAULT_SERVICE_URL : PRODUCTION_SERVICE_URL;

	const PRODUCTION_WEBSOCKET_URL = '@prod.websocket.root@ci-websocket';
	const DEFAULT_WEBSOCKET_URL = 'ws://localhost:8080/ci-websocket';
    const WEBSOCKET_URL = (PRODUCTION_WEBSOCKET_URL.includes('prod.websocket.root')) ? DEFAULT_WEBSOCKET_URL : PRODUCTION_WEBSOCKET_URL;
    const STOMP_TOPIC_CURVE_PDFS = "/topic/ndic/curve-pdfs";
    const STOMP_TOPIC_FORM_PDFS = "/topic/ndic/form-pdfs";
    const STOMP_TOPIC_SCOUT_TICKETS = "/topic/ndic/scout-tickets";

	var WELL_HEADER_URL = SERVICE_URL + 'api/v1/wells/header';
	var WELL_SEARCH_URL = SERVICE_URL + 'api/v1/wells/search/wellparams';
    var NDIC_SCOUT_TICKET_URL = SERVICE_URL + 'api/v1/ndic/scoutticket/';
    var NDIC_SCOUT_TICKET_REFRESH_URL = SERVICE_URL + 'api/v1/ndic/scoutticket/refresh/';
	var NDIC_FORMS_URL = SERVICE_URL + 'api/v1/ndic/forms/listByApiNoIn/';
	var NDIC_FORMS_PDF_URL = SERVICE_URL + 'api/v1/ndic/forms/pdf/';
    var NDIC_FORMS_PDF_REFRESH_URL = SERVICE_URL + 'api/v1/ndic/forms/refresh/';
	var NDIC_WELL_HEADER_URL = SERVICE_URL + 'api/v1/ndic/wellfile/getByApiNoIn/';
	var NDIC_CURVES_URL = SERVICE_URL + 'api/v1/ndic/curves/listByApiNoIn/';
	var NDIC_CURVES_PDF_URL = SERVICE_URL + 'api/v1/ndic/curves/pdf/';
	var NDIC_CURVES_PDF_REFRESH_URL = SERVICE_URL + 'api/v1/ndic/curves/refresh/';
	var FRAC_FOCUS_URL = SERVICE_URL + 'api/v1/ndic/ff/getByApiNoIn/';

	// Initialize split.js
	var split = Split(['#topMap', '#bottomData'], {
        direction: 'vertical',
		sizes: [50, 50]

    });

	function addRowToTable(tabId, idx, item) {
        //TODO sorting of tab rows (see footable)
        //TODO frac focus
        switch(tabId) {
            case '#wellheader-tab':
                appendTableRow(tabId, idx, item, buildWellHeaderTableRowHTML);
                break;
            case '#scoutticket-tab':
                appendTableRow(tabId, idx, item, buildScoutTicketTableRowHTML);
                break;
            case '#wellfile-tab':
                appendTableRow(tabId, idx, item, buildWellfileTableRowHTML)
                break;
            case '#forms-tab':
                appendTableRow(tabId, idx, item, buildFormsTabTableRowHTML);
                break;
            case '#curves-tab':
                appendTableRow(tabId, idx, item, buildCurvesTableRowHTML);
                break;
            case '#ff-tab':
                break;
        }
	}

	function updateTableRowHTML(tabId, item, rowInnerHTMLBuilder) {
	    //preserves hide/show state, idx value
        //TODO determine idx for new rows based on max(idx)+1 instead of 'new' string
        //TODO flash row and badge to indicate change, update any UI indicating waiting for update
        //TODO handle the user's applied filter, as other user's refreshes will eventually appear
        var found = false;
        $(tabId + ' .table tbody tr:contains(' + item.api_no + ')').each((i, element) => {
            found = true;
            var idx = element.getAttribute('data-idx');
            //console.log('Updating row ' + element + ' at index ' + idx);
            var newRowHTML = rowInnerHTMLBuilder(tabId, idx, item);
            $(element).html(newRowHTML);
        });
        if (!found) {
            appendTableRow(tabId, 'new', item, rowInnerHTMLBuilder);
        }
    }

    function appendTableRow(tabId, idx, item, htmlBuilder) {
        $(tabId + ' .table tbody').append(
            '<tr data-idx="' + idx + '">' + htmlBuilder(tabId, idx, item) + '</tr>'
        );
    }

    function buildWellHeaderTableRowHTML(tabId, idx, item) {
        /* {"multilateral":"false","api_no":"33053068620000",
            "latitude":"47.96481944",
            "name":"ANDERSMADSON 5201 42-24 5B",
            "active":"true",
            "reservoir":"BAKKEN",
            "type":"DEV",
            "operator":"OASIS PETROLEUM NORTH AMERICA LLC",
            "longitude":"-103.5550778"} */
        return '' +
            '<td class="footable-visible footable-first-column"><span class="footable-toggle"></span>' + idx  + '</td>' +
            '<td class="footable-visible"><span id="api-marker-opener">' + item.api_no + '</span></td>' +
            '<td class="footable-visible"><span>' + item.name + '</span></td>' +
            '<td class="footable-visible"><span>' + ((!!item.multilateral && item.multilateral == 'true') ? "Multilateral" : "") + '</span></td>' +
            '<td class="footable-visible"><span>' + (!!item.type ? item.type : "") + '</span></td>' +
            '<td class="footable-visible"><span>' + ((!!item.active && item.active === 'true') ? "Active" : "") + '</span></td>' +
            '<td class="footable-visible"><span>' + (!!item.reservoir ? item.reservoir : "N/A") + '</span></td>' +
            '<td class="footable-visible"><span>' + item.operator + '</span></td>' +
            '<td class="footable-visible footable-last-column"><span>' + item.latitude + ', ' + item.longitude + '</span></td>';
    }

    function buildScoutTicketTableRowHTML(tabId, idx, item) {
        //TODO more data from scout ticket (maybe modal window)
        // let sample = {
        //     "county": "MCKENZIE",
        //     "laterals": [{"startCoordinates": "296 S 170 W", "endCoordinates": "10887 S 266 W"}],
        //     "last_updated": 1505331971.148,
        //     "api_no": "33053070830000",
        //     "file_no": "31559",
        //     "ctb_no": "225865",
        //     "pdfCurve": null,
        //     "wellFile": null
        // };
        var friendlyLastUpdated = moment(item.last_updated, ["X", moment.ISO_8601]).fromNow();
        return '' +
            '<td class="footable-visible footable-first-column"><span class="footable-toggle"></span>' + idx  + '</td>' +
            '<td class="footable-visible"><span>' + friendlyLastUpdated + '  (<a id="scout-ticket-refresher" data-api-number="'+item.api_no+'">refresh</a>)</span></td>' +
            '<td class="footable-visible"><span id="api-marker-opener">' + item.api_no + '</span></td>' +
            '<td class="footable-visible"><span>' + item.file_no + '</span></td>' +
            '<td class="footable-visible"><span>' + item.ctb_no + '</span></td>' +
            '<td class="text-center footable-visible footable-last-column">' +
            '<ul class="icons-list">' +
            '<li class="dropdown">' +
            '<a class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu7"></i></a>' +
            '<ul class="dropdown-menu dropdown-menu-right">' +
            '<li class="dropdown-header highlight">View:</li>' +
            '<li><a href=\"' + NDIC_FORMS_PDF_URL + item.api_no + '\" rel="noopener noreferrer" target="_blank"><i class="icon-toggle"></i>Forms PDF</a></li>' +
            '<li><a href=\"' + NDIC_CURVES_PDF_URL + item.api_no + '\" rel="noopener noreferrer" target="_blank"><i class="icon-toggle"></i>Curves PDF</a></li>' +
            '</ul>' +
            '</li>' +
            '</ul>' +
            '</td>';
    }

    function buildWellfileTableRowHTML(tabId, idx, item) {
        /* {"url":"","field":"AMBROSE","qq":"NENE","sec":"25","twp":"162","rng":"99","api_no":"33023014070000","file_no":"32614","file_name":"#REF!","well_name":"LYSTAD  1-25HS","well_operator":"SM ENERGY COMPANY","completion_date":[2016,9,7],"cum_oil":"27412.0","cum_water":"62091.0","cum_gas":"17826.0","last_prod_rpt_date":[2017,1,1]} */
        var completionDate = moment(item.completion_date, [moment.ISO_8601, "X"]).format('LL');
        var lastProdDate = moment(item.last_prod_rpt_date, [moment.ISO_8601, "X"]).format('LL');
        return '' +
            '<td class="footable-visible footable-first-column"><span class="footable-toggle"></span>' + idx  + '</td>' +

            '<td class="footable-visible"><span>' +
            '<div class="media-left">' +
            '<div class="text-size-small"><a class="text-default efpEntity" id="file-modal-opener">' + item.well_name  + '</a></div>' +
            '<div class="text-size-small" id="api-marker-opener"> ' + item.api_no + '</div>' +
            '<div class="text-size-small">' + item.field + ' ' + item.qq + ' ' + item.sec + ' ' + item.twp + ' ' + item.rng + '</div>' +
            '</div>' +
            '</span></td>' +

            '<td class="footable-visible"><span>' + item.cum_oil + '</span></td>' +
            '<td class="footable-visible"><span>' + item.cum_water + '</span></td>' +
            '<td class="footable-visible"><span>' + item.cum_gas + '</span></td>' +
            '<td class="footable-visible"><span>' + completionDate + '</span></td>' +
            '<td class="footable-visible"><span>' + lastProdDate + '</span></td>' +
            '<td class="footable-visible text-size-mini"><span>' + item.well_operator + '</span></td>';
    }

	function buildCurvesTableRowHTML(tabId, idx, item) {
        //NOTE: we have a scout ticket result for now because it has necessary info
        var friendlyLastUpdated = moment(item.last_updated, ["X", moment.ISO_8601]).fromNow();
        //console.log("Building curve row with last_updated: " + item.last_updated + " and friendlyLastUpdated: " + friendlyLastUpdated + " item: " + JSON.stringify(item));
	    return '' +
            '<td class="footable-visible footable-first-column"><span class="footable-toggle"></span>' + idx  + '</td>' +
            '<td class="footable-visible"><span>' + friendlyLastUpdated + '  (<a id="curve-pdf-refresher" data-api-number="'+item.api_no+'">refresh</a>)</span></td>' +
            '<td class="footable-visible"><span><a href=\"' + NDIC_CURVES_PDF_URL + item.api_no + '\" rel="noopener noreferrer" target="_blank">Download Curves PDF</a></span></td>' +
            '<td class="footable-visible"><span id="api-marker-opener">' + item.api_no + '</span></td>' +
            '<td class="footable-visible footable-last-column"><span>' + item.file_no + '</span></td>';
    }

    function buildFormsTabTableRowHTML(tabId, idx, item) {
        //NOTE: we have a scout ticket result for now because it has necessary info
        var friendlyLastUpdated = moment(item.last_updated, ["X", moment.ISO_8601]).fromNow();
        return '' +
            '<td class="footable-visible footable-first-column"><span class="footable-toggle"></span>' + idx  + '</td>' +
            '<td class="footable-visible"><span>' + friendlyLastUpdated + '  (<a id="form-pdf-refresher" data-api-number="'+item.api_no+'">refresh</a>)</span></td>' +
            '<td class="footable-visible"><span><a href=\"' + NDIC_FORMS_PDF_URL + item.api_no + '\" rel="noopener noreferrer" target="_blank">Download Forms PDF</a></span></td>' +
            '<td class="footable-visible"><span id="api-marker-opener">' + item.api_no + '</span></td>' +
            '<td class="footable-visible footable-last-column"><span>' + item.file_no + '</span></td>';
    }

	//TODO restore handling of pagination
	function managePagination(tabId, jsonData, totalElements, currentPage) {
		$(tabId + ' .pagination li').addClass('disabled');
		if(currentPage >= 5) {
			$(tabId + " #page-previous").removeClass('disabled');
		}
		if(jsonData.totalPages > 5) {
			$(tabId + ' #page-next').removeClass('disabled');
		}
		for(var j = 0; j < jsonData.totalPages; j++){
			var page = j + 1;
			$(tabId + ' .pagination li a:contains("' + page + '")').parent().removeClass('disabled');
		}
		var currentPageVal = currentPage + 1;
		$(tabId + ' .pagination li a:contains("' + currentPageVal + '")').parent().addClass('active');

        if(totalElements === 0) {
            $(tabId + ' .table').addClass('invisible');
            $(tabId + ' .pagination').addClass('invisible');
        } else {
            $(tabId + ' .table').removeClass('invisible');
            $(tabId + ' .pagination').removeClass('invisible');
        }

    }

	function searchFiles(tabId) {
		$(tabId + " .table tbody tr" ).each( function(){
			  this.parentNode.removeChild( this );
		});
		var totalElements = 0;
		var count = 0;
		var queryObj = $.fn.buildWellQueryObject();
		if(apiNumbers.length > 0) {
			var urlService = getURLService(tabId);
			var currentPage = getTabCurrentPage(tabId);
            $.ajax({
                    url: urlService,
                    dataType: "json",
                    contentType: "application/json",
                    method: "POST",
                    //data: JSON.stringify(apiNumbers),
                    data: queryObj,
                    success: function (jsonData) {
                        //console.log(tabId + " data: " + JSON.stringify(jsonData));
                        totalElements = jsonData.files.length;
                        for (var i = 0; i < totalElements; i++) {
                            addRowToTable(tabId, i+1, jsonData.files[i]);
                        }
                        $(tabId + '-span').text(totalElements);
                        managePagination(tabId, jsonData, totalElements, currentPage);
                    },
                    error: function (data) {
                        alert(data);
                            console.log(JSON.stringify(data,null,4));
                    }
            });
		} else {
			$(tabId + '-span').text(totalElements);
		}
	}

	$.fn.searchWells = function(queryCriteria) {
		apiNumbers = new Array();
        $.ajax({
            url: WELL_HEADER_URL,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            data: queryCriteria,
            success: function (jsonData) {
            	//Use the data to update the map
            	//console.log("searchWells result: " + JSON.stringify(jsonData));
            	wellHeaders = jsonData.files;
                // Options
            	//TODO - Use the wellHeaders info to calculate a better central point
                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(47.97, -103.14),
        			mapTypeId: 'terrain'
                }
                // Apply options
                map = new google.maps.Map($('.well-map')[0], mapOptions);

                var wellHeaderCount = document.createElement('div');
                wellHeaderCount.id = 'wellHeaderCountId';
                //var content = [];
                //content.push('<p>Wells: ' + jsonData.count + '</p>');
                //wellHeaderCount.innerHTML = content.join('');
                //wellHeaderCount.index = 1;
                //map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(wellHeaderCount);

                var singleLaterals = $.grep(jsonData.files, function(v) {
                	return v.multilateral === "false";
                });
                $("#totalSinglelateralWells").html(singleLaterals.length);
                var multiLateral = $.grep(jsonData.files, function(v) {
                	return v.multilateral === "true";
                });
                $("#totalMultilateralWells").html(multiLateral.length);
                setWellHeaderMarkers(map, jsonData.files, apiNumbers);
                resetPagination();

                //remove well header rows and rebuild them
                $('#wellheader-tab-span').text(jsonData.files.length);
                $("#wellheader-tab .table tbody tr" ).each( function(){
                    this.parentNode.removeChild( this );
                });
                for (var i = 0; i < jsonData.files.length; i++) {
                    addRowToTable('#wellheader-tab', i+1, jsonData.files[i]);
                }
                managePagination('#wellheader-tab', jsonData, jsonData.files.length, 0);

				searchFiles('#forms-tab');
				searchFiles('#wellfile-tab');
				searchFiles('#scoutticket-tab');
				searchFiles('#curves-tab');
				searchFiles('#ff-tab');
            },
            error: function (data) {
                console.log(JSON.stringify(data,null,4));
            }
        });
    }

    $.fn.buildWellQueryObject = function() {

    	//`<label class="checkbox-inline">
		//<input type="checkbox" class="styled" `+checkedAttr+`>
		//` + value + `
	    //</label>
    	var selectedDataSources = [];
    	$('#datasourceGroup :checkbox:checked').each(
    		function(index, input) {
    			selectedDataSources.push(input.parentElement.textContent.trim());
    		}
    	);

    	var selectedFormationSelector = [];
    	$('#formationSelectorGroup :checkbox:checked').each(
    		function(index, input) {
    			selectedFormationSelector.push(input.parentElement.parentElement.parentElement.textContent.trim());
    		}
    	);

    	var selectedLateralSelector = [];
    	$('#lateralSelectorGroup :checkbox:checked').each(
    		function(index, input) {
    			selectedLateralSelector.push(input.parentElement.parentElement.parentElement.textContent.trim());
    		}
    	);

        var latLenSliderData = $("#ion-lateral-length").data("ionRangeSlider");
        var lateralLen =  {
        	"selectedMinValue": latLenSliderData.result.from,
            "selectedMaxValue": latLenSliderData.result.to,
            "enabled" : $("#lateralLengthSwitch")[0].checked
        };

        var totalPropantSliderData = $("#ion-total-proppant").data("ionRangeSlider");
        var propantUsed =  {
            "selectedMinValue": totalPropantSliderData.result.from,
            "selectedMaxValue": totalPropantSliderData.result.to,
            "enabled" : $("#totalPropantSwitch")[0].checked
        };

        var totalFluidSliderData = $("#ion-total-fluid").data("ionRangeSlider");
        var fluidUsed =  {
            "selectedMinValue": totalFluidSliderData.result.from,
            "selectedMaxValue": totalFluidSliderData.result.to,
            "enabled" : $("#totalFluidSwitch")[0].checked
        };

        var stageCountSliderData = $("#ion-stage-count").data("ionRangeSlider");
        var stageCount =  {
            "selectedMinValue": stageCountSliderData.result.from,
            "selectedMaxValue": stageCountSliderData.result.to,
            "enabled" : $("#stageCountSwitch")[0].checked
        };

        var propantRatioSliderData = $("#ion-proppant-ratio").data("ionRangeSlider");
        var propantFtRatio =  {
            "selectedMinValue": propantRatioSliderData.result.from,
            "selectedMaxValue": propantRatioSliderData.result.to,
            "enabled" : $("#propantFtSwitch")[0].checked
        };

        var fluidRatioSliderData = $("#ion-fluid-ratio").data("ionRangeSlider");
        var fluidFtRatio =  {
            "selectedMinValue": fluidRatioSliderData.result.from,
            "selectedMaxValue": fluidRatioSliderData.result.to,
            "enabled" : $("#fluidFtSwitch")[0].checked
        };

        var propantStageRatioSliderData = $("#ion-proppant-stage-ratio").data("ionRangeSlider");
        var propantStageRatio =  {
            "selectedMinValue": propantStageRatioSliderData.result.from,
            "selectedMaxValue": propantStageRatioSliderData.result.to,
            "enabled" : $("#propantStageRatioSwitch")[0].checked
        };

        var fluidStageRatioSliderData = $("#ion-fluid-stage-ratio").data("ionRangeSlider");
        var fluidStageRatio =  {
            "selectedMinValue": fluidStageRatioSliderData.result.from,
            "selectedMaxValue": fluidStageRatioSliderData.result.to,
            "enabled" : $("#fluidStageRatioSwitch")[0].checked
        };

        //Set the date criteria
        var dateSelectionValue = $('input[name=radio-dateselector]:checked').val();
        //console.log('date selection: ' + dateSelectionValue);
        var startDate = $('#reportrange').data('daterangepicker').startDate._d;
        var endDate = $('#reportrange').data('daterangepicker').endDate._d

        var dateSelectionData = {
            "selectedMinValue" : startDate.getTime(),
            "selectedMaxValue" : endDate.getTime(),
            "enabled" : true
        };

        var queryObject = {
            "lateralLength"           : lateralLen,
            "propantUsed"             : propantUsed,
            "fluidUsed"               : fluidUsed,
            "stageCount"              : stageCount,
            "propantFtRatio"          : propantFtRatio,
            "fluidFtRatio"            : fluidFtRatio,
            "propantStageRatio"       : propantStageRatio,
            "fluidStageRatio"         : fluidStageRatio,
            "selectedDataSources"     : selectedDataSources,
            "selectedFormationSelector": selectedFormationSelector,
            "selectedLateralSelector" : selectedLateralSelector,
        };
        queryObject[dateSelectionValue] = dateSelectionData;
        return JSON.stringify(queryObject);
    }


	// Initialize Date Picker with Options
    $('#reportrange').daterangepicker(
        {
            startDate: moment().subtract(730, 'days'),
            endDate: moment(),
            //TODO - set minDate and maxDate using the server data
            minDate: '01/01/2008',
            maxDate: '12/31/2017',
            dateLimit: { days: 3650 },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
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
    $('#reportrange .daterange-custom-display').html(moment().subtract(730, 'days').format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>') + '<em> – </em>' + moment().format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>'));
    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
    	  //Update the map when the Apply button is clicked.
    	 updateMapOnFinish();
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

	// Multiselect for Date Range
    $('.multiselect').multiselect({
        buttonWidth: '100%',
        onChange: function() {
            $.uniform.update();
        }
    });
	
	 $('.multiselect-formations').multiselect({
        onChange: function() {
            updateMapOnFinish();
        }
    });
	

	// Checkboxes, radios
    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

	// Switchery toggles
    if (Array.prototype.forEach) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery'));
        elems.forEach(function(html) {
            var switchery = new Switchery(html);
        });
    }
    else {
        var elems = document.querySelectorAll('.switchery');
        for (var i = 0; i < elems.length; i++) {
            var switchery = new Switchery(elems[i]);
        }
    }

	// Lateral Length Slider
    $("#ion-lateral-length").ionRangeSlider({
        grid: true,
        type: "double",
        min: 10000,
        max: 50000,
        from: 25500,
        to: 35000,
        drag_interval: true,
		postfix: " Ft",
        prettify_separator: ",",
		onFinish : function() {
					   updateMapOnFinish();
				   }
    });

	// Total Proppant Slider
    $("#ion-total-proppant").ionRangeSlider({
        grid: true,
        type: "double",
        min: 1000,
        max: 50000,
        from: 17500,
        to: 35000,
        drag_interval: true,
		postfix: " Lb",
        prettify_separator: ",",
		onFinish : function() {
			           updateMapOnFinish();
		           }
    });

	// Total Fluid Slider
    $("#ion-total-fluid").ionRangeSlider({
        grid: true,
        type: "double",
        min: 1000,
        max: 500000,
        from: 270500,
        to: 330000,
        drag_interval: true,
		postfix: " Bbl",
        prettify_separator: ",",
		onFinish : function() {
	                   updateMapOnFinish();
                   }
    });

	// Stage Count Slider
    $("#ion-stage-count").ionRangeSlider({
        grid: true,
        type: "double",
        min: 1,
        max: 100,
        from: 12,
        to: 44,
        drag_interval: true,
		prefix: "#",
        prettify_separator: ",",
		//disable: false,
		onFinish : function() {
	                   updateMapOnFinish();
                   }
    });

	// Proppant P/FT Ratio
    $("#ion-proppant-ratio").ionRangeSlider({
        grid: true,
        type: "double",
        min: 1000,
        max: 50000,
        from: 14500,
        to: 29000,
        drag_interval: true,
		postfix: " Lb/Ft",
        prettify_separator: ",",
		onFinish : function() {
	                   updateMapOnFinish();
                   }
    });

	// Fluid P/FT Ratio
    $("#ion-fluid-ratio").ionRangeSlider({
        grid: true,
        type: "double",
        min: 1000,
        max: 50000,
        from: 14500,
        to: 29000,
        drag_interval: true,
		postfix: " Bbl/Ft",
        prettify_separator: ",",
		onFinish : function() {
	                   updateMapOnFinish();
                   }
    });

	// Proppant P/Stage Ratio
    $("#ion-proppant-stage-ratio").ionRangeSlider({
        grid: true,
        type: "double",
        min: 1000,
        max: 50000,
        from: 14500,
        to: 29000,
        drag_interval: true,
		postfix: " Lb/Stage",
        prettify_separator: ",",
		onFinish : function() {
	                   updateMapOnFinish();
                   }
    });

	// Fluid P/Stage Ratio
    $("#ion-fluid-stage-ratio").ionRangeSlider({
        grid: true,
        type: "double",
        min: 1000,
        max: 50000,
        from: 14500,
        to: 29000,
        drag_interval: true,
		postfix: " Bbl/Stage",
        prettify_separator: ",",
		onFinish : function() {
	                   updateMapOnFinish();
                   }
    });

    function updateMapOnFinish(data) {
        var queryObj = $.fn.buildWellQueryObject();
        $.fn.searchWells(queryObj);
    }

    //Configures the Switchery for event handling
    function setSwitchery(switchElement, checkedBool, slider) {
        if((checkedBool && !switchElement.checked) || (!checkedBool && switchElement.checked)) {
        	switchElement.click();
        }
        switchElement.addEventListener('click', function(){
        	slider.update({
                disable: !switchElement.checked
            });
        	updateMapOnFinish();
        });
    }

	// Google Maps Integration

    // Map settings
    function initializeGoogleMaps() {

        // Options
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(46.9, -102.8),
			mapTypeId: 'terrain'
        }

        // Apply options
        var map = new google.maps.Map($('.well-map')[0], mapOptions);

        // Set markers
        setMarkers(map, wells);

    }


    /**
    * Data for the markers consisting of a name, a LatLng and a zIndex for
    * the order in which these markers should display on top of each
    * other.
    */
    var wells = [
        // ['Well 1', 47.045542, -103.072856, 4],
        // ['Well 2', 47.056842, -102.797856, 5],
        // ['Well 3', 46.824542, -102.640856, 3],
        // ['Well 4', 47.846542, -103.272856, 2],
        // ['Well 5', 46.758542, -102.619856, 1]
    ];

    // Set markers
    function setWellHeaderMarkers(map, wellHeaders, apiNumbers) {

        // Add markers to the map

        // Marker sizes are expressed as a Size of X,Y
        // where the origin of the image (0,0) is located
        // in the top left of the image.

        // Origins, anchor positions and coordinates of the marker
        // increase in the X direction to the right and in
        // the Y direction down.
        var imageGreen = {
            url: 'assets/images/ui/map_marker3.png',

            // This marker is 20 pixels wide by 32 pixels tall.
            scaledSize: new google.maps.Size(40, 40),

            // The origin for this image is 0,0.
            origin: new google.maps.Point(0,0),

            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(0, 32)
        };
        var imagePurple = {
                url: 'assets/images/ui/map_marker4.png',

                // This marker is 20 pixels wide by 32 pixels tall.
                scaledSize: new google.maps.Size(40, 40),

                // The origin for this image is 0,0.
                origin: new google.maps.Point(0,0),

                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
        };

        // Shapes define the clickable region of the icon.
        // The type defines an HTML <area> element 'poly' which
        // traces out a polygon as a series of X,Y points. The final
        // coordinate closes the poly by connecting to the first
        // coordinate.
        var shape = {
            coords: [1, 1, 1, 40, 40, 40, 40 , 1],
            type: 'poly'
        };

        /* Well Header example:
         * {
                "name":"WHITE 5198 12-6 4T2",
                "active":true,
                "latitude":47.93421388,
                "longitude":-103.2757833,
                "operator":"OASIS PETROLEUM NORTH AMERICA LLC",
                "reservoir":"3FORKS-2ND",
                "type":"DEV",
                "api_no":"33053057090000"
            }
         * */
        if (!infowindow) {
            infowindow = new google.maps.InfoWindow({content: ''});
            infowindow.addListener('closeclick', function() {
                unhighlightInTabs();
            });
        }
        var totalWellsPlotted = 0;
        for (var i = 0; i < wellHeaders.length; i++) {
            var wellHeader = wellHeaders[i];
            if(wellHeader.name && wellHeader.api_no) {
            	var myLatLng = new google.maps.LatLng(wellHeader.latitude, wellHeader.longitude);
            	var contentString = '<div id="content">'+
            	'<h4 class="text-uppercase">' + wellHeader.name + '</h4>'+
            	'<h6 class="no-margin"><span class="text-semibold">API: ' + wellHeader.api_no + '</span><span class="label label-success position-right">ACTIVE WELL</span><small class="display-block">Latitude: ' + wellHeader.latitude + '</small><small class="display-block">Longitude: ' + wellHeader.longitude + '</small></h6> '+
                '<div class="mt-10"><span class="text-semibold">OPERATOR:</span> ' + wellHeader.operator + '</div> ';
                
                if(wellHeader.type) {
                    contentString += '<div class="mt-5"><span class="text-semibold">WELL TYPE:</span> ' + wellHeader.type + '</div> ';
                }
                contentString +='</div>';

            	var img = imageGreen;
            	console.log(wellHeader.multilateral);
            	if(wellHeader.multilateral == 'true') {
            		img = imagePurple;
            	}
            	var marker = new google.maps.Marker({
            		position: myLatLng,
            		map: map,
            		icon: img,
            		shape: shape,
            		title: wellHeader.name,
                    apiNumber: wellHeader.api_no,
            		zIndex: i,
            		wellHeaderText: contentString
            	});

            	marker.addListener('click', function() {
            	    openInfoWindow(map, this);
            	    highlightAPIInTabs(this.apiNumber);
            	});
            	if(wellHeader && wellHeader.api_no) {
            	    wellHeader.marker = marker;
            		apiNumbers.push(wellHeader.api_no);
            	}
            	totalWellsPlotted++;
            }

        }
        $("#totalWellsPlotted").html(totalWellsPlotted);
    }

    function openInfoWindow(map, marker) {
        infowindow.setContent(marker.wellHeaderText);
        infowindow.open(map, marker);
    }

    function highlightMarkerForAPI(apiNumber) {
        if (!!wellHeaders) {
            for (var i = 0; i < wellHeaders.length; i++) {
                var wellHeader = wellHeaders[i];
                if (wellHeader.api_no === apiNumber) {
                    openInfoWindow(map, wellHeader.marker);
                    return;
                }
            }
        }
    }

    function highlightAPIInTabs(apiNumber) {
        //use the provided apiNumber to highlight/focus/filter tabs
        $('#wellheader-tab .table tbody tr').not(':contains(' + apiNumber + ')').hide();
        $('#wellheader-tab .table tbody tr:contains(' + apiNumber + ')').show();
        $('#forms-tab .table tbody tr').not(':contains(' + apiNumber + ')').hide();
        $('#forms-tab .table tbody tr:contains(' + apiNumber + ')').show();
        $('#wellfile-tab .table tbody tr').not(':contains(' + apiNumber + ')').hide();
        $('#wellfile-tab .table tbody tr:contains(' + apiNumber + ')').show();
        $('#scoutticket-tab .table tbody tr').not(':contains(' + apiNumber + ')').hide();
        $('#scoutticket-tab .table tbody tr:contains(' + apiNumber + ')').show();
        $('#curves-tab .table tbody tr').not(':contains(' + apiNumber + ')').hide();
        $('#curves-tab .table tbody tr:contains(' + apiNumber + ')').show();
        $('#ff-tab .table tbody tr').not(':contains(' + apiNumber + ')').hide();
        $('#ff-tab .table tbody tr:contains(' + apiNumber + ')').show();
    }

    function unhighlightInTabs() {
        //restore tabs to non-highlighted/focused/filtered state
        $('#wellheader-tab .table tbody tr').show();
        $('#forms-tab .table tbody tr').show();
        $('#wellfile-tab .table tbody tr').show();
        $('#scoutticket-tab .table tbody tr').show();
        $('#curves-tab .table tbody tr').show();
        $('#ff-tab .table tbody tr').show();
    }

    // Set markers
    function setMarkers(map, locations) {

        // Add markers to the map

        // Marker sizes are expressed as a Size of X,Y
        // where the origin of the image (0,0) is located
        // in the top left of the image.

        // Origins, anchor positions and coordinates of the marker
        // increase in the X direction to the right and in
        // the Y direction down.
        var image = {
            url: 'assets/images/ui/map_marker3.png',

            // This marker is 20 pixels wide by 32 pixels tall.
            scaledSize: new google.maps.Size(40, 40),

            // The origin for this image is 0,0.
            origin: new google.maps.Point(0,0),

            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(0, 32)
        };


        // Shapes define the clickable region of the icon.
        // The type defines an HTML <area> element 'poly' which
        // traces out a polygon as a series of X,Y points. The final
        // coordinate closes the poly by connecting to the first
        // coordinate.
        var shape = {
            coords: [1, 1, 1, 40, 40, 40, 40 , 1],
            type: 'poly'
        };
        for (var i = 0; i < locations.length; i++) {
            var wells = locations[i];
            var myLatLng = new google.maps.LatLng(wells[1], wells[2]);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: image,
                shape: shape,
                title: wells[0],
                zIndex: wells[3]
            });
			marker.addListener('click', function() {
			  infowindow.open(map, marker);
			});
			var infowindow = new google.maps.InfoWindow({
			  content: contentString
			});
			var contentString = '<div id="content">'+
            '<h4 class="text-uppercase">... </h4>'+
            '<h6 class="no-margin"><span class="text-semibold">API: ...</span><span class="label label-success position-right">...</span><small class="display-block">Latitude: ...</small><small class="display-block">Longitude: ...</small></h6> '+
            '<div class="mt-10"><span class="text-semibold">OWNER:</span> ...</div> '+
            '<div class="mt-5"><span class="text-semibold">WELL TYPE:</span> ...</div> '+
            '</div>';
        }
    }


    // Load maps
    google.maps.event.addDomListener(window, 'load', initializeGoogleMaps);


	// Initialize responsive functionality for Well Data Tables
    $('.table-toggle-responsive').footable();

	//Trying to get the split margin to toggle on and off based on clicking the hide sidebar button
	$( ".sidebar-secondary-hide" ).click(function() {
	  $(".removeMargin").toggleClass( "splitMargin" );
	});

	//Table Pagination
	$('.bootpag-separated').bootpag({
        total: 20,
        maxVisible: 6,
        leaps: false
        }).on("page", function(event, num){
            $(".content-separated").html("Page " + num); // or some ajax content loading...
    }).children('.pagination').addClass('pagination-separated pagination-sm');

	// Bootstrap Selects
    $('.bootstrap-select').selectpicker();

	// Open jQuery File Modal
    $('#file-modal').dialog({
        autoOpen: false,
        width: 400,
		resizable: false,
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
                text: 'Open File',
                icons: {
                    primary: 'icon-square-up-right'
                },
                click: function() {
                    $(this).dialog('close');
                }
            },
            {
                text: 'Cancel',
                icons: {
                    primary: 'icon-cross3'
                },
                click: function() {
                    $(this).dialog('close');
                }
            }
        ],
    });

    $('body').on('click', '#api-marker-opener', function(event) {
        var api = event.currentTarget.innerHTML;
        highlightMarkerForAPI(api);
    });

    $('body').on('click', '#curve-pdf-refresher', function(event) {
        var api = event.currentTarget.getAttribute('data-api-number');
        refreshCurvePDF(api);
    });

    $('body').on('click', '#form-pdf-refresher', function(event) {
        var api = event.currentTarget.getAttribute('data-api-number');
        refreshFormPDF(api);
    });

    $('body').on('click', '#scout-ticket-refresher', function(event) {
        var api = event.currentTarget.getAttribute('data-api-number');
        refreshScoutTicket(api);
    });


    //TODO rework opening of modal viewer dialog (not rely on filesValues but be contextual to object)
    $('body').on('click', '#file-modal-opener', function(event) {
    	var fileName = event.currentTarget.innerHTML;
    	var name = (fileName.substr(0, fileName.indexOf('.'))).toUpperCase();
    	var ext = fileName.substr(fileName.indexOf('.'), fileName.length);
    	fileName = name + ext;
    	$('.ui-dialog-title').text('File: ' + fileName);
    	$('.icon-square-up-right').parent().click(function() {
    		  window.open('/assets/files/' + fileName, '_blank');
    		  $('.icon-square-up-right').parent().unbind( 'click');
    		  $('#file-modal').dialog('close');
    	});
    	$('#file-modal .col-md-8 p').text('This is the Form 6 report for well ' + filesValues.get(fileName));
    	$('#file-modal').dialog('open');
    });


    valueOrDefault = function(value, fallback) {
        if (null === value || typeof value === "undefined") return fallback;
        return value;
    };


    $(document).ready(function () {
        $.ajax({
            url: WELL_SEARCH_URL,
            dataType: "json",
            mimeType: "application/json",
            success : function (jsonData) {
                
            	//Create the datasource inputs
            	$.each(jsonData.availableDataSources, function(index, value) {
            		var checkedAttr = $.inArray(value, jsonData.selectedDataSources) == -1 ? "": "checked";
            		$("#datasourceGroup").append(
            			`<label class="checkbox-inline">
							<input id="` + value + `" type="checkbox" class="styled" ` + checkedAttr +`>
							` + value + `
						</label>
						<br/>`
            		);
            	});

            	//Add the event handlers to the checkboxes
            	$("#datasourceGroup :checkbox").change(
            		function(){
            		    updateMapOnFinish();
            		}
            	);

            	$("#lateralSelectorGroup :checkbox").change(
                		function(){
                		    updateMapOnFinish();
                		}
                );



                var latLenData = $("#ion-lateral-length").data("ionRangeSlider");
                latLenData.update({
                    min: jsonData.lateralLength.minValue,
                    max: jsonData.lateralLength.maxValue, //TODO - This MAX value seems wrong, it is too high, jsonData.lateralLength.maxValue,
                    from:      0,
                    to:   200000,
                    disable: !jsonData.lateralLength.enabled
                });
                setSwitchery($("#lateralLengthSwitch")[0], jsonData.lateralLength.enabled, latLenData);

                var totalPropantData = $("#ion-total-proppant").data("ionRangeSlider");
                totalPropantData.update({
                    min: jsonData.propantUsed.minValue,
                    max: jsonData.propantUsed.maxValue,
                    from:   10000,
                    to:   3500000,
                    disable: !jsonData.propantUsed.enabled
                });
                setSwitchery($("#totalPropantSwitch")[0], jsonData.propantUsed.enabled, totalPropantData);

                var totalFluidData = $("#ion-total-fluid").data("ionRangeSlider");
                totalFluidData.update({
                    min:  jsonData.fluidUsed.minValue,
                    max:  jsonData.fluidUsed.maxValue,
                    from:  10000,
                    to:   300000,
                    disable: !jsonData.fluidUsed.enabled
                });
                setSwitchery($("#totalFluidSwitch")[0], jsonData.fluidUsed.enabled, totalFluidData);

                var stageCountData = $("#ion-stage-count").data("ionRangeSlider");
                stageCountData.update({
                    min: jsonData.stageCount.minValue,
                    max: jsonData.stageCount.maxValue,
                    from:    0,
                    to:   5000,
                    disable: !jsonData.stageCount.enabled
                });
                setSwitchery($("#stageCountSwitch")[0], jsonData.stageCount.enabled, stageCountData);

                var propantFtRatioData = $("#ion-proppant-ratio").data("ionRangeSlider");
                propantFtRatioData.update({
                    min: valueOrDefault(jsonData.propantFtRatio.minValue, propantFtRatioData.min),
                    max: valueOrDefault(jsonData.propantFtRatio.maxValue, propantFtRatioData.max),
                    from: propantFtRatioData.from,
                    to: propantFtRatioData.to,
                    disable: !jsonData.propantFtRatio.enabled
                });
                setSwitchery($("#propantFtSwitch")[0], jsonData.propantFtRatio.enabled, propantFtRatioData);

                // Fluid P/FT Ratio
                var fluidFtRatioData = $("#ion-fluid-ratio").data("ionRangeSlider");
                fluidFtRatioData.update({
                    min: valueOrDefault(jsonData.fluidFtRatio.minValue, fluidFtRatioData.min),
                    max: valueOrDefault(jsonData.fluidFtRatio.maxValue, fluidFtRatioData.max),
                    from: fluidFtRatioData.from,
                    to: fluidFtRatioData.to,
                    disable: !jsonData.fluidFtRatio.enabled
                });
                setSwitchery($("#fluidFtSwitch")[0], jsonData.fluidFtRatio.enabled, fluidFtRatioData);

                var propantStageRatioData = $("#ion-proppant-stage-ratio").data("ionRangeSlider");
                propantStageRatioData.update({
                    min: valueOrDefault(jsonData.propantStageRatio.minValue, propantStageRatioData.min),
                    max: valueOrDefault(jsonData.propantStageRatio.maxValue, propantStageRatioData.max),
                    from: propantStageRatioData.from,
                    to: propantStageRatioData.to,
                    disable: !jsonData.propantStageRatio.enabled
                });
                setSwitchery($("#propantStageRatioSwitch")[0], jsonData.propantStageRatio.enabled, propantStageRatioData);

                var fluidStageRatioData = $("#ion-fluid-stage-ratio").data("ionRangeSlider");
                fluidStageRatioData.update({
                    min: valueOrDefault(jsonData.fluidStageRatio.minValue, fluidStageRatioData.min),
                    max: valueOrDefault(jsonData.fluidStageRatio.maxValue, fluidStageRatioData.max),
                    from: fluidStageRatioData.from,
                    to: fluidStageRatioData.to,
                    disable: !jsonData.fluidStageRatio.enabled
                });
                setSwitchery($("#fluidStageRatioSwitch")[0], jsonData.fluidStageRatio.enabled, fluidStageRatioData);

                updateMapOnFinish();
            },
            error: function (data) {
                console.log(JSON.stringify(data,null,4));
                alert("Error " + data);
            }
        });

        socket = new ReconnectingWebSocket(WEBSOCKET_URL, [], {debug: false});
        connectStomp();
        socket.addEventListener('open', () => {
            console.log("ReconnectingWebSocket is open");
            connectStomp();
        });
        socket.addEventListener('close', () => {
            console.log("ReconnectingWebSocket is closed");
        });
    });


    function connectStomp() {
        //set up reconnect for websocket on disconnect
        console.log("in connectStomp()");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected Stomp: ' + frame);
            subscribeStomp();
        }, function (error) {
            console.log("Stomp failure with error " + error);
        });
    }

    function subscribeStomp() {
        stompClient.subscribe(STOMP_TOPIC_CURVE_PDFS, function (msg) {
            didUpdateCurvePDFs(JSON.parse(msg.body));
        });
        stompClient.subscribe(STOMP_TOPIC_FORM_PDFS, function (msg) {
            didUpdateFormPDFs(JSON.parse(msg.body));
        });
        stompClient.subscribe(STOMP_TOPIC_SCOUT_TICKETS, function (msg) {
            didUpdateScoutTickets(JSON.parse(msg.body));
        });
    }

    function disconnectStomp() {
        if (stompClient !== null) {
            stompClient.disconnect();
            stompClient = null;
            console.log("Disconnected Stomp");
        }
    }

    // function sendName() {
    //     stompClient.send("/stomp/hello", {}, JSON.stringify({'name': $("#name").val()}));
    // }


    function refreshCurvePDF(apiNumber) {
        $.ajax({
            url: NDIC_CURVES_PDF_REFRESH_URL + apiNumber,
            method: "GET",
            success: function (data) {
                console.log('Requested refresh of curve PDF ' + apiNumber + ': ' + JSON.stringify(data, null, 4));
            },
            error: function (data) {
                console.log('error on curve PDF refresh request of ' + apiNumber + ': ' + JSON.stringify(data, null, 4));
            }

        });
    }

    function refreshFormPDF(apiNumber) {
        $.ajax({
            url: NDIC_FORMS_PDF_REFRESH_URL + apiNumber,
            method: "GET",
            success: function (data) {
                console.log('Requested refresh of form pdf ' + apiNumber + ': ' + JSON.stringify(data, null, 4));
            },
            error: function (data) {
                console.log('error on form pdf refresh request of ' + apiNumber + ': ' + JSON.stringify(data, null, 4));
            }

        });
    }

    function refreshScoutTicket(apiNumber) {
        $.ajax({
            url: NDIC_SCOUT_TICKET_REFRESH_URL + apiNumber,
            method: "GET",
            success: function (data) {
                console.log('Requested refresh of scout ticket ' + apiNumber + ': ' + JSON.stringify(data, null, 4));
            },
            error: function (data) {
                console.log('error on scout ticket refresh request of ' + apiNumber + ': ' + JSON.stringify(data, null, 4));
            }

        });
    }

    function didUpdateCurvePDFs(message) {
        //console.log("Message: " + STOMP_TOPIC_CURVE_PDFS);// + " " + JSON.stringify(message));
        updateTableRowHTML('#curves-tab', message, buildCurvesTableRowHTML);
    }

    function didUpdateFormPDFs(message) {
        //console.log("Message: " + STOMP_TOPIC_FORM_PDFS;// + " " + JSON.stringify(message));
        updateTableRowHTML('#forms-tab', message, buildFormsTabTableRowHTML);
    }

    function didUpdateScoutTickets(message) {
        //console.log("Message: " + STOMP_TOPIC_SCOUT_TICKETS;// + " " + JSON.stringify(message));
        updateTableRowHTML('#scoutticket-tab', message, buildScoutTicketTableRowHTML);
    }

    $('#data-tabs a').click(function (e) {
    	  e.preventDefault();
    	  selectedTab = $(this).context.hash;
    });

    $('.pagination a').click(function (e) {
    	getTabCurrentPage(selectedTab, $(this).text() - 1);
    	setTabCurrentPage(selectedTab, $(this).text() - 1);
    	searchFiles(selectedTab);
    	$(selectedTab + ' .pagination li.active').removeClass('active');
    	$(this).addClass('active');
    });

    function getURLService(tabId) {
    	var service = '';
    	switch(tabId){
            case '#forms-tab':
                service = NDIC_FORMS_URL + ndicForm6CurrentPage;
                break;
            case '#scoutticket-tab':
                service = NDIC_SCOUT_TICKET_URL + ndicScoutTicketCurrentPage;
                break;
            case '#wellfile-tab':
                service = NDIC_WELL_HEADER_URL + ndicWellHeaderCurrentPage;
                break;
    		case '#curves-tab':
    			service = NDIC_CURVES_URL + ndicWellHeaderLogsCurrentPage;
    		    break;
    		case '#ff-tab':
    			service = FRAC_FOCUS_URL + fracFocusCurrentPage;
    		    break;
    	}
    	return service;
    }

    function getTabCurrentPage(tabId, value) {
    	var page = 0;
    	switch(tabId) {
            case '#forms-tab':
                page = ndicForm6CurrentPage;
                break;
            case '#scoutticket-tab':
                page = ndicScoutTicketCurrentPage;
                break;
            case '#wellfile-tab':
                page = ndicWellHeaderCurrentPage;
                break;
    		case '#curves-tab':
    			page = ndicWellHeaderLogsCurrentPage;
    		    break;
    		case '#ff-tab':
    			page = fracFocusCurrentPage;
    		    break;
    	}
    	return page;
    }

    function setTabCurrentPage(tabId, value) {
    	switch(tabId) {
			case '#forms-tab':
				ndicForm6CurrentPage = value;
			    break;
            case '#scoutticket-tab':
                ndicScoutTicketCurrentPage = value;
                break;
            case '#wellfile-tab':
                ndicWellHeaderCurrentPage = value;
                break;
			case '#curves-tab':
				ndicWellHeaderLogsCurrentPage = value;
			    break;
			case '#ff-tab':
				fracFocusCurrentPage = value;
			    break;
    	}
    }

    function resetPagination() {
		ndicForm6CurrentPage = 0;
		ndicScoutTicketCurrentPage = 0;
		ndicWellHeaderCurrentPage = 0;
		ndicWellHeaderLogsCurrentPage = 0;
		fracFocusCurrentPage = 0;
        $('#wellheader-tab .pagination li.active').removeClass('active');
        $('#scoutticket-tab .pagination li.active').removeClass('active');
        $('#wellfile-tab .pagination li.active').removeClass('active');
    	$('#curves-tab .pagination li.active').removeClass('active');
    	$('#forms-tab .pagination li.active').removeClass('active');
    	$('#ff-tab .pagination li.active').removeClass('active');
    }

});
