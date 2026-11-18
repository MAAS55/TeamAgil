document.addEventListener("DOMContentLoaded", function(){
    const savedBooking = localStorage.getItem('bookingData');


    if(savedBooking){
        const booking = JSON.parse(savedBooking);
        document.getElementById('receipt-info').textContent = booking.email;
    } else{
        document.getElementById('receipt-info').textContent = "tomt";
    }
})