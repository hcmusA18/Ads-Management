$(document).ready(function () {
    const dropdownButton = $('#dropdownMenuLink');
    const table = $('#table');

    const dataNames = $('.dropdown-menu li a').map(function () {
        return $(this).data('name');
    }).get();
    
    $('.dropdown-item').on('click', function () {
        const selectedName = $(this).data('name');
        const checkedValues = $('.form-check-input').filter(':checked').map(function () {
            return $(this).val().replace('Phường ', '');
        }).get();
        // console.log(checkedValues);

        dropdownButton.text(selectedName);

        table.bootstrapTable('refresh');

        if(selectedName === "Tất cả"){
            if(checkedValues.length === 0){
                table.bootstrapTable('filterBy', {
                    state: dataNames.slice(1)
                });
            } else {
                table.bootstrapTable('filterBy', {
                    state: dataNames.slice(1),
                    ward: checkedValues,
                });
            }
        } else {
            if(checkedValues.length === 0){
                table.bootstrapTable('filterBy', {
                    state: selectedName
                });
            } else {
                table.bootstrapTable('filterBy', {
                    state: selectedName,
                    ward: checkedValues,
                });
            }
        }
    });
});

