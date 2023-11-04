function buttons () {
  return {
    btsUsersAdd: {
      text: 'Thêm',
      icon: 'bi-plus-lg',
      event: function () {
        var modal = document.getElementById('addModal-lhqc');
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
