const mysql = require('mysql');
const uuid = require('uuid');

const connection = mysql.createConnection({
  host: 'omar-server.trueddns.com',
  port: 52300,
  user: 'gnog',
  password: '29136111',
  database: 'SEHP_proj'
});


const bookingData = {
  "checkin_date": "2023-11-25",
  "checkout_date": "2023-11-27",
  "rooms": [
    { 
        "room_type_id": "3",
        "num_rooms": 1
    }
  ],
  "guest_title": "Mr",
  "guest_first_name": "Patrawee",
  "guest_last_name": "songtuk",
  "guest_email": "Test1@mail.com",
  "guest_address": "Test1",
  "guest_telnum": "0800000000",
};

function checkRoomAvailability(checkinDate, checkoutDate, rooms) {
  return new Promise((resolve, reject) => {
    const roomTypeIds = rooms.map(room => room.room_type_id);
    const numRooms = rooms.map(room => room.num_rooms);

    const availabilityQuery = `
      SELECT room_id, COUNT(*) AS booked_rooms
      FROM room
      WHERE room_id IN (${roomTypeIds.join(',')})
        AND room_status = 'free'
        AND room_id NOT IN (
          SELECT room_id
          FROM booking_room
          WHERE booking_id IN (
            SELECT booking_id
            FROM booking
            WHERE (checkin_date BETWEEN '${checkinDate}' AND '${checkoutDate}' OR
                   checkout_date BETWEEN '${checkinDate}' AND '${checkoutDate}')
              AND booking_status = 'confirmed'
          )
        )
      GROUP BY room_id;
    `;

    connection.query(availabilityQuery, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        const availableRooms = results.reduce((acc, row) => {
          const availableQuantity = row.room_id in numRooms ? numRooms[row.room_id] - row.booked_rooms : numRooms[row.room_id];
          if (availableQuantity > 0) {
            acc.push({
              room_id: row.room_id,
              available_quantity: availableQuantity
            });
          }
          return acc;
        }, []);

        const allRoomsAvailable = availableRooms.length === roomTypeIds.length;
        resolve({ available: allRoomsAvailable, rooms: availableRooms });
      }
    });
  });
}


function createBooking(bookingData) {
  // Check room availability
  checkRoomAvailability(bookingData.checkin_date, bookingData.checkout_date, bookingData.rooms)
    .then(roomsAvailable => {
      if (roomsAvailable) {
        // Rooms are available, proceed to create booking
        // Insert guest data
          // Generate a unique guest_id
        const guestId = Math.floor(Math.random() * 99999999) + 1;
        const guestInsertQuery = `
        INSERT INTO guest (guest_id, guest_title, guest_first_name, guest_last_name, guest_email, guest_address, guest_telnum)
        VALUES ('${guestId}', '${bookingData.guest_title}', '${bookingData.guest_first_name}', '${bookingData.guest_last_name}', '${bookingData.guest_email}', '${bookingData.guest_address}', '${bookingData.guest_telnum}');
      `;

        // Execute guest data insertion query
        connection.query(guestInsertQuery, (guestInsertError, guestInsertResults, guestInsertFields) => {
          if (guestInsertError) {
            console.error('Error inserting guest data:', guestInsertError);
          } else {
            // Guest data inserted successfully, retrieve the guest_id

            const bookingId = Math.floor(Math.random() * 99999999) + 1;
            // Proceed to create booking
            const insertBookingQuery = `
              INSERT INTO booking (booking_id, checkin_date, checkout_date, guest_id, booking_status, booking_note)
              VALUES ('${bookingId}','${bookingData.checkin_date}', '${bookingData.checkout_date}', ${guestId}, 'paid', 'Booking confirmed');
            `;

            // Execute booking insertion query
            connection.query(insertBookingQuery, (bookingInsertError, bookingInsertResults, bookingInsertFields) => {
              if (bookingInsertError) {
                console.error('Error creating booking:', bookingInsertError);
              } else {
                console.log('Booking created successfully!');
              }
            });
          }
        });
      } else {
        console.log('Rooms are not available for the specified dates.');
      }
    })
    .catch(error => {
      console.error('Error checking room availability:', error);
    });
}

// Call the function to create the booking



fetch('http://localhost:5000/api/createBooking', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bookingData)
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


module.exports = {
  createBooking: createBooking
};

