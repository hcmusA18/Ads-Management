$(document).ready(function () {
    const checkboxes = $('.form-check-input');
    const table = $('#table');

    checkboxes.on('change', function () {
        let checkedValues = checkboxes.filter(':checked')
            .map(function () {
                return $(this).val().replace('Phường ', '');
            })
            .get();

        // console.log(checkedValues);

        table.bootstrapTable('refresh');

        table.bootstrapTable('filterBy', {
            ward: checkedValues
        });
    });
});
