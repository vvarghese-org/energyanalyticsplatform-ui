/* ------------------------------------------------------------------------------
*
*  # Sullexis CI Protoype Main APP
*
*  JS Fire Offs and Includes for Search App
*
*  Version: 1.0
*  Long Live the Fighters
*
* ---------------------------------------------------------------------------- */
$(function() {
	
		
	// Initialize Date Picker with Options
    $('#reportrange').daterangepicker(
        {
            startDate: moment().subtract('days', 29),
            endDate: moment(),
            minDate: '01/01/2015',
            maxDate: '12/31/2016',
            dateLimit: { days: 60 },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                'Last 7 Days': [moment().subtract('days', 6), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
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
    $('#reportrange .daterange-custom-display').html(moment().subtract('days', 29).format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>') + '<em> – </em>' + moment().format('<i>D</i> <b><i>MMM</i> <i>YYYY</i></b>'));
	
	// Multiselect for Date Range
    $('.multiselect').multiselect({
        buttonWidth: '100%',
        onChange: function() {
            $.uniform.update();
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
	
	// Initialize responsive functionality for Well Info Tables
    $('.table-toggle-responsive').footable();
	
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
	
    $('#file-modal-opener').click(function() {
        $('#file-modal').dialog('open');
    });
	
	    
});