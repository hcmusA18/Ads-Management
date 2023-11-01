$(document).ready(function () {
    const accountData = [
        ["giathinnnn", "", "", "", 0],
        ["cokaaa", "", "", "", 0],
        ["ltquannnn", "", "", "", 0],
        ["tohaaaa", "", "", "", 0],
        ["obitooo", "Cán bộ Quận", "Quận 2", "", 1],
        ["ronboogz", "Cán bộ Quận", "Quận 6", "", 1],
        ["weanleee", "Cán bộ Quận", "Quận 7", "", 1],
        ["puhioooo", "Cán bộ Phường", "Quận Bình Tân", "Phường An Lạc", 1],
        ["righttttt", "Cán bộ Phường", "Quận 6", "Phường 5", 1],
        ["naomiiii", "Cán bộ Phường", "Quận Tân Phú", "Phường Tân Quý", 1],
        ["conannnn", "Cán bộ Phường", "Quận Bình Thạnh", "Phường 25", 1],
        ["miraaaa", "Cán bộ Phường", "Quận Tân Bình", "Phường 15", 1],
        ["sherlock", "Cán bộ Phường", "Quận 6", "Phường 6", 1],
    ];

    const block = $("#accountRow");

    block.empty();

    accountData.forEach(function (account, index) {
        // console.log(index);
        let item = $(``);
        if (account[4] == 0) {
            item = $(`
                <tr>    
                    <td>${index + 1}</td>
                    <td>${account[0]}</td>
                    <td>${account[1]}</td>
                    <td>${account[2]}</td>
                    <td>${account[3]}</td>
                    <td>
                    <div
                        class="d-flex flex-row align-items-center justify-content-center action-icons"
                        style="background-color: transparent">
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#assignModal${index}"
                            style="width: 70%; padding-top: 3px; padding-bottom: 3px; background-color: #60c98b; border: none;">
                            Phân công
                        </button>

                        <!-- Modal edit -->
        
                        <div class="modal fade" id="assignModal${index}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header pb-3" style="border: none">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body pt-1 pb-2" style="border: none">
                                <h5 class="modal-title pb-2" style="font-size: 22px; font-weight: 700; text-align: center">
                                CẤP QUYỀN CHO <span style="color: #355ded;">${account[0]}</span>
                                </h5>
                                <form>
                                <div class="d-flex" style="justify-content: space-between;">
                                    <div class="mb-3 d-flex" style="justify-content: space-between;">
                                    <label for="maloai-lhqc" class="col-form-label mb-1">Quận:</label>
                                    <div class="dropdown" style="padding: 7px 0; height: 36.6px; width: 170px; justify-content: flex-end;">
                                        <select class="form-select" aria-label="Default select example" style="width: 95%;"
                                        onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                                        <option selected>Chọn Quận</option>
                                        <option value="1">Quận 1</option>
                                        <option value="2">Quận 2</option>
                                        <option value="3">Quận 3</option>
                                        <option value="4">Quận 4</option>
                                        <option value="5">Quận 5</option>
                                        <option value="6">Quận 6</option>
                                        <option value="7">Quận 7</option>
                                        <option value="8">Quận 8</option>
                                        <option value="9">Quận 9</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div class="mb-3 d-flex" style="justify-content: space-between;">
                                    <label for="loai-lhqc" class="col-form-label mb-1">Phường:</label>
                                    <div class="dropdown" style="padding: 7px 0; height: 36.6px; width: 150px; justify-content: flex-end;">
                                        <select class="form-select" aria-label="Default select example" style="width: 95%;"
                                        onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                                        <option selected>Chọn Phường</option>
                                        <option value="1">Phường 1</option>
                                        <option value="2">Phường 2</option>
                                        <option value="3">Phường 3</option>
                                        <option value="4">Phường 4</option>
                                        <option value="5">Phường 5</option>
                                        <option value="6">Phường 6</option>
                                        <option value="7">Phường 7</option>
                                        <option value="8">Phường 8</option>
                                        <option value="9">Phường 9</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <div
                                class="modal-footer pt-1 d-flex justify-content-around"
                                style="border: none; background-color: #f7fafc">
                                <button
                                type="button"
                                class="btn"
                                data-bs-dismiss="modal"
                                style="min-width: 6.5rem; background-color: #e84747; color: #f7fafc">
                                Hủy
                                </button>
                                <button
                                type="button"
                                class="btn"
                                style="min-width: 6.5rem; background-color: #3c77ff; color: #f7fafc">
                                Xác nhận
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </td>
                </tr>   
            `);
        }
        else {
            item = $(`
                <tr>    
                    <td>${index + 1}</td>
                    <td>${account[0]}</td>
                    <td>${account[1]}</td>
                    <td>${account[2]}</td>
                    <td>${account[3]}</td>
                    <td>
                    <div
                        class="d-flex flex-row align-items-center justify-content-center action-icons"
                        style="background-color: transparent">
                        <a href="" data-bs-toggle="modal" data-bs-target="#editModal-account${index}" class="mx-3">
                            <img src="/images/edit.svg" alt="edit-icon" style="background-color: transparent;">
                        </a>
                        <a href="#" class="mx-3">
                            <img src="/images/remove.svg" alt="edit-icon" style="background-color: transparent;">
                        </a>

                        <!-- Modal edit -->
        
                        <div class="modal fade" id="editModal-account${index}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header pb-3" style="border: none">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body pt-1 pb-2" style="border: none">
                                <h5 class="modal-title pb-2" style="font-size: 22px; font-weight: 700; text-align: center">
                                CẤP QUYỀN CHO <span style="color: #355ded;">${account[0]}</span>
                                </h5>
                                <form>
                                <div class="d-flex" style="justify-content: space-between;">
                                    <div class="mb-3 d-flex" style="justify-content: space-between;">
                                    <label for="maloai-lhqc" class="col-form-label mb-1">Quận:</label>
                                    <div class="dropdown" style="padding: 7px 0; height: 36.6px; width: 170px; justify-content: flex-end;">
                                        <select class="form-select" aria-label="Default select example" style="width: 95%;"
                                        onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                                        <option selected>${account[2]}</option>
                                        <option value="1">Quận 1</option>
                                        <option value="2">Quận 2</option>
                                        <option value="3">Quận 3</option>
                                        <option value="4">Quận 4</option>
                                        <option value="5">Quận 5</option>
                                        <option value="6">Quận 6</option>
                                        <option value="7">Quận 7</option>
                                        <option value="8">Quận 8</option>
                                        <option value="9">Quận 9</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div class="mb-3 d-flex" style="justify-content: space-between;">
                                    <label for="loai-lhqc" class="col-form-label mb-1">Phường:</label>
                                    <div class="dropdown" style="padding: 7px 0; height: 36.6px; width: 150px; justify-content: flex-end;">
                                        <select class="form-select" aria-label="Default select example" style="width: 95%;"
                                        onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                                        <option selected>${account[3]}</option>
                                        <option value="1">Phường 1</option>
                                        <option value="2">Phường 2</option>
                                        <option value="3">Phường 3</option>
                                        <option value="4">Phường 4</option>
                                        <option value="5">Phường 5</option>
                                        <option value="6">Phường 6</option>
                                        <option value="7">Phường 7</option>
                                        <option value="8">Phường 8</option>
                                        <option value="9">Phường 9</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <div
                                class="modal-footer pt-1 d-flex justify-content-around"
                                style="border: none; background-color: #f7fafc">
                                <button
                                type="button"
                                class="btn"
                                data-bs-dismiss="modal"
                                style="min-width: 6.5rem; background-color: #e84747; color: #f7fafc">
                                Hủy
                                </button>
                                <button
                                type="button"
                                class="btn"
                                style="min-width: 6.5rem; background-color: #3c77ff; color: #f7fafc">
                                Xác nhận
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </td>
                </tr>   
            `);
        }


        block.append(item);
    });
});