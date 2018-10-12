$(document).ready(function(){
    $('.delete').on('click', function(e){
        $target = $(e.target);
        const username = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/users/' + username,
            success: function(response) {
                alert('Deleting ' + username);
                window.location.href='/users/';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});