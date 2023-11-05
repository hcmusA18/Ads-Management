function buttons () {
  return {
    btsUsersAdd: {
      text: 'Thêm',
      icon: 'bi-plus-lg',
      event: function () {
        var modal = document.getElementById('addModal-lhqc') || document.getElementById('addModal-htbc');
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
