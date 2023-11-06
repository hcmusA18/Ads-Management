function buttons () {
  return {
    btsUsersAdd: {
      text: 'Thêm',
      icon: 'bi-plus-lg',
      event: function () {
        var modal = document.getElementById('addModal-lhqc') || document.getElementById('addModal-htbc') || document.getElementById('addModal-qlquan') || document.getElementById('addModal-qlphuong');
        var bsModal = new bootstrap.Modal(modal);
        bsModal.show();
      },
      attributes: {
        class: 'btn btn-primary',
        id: 'addButton'
      }
    }
  }
}
