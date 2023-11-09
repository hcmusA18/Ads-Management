$(document).ready(function () {
	const accounts = [
		{
			'username': 'giathinnnn',
			'role': '',
			'district': '',
			'ward': '',
			'isAssigned': 0
		},
		{
			'username': 'cokaaa',
			'role': '',
			'district': '',
			'ward': '',
			'isAssigned': 0
		},
		{
			'username': 'ltquannnn',
			'role': '',
			'district': '',
			'ward': '',
			'isAssigned': 0
		},
		{
			'username': 'tohaaaa',
			'role': '',
			'district': '',
			'ward': '',
			'isAssigned': 0
		},
		{
			'username': 'obitooo',
			'role': 'Cán bộ Quận',
			'district': '2',
			'ward': '',
			'isAssigned': 1
		},
		{
			'username': 'ronboogz',
			'role': 'Cán bộ Quận',
			'district': '6',
			'ward': '',
			'isAssigned': 1
		},
		{
			'username': 'weanleee',
			'role': 'Cán bộ Quận',
			'district': '7',
			'ward': '',
			'isAssigned': 1
		},
		{
			'username': 'puhioooo',
			'role': 'Cán bộ Phường',
			'district': 'Bình Tân',
			'ward': 'An Lạc',
			'isAssigned': 1
		},
		{
			'username': 'righttttt',
			'role': 'Cán bộ Phường',
			'district': '6',
			'ward': '5',
			'isAssigned': 1
		},
		{
			'username': 'naomiiii',
			'role': 'Cán bộ Phường',
			'district': 'Tân Phú',
			'ward': 'Tân Quý',
			'isAssigned': 1
		},
		{
			'username': 'conannnn',
			'role': 'Cán bộ Phường',
			'district': 'Bình Thạnh',
			'ward': '25',
			'isAssigned': 1
		},
		{
			'username': 'miraaaa',
			'role': 'Cán bộ Phường',
			'district': 'Tân Bình',
			'ward': '15',
			'isAssigned': 1
		},
		{
			'username': 'sherlock',
			'role': 'Cán bộ Phường',
			'district': '6',
			'ward': '6',
			'isAssigned': 1
		}
	]

	const block = $('#accountRow');

	block.empty();

	accounts.forEach(function (account, index) {
		// console.log(index);
		let item = $('<tr class="row m-0"></tr>');
		item.append(`
			<td class="col-1 text-center">${index + 1}</td>
			<td class="col-2 text-center">${account.username}</td>
			<td class="col-3 text-center">${account.role}</td>
			<td class="col-2">${account.district !== '' ? 'Quận ' + account.district : ''}</td>
			<td class="col-2">${account.ward !== '' ? 'Phường ' + account.ward : ''}</td>
			<td class="col-2 text-center">
				<div class="d-flex flex-row align-items-center justify-content-center action-icons bg-transparent" >
				</div>
			</td>
		`);
		if (account.isAssigned === 0) {
			item.find('.action-icons').append(`
				<button type="button" class="btn btn-success border-0 pt-1 pb-1" data-bs-toggle="modal" data-bs-target="#modal${index}"
               style="width: 70%; background-color: #60c98b;">Phân công</button>
			`);
		} else {
			item.find('.action-icons').append(`
				<a href="" data-bs-toggle="modal" data-bs-target="#modal${index}" class="mx-3 bg-transparent">
                      <img src="/images/edit.svg" alt="edit-icon">
        </a>
        <a href="#" class="mx-3 bg-transparent"><img src="/images/remove.svg" alt="remove-icon"></a>
			`);
		}
		let modal = $(`
				<div class="modal fade" id="modal${index}" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header pb-3 border-0">
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-1 pb-2 border-0">
          <h5 class="modal-title pb-2 text-center fw-bold fs-4">
             CẤP QUYỀN CHO <span style="color: #355ded;">${account.username}</span>
          </h5>
          <form>
          <div class="d-flex justify-content-between">
            <div class="mb-3 d-flex justify-content-between flex-fill">
            <label for="maloai-lhqc" class="col-form-label mb-1">Quận:</label>
            <div class="dropdown justify-content-end px-1 flex-fill" style="height: 2.2rem;">
                <select class="form-select" aria-label="Default select example" style="width: 95%;"
                onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
                ${account.district !== '' ? `<option selected>Quận ${account.district}</option>` : '<option selected>Chọn quận</option>'}
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
            <div class="mb-3 d-flex justify-content-between flex-fill">
            <label for="loai-lhqc" class="col-form-label mb-1">Phường:</label>
            <div class="dropdown justify-content-end px-1 flex-fill" style="height: 2.2rem;">
                <select class="form-select" aria-label="Default select example" style="width: 95%;"
                onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();' ${account.role === 'Cán bộ Quận' ? 'disabled' : ''}>
                ${account.ward !== '' ? `<option selected>Phường ${account.ward}</option>` : '<option selected>Chọn phường</option>'}
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
          
          <div class="modal-footer pt-1 d-flex justify-content-around border-0" style="background-color: #f7fafc">
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
			`);
		item.find('.action-icons').append(modal);
		block.append(item);
	});
});