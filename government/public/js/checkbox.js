$(document).ready(function () {
    const checkboxes = $('.form-check-input');
    const table = $('#table');
    const dataNames = $('.dropdown-menu li a').map(function () {
        return $(this).data('name');
    }).get();

    const checkboxHeaderText = document.querySelector('.checkbox-container h1').textContent.trim().split(' ')[0];

    // console.log(checkboxHeaderText);


    checkboxes.on('change', function () {
        let checkedValues = checkboxes.filter(':checked')
        if(checkboxHeaderText !== 'Quận'){
            checkedValues = checkedValues.map(function () {
                return $(this).val().replace('Quận ', '');
            })
            .get();
        } else {
            checkedValues = checkedValues.map(function () {
                return $(this).val().replace('Phường ', '');
            })
            .get();
        }
        
        // console.log(checkedValues);
        const stateSelected = $('#dropdownMenuLink').text().trim();
        // console.log(stateSelected);

        table.bootstrapTable('refresh');

        if(checkboxHeaderText !== 'Quận'){
            if(stateSelected !== ''){
                if(stateSelected === 'Tất cả'){
                    table.bootstrapTable('filterBy', {
                        state: dataNames.slice(1),
                        district: checkedValues,
                    });
                } else {
                    // console.log('Initial Data:', table.bootstrapTable('getData'));
                    table.bootstrapTable('filterBy', {
                        state: stateSelected,
                        district: checkedValues,
                    });
                    // console.log('Table Data:', table.bootstrapTable('getData'));
                }
            } else {
                table.bootstrapTable('filterBy', {
                    district: checkedValues,
                });
            }
        } else {
            if(stateSelected !== ''){
                if(stateSelected === 'Tất cả'){
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
        }
    });
});
