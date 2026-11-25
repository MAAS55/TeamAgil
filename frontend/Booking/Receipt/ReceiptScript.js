document.addEventListener("DOMContentLoaded", function(){
    const savedBooking = localStorage.getItem('bookingData');


    if(savedBooking){
        const booking = JSON.parse(savedBooking);
        document.getElementById('name').textContent = `Ditt namn: ${booking.name}`;
        document.getElementById('email').textContent = `Ditt email: ${booking.email}`;
        document.getElementById('phone').textContent = `Ditt telefon: ${booking.phone}`;
        document.getElementById('event').textContent = `Event som du bokar: ${booking.eventSelects}`;
        document.getElementById('ticket').textContent = `Ditt antal biljett: ${booking.ticket}`;
        document.getElementById('date').textContent = `Ditt datum: ${booking.date}`;
        document.getElementById('place').textContent = `Event plats: ${booking.place}`;
    } else{
        document.getElementById('receipt-info').textContent = "tomt";
    }
})