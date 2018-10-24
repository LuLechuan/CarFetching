$(document).ready(function(){
    $('.delete').on('click', function(e){
        $target = $(e.target);
        const username = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/admin/' + username,
            success: function(response) {
                alert('Deleting ' + username);
                window.location.href='/admin/';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});
