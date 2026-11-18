document.addEventListener("DOMContentLoaded", function(){
    const savedBooking = localStorage.getItem('bookingData');


    if(savedBooking){
        const booking = JSON.parse(savedBooking);
        document.getElementById('name').textContent = booking.name;
        document.getElementById('email').textContent = booking.email;
        document.getElementById('phone').textContent = booking.phone;
        document.getElementById('event').textContent = booking.eventSelects;
        document.getElementById('ticket').textContent = booking.ticket;
        document.getElementById('date').textContent = booking.date;
        document.getElementById('place').textContent = booking.place;
    } else{
        document.getElementById('receipt-info').textContent = "tomt";
    }
})