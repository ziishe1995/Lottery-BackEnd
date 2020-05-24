$("#delete-dialog").click(function() {
    swal({
        title: '删除',
        text: "你确定要删除吗？",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'm-l-10',
        confirmButtonColor: '#348fe2',
        cancelButtonColor: '#6c757d',
        cancelButtonText: '取消',
        confirmButtonText: '删除'
    }).then(function () {
        swal(
            {
                title: '已被删除。',
                text: '',
                type: 'success',
                confirmButtonColor: '#348fe2'
            }
        )
    })
});