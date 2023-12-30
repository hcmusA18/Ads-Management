var $j = jQuery.noConflict();
var options={
    format: 'mm/dd/yyyy',
    todayHighlight: true,
    autoclose: true,
    orientation: 'bottom'
};
$j('#datepicker').datepicker(options);
