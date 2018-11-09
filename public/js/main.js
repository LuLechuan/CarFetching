/** Users **/
$(document).ready(function(){
    $('.delete').on('click', function(e){
        $target = $(e.target);
        const username = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/admin/users/' + username,
            success: function(response) {
                alert('Deleting ' + username);
                window.location.href='/admin/users/';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});

/** Cars **/
$(document).ready(function(){
    $('.deleteCar').on('click', function(e){
        $target = $(e.target);
        const plate_number = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/admin/cars/' + plate_number,
            success: function(response) {
                alert('Deleting ' + plate_number);
                window.location.href='/admin/cars/';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});

/** Rides **/
$(document).ready(function(){
    $('.deleteRide').on('click', function(e){
        $target = $(e.target);
        const ride_id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/admin/rides/' + ride_id,
            success: function(response) {
                alert('Deleting ' + ride_id);
                window.location.href='/admin/rides/';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});

/** Bids **/
$(document).ready(function(){
    $('.deleteBid').on('click', function(e){
        $target = $(e.target);
        const bid_id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/admin/bids/' + bid_id,
            success: function(response) {
                alert('Deleting ' + bid_id);
                window.location.href='/admin/bids/';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});
