$(document).ready(function () {
    const dropdownButton = $('#dropdownMenuLink');
    const table = $('#table');
    const checkboxHeaderText = document.querySelector('.checkbox-container h1').textContent.trim().split(' ')[0];

    const dataNames = $('.dropdown-menu li a').map(function () {
        return $(this).data('name');
    }).get();
    
    // console.log(dataNames);

    $('.dropdown-item').on('click', function () {
        const selectedName = $(this).data('name');
        const checkedValues = $('.form-check-input').filter(':checked').map(function () {
            return $(this).val().replace('Phường ', '');
        }).get();

        dropdownButton.text(selectedName);

        table.bootstrapTable('refresh');

        if(checkboxHeaderText !== 'Quận'){
            if(selectedName === 'Tất cả'){
                if(checkedValues.length === 0){
                    table.bootstrapTable('filterBy', {
                        state: dataNames.slice(1)
                    });
                } else {
                    // console.log('Initial Data:', table.bootstrapTable('getData'));
                    table.bootstrapTable('filterBy', {
                        state: dataNames.slice(1),
                        district: checkedValues,
                    });
                    // table.bootstrapTable('refresh');
                    // console.log('Table data:', table.bootstrapTable('getData'));
                }
            } else {
                if(checkedValues.length === 0){
                    table.bootstrapTable('filterBy', {
                        state: selectedName
                    });
                } else {
                    table.bootstrapTable('filterBy', {
                        state: selectedName,
                        district: checkedValues,
                    });
                    // console.log('Table data:', table.bootstrapTable('getData'));
                }
            }
        } else {
            if(selectedName === 'Tất cả'){
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
        }
    });
});

