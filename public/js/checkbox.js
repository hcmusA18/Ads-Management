$(document).ready(function () {
    const checkboxes = $('.form-check-input');
    const table = $('#table');
    const dataNames = $('.dropdown-menu li a').map(function () {
        return $(this).data('name');
    }).get();

    checkboxes.on('change', function () {
        let checkedValues = checkboxes.filter(':checked')
            .map(function () {
                return $(this).val().replace('Phường ', '');
            })
            .get();

        const stateSelected = $('#dropdownMenuLink').text().trim();
        console.log(stateSelected);

        table.bootstrapTable('refresh');

        if(stateSelected !== ""){
            if(stateSelected === "Tất cả"){
                table.bootstrapTable('filterBy', {
                    state: dataNames.slice(1),
                    ward: checkedValues,
                });
            } else {
                table.bootstrapTable('filterBy', {
                    state: stateSelected,
                    ward: checkedValues,
                });
            }
        } else {
            table.bootstrapTable('filterBy', {
                ward: checkedValues,
            });
        }

    });
});
