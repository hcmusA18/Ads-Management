$(document).ready(function () {
  $('#data-table').DataTable({
    select: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Vietnamese.json'
    },
    columnDefs: [{ className: 'dt-center', targets: '_all' }]
  })
})
