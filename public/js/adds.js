function updatPageCheckBox(){
    let NoCheckBoxs = document.querySelectorAll('.checkbox-container').length;

    let checkBoxData = [];
    for (let i = 0; i < NoCheckBoxs; i++) {
        let checkBox = document.querySelector('#check'+i);

        const data = {};
        data.id = checkBox.textContent;
        data.check = checkBox.checked;

        checkBoxData.append(data);
    }
}
