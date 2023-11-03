const mysql = require('mysql');

require('dotenv').config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});



async function checkRoomAvailability(checkinDate, checkoutDate, rooms) {
  // Use parameterized query
  const availableRooms = rooms.filter(room => room.num_rooms > 0);
  const availabilityQuery = `
    SELECT room_id, COUNT(*) AS available_rooms
    FROM room
    WHERE room_type_id = ?
      AND room_id NOT IN (
        SELECT room_id
        FROM booking_room
        WHERE booking_id IN (
          SELECT booking_id
          FROM booking
          WHERE (checkin_date BETWEEN ? AND ? OR checkout_date BETWEEN ? AND ?)
        )
      )
    GROUP BY room_id
    HAVING available_rooms >= ?;
  `;

  const availabilityPromises = availableRooms.map(async room => {
    const { room_type_id, num_rooms } = room;
    const values = [room_type_id, checkinDate, checkoutDate, checkinDate, checkoutDate, num_rooms];
    
    return new Promise((resolve, reject) => {
      connection.query(availabilityQuery, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0].room_id);
          } else {
            resolve(null);
          }
        }
      });
    });
  });

  try {
    const roomIds = await Promise.all(availabilityPromises);
    // Check if all room types are available
    if (roomIds.every(roomId => roomId !== null)) {
      return roomIds;
    } else {
      return null; // Some room types are not available
    }
  } catch (error) {
    throw error;
  }
}

function transformBookingData(bookingData) {
  const { StdRoom_Detail, DlxRoom_Detail, LuxRoom_Detail } = bookingData.Room;

  const rooms = [
    { room_type_id: 1, num_rooms: StdRoom_Detail },
    { room_type_id: 2, num_rooms: DlxRoom_Detail },
    { room_type_id: 3, num_rooms: LuxRoom_Detail }
  ];

  const transformedData = {
    checkin_date: bookingData.Checkin_date,
    checkout_date: bookingData.Checkout_date,
    rooms: rooms,
    guest_title: bookingData.Guest_title,
    guest_first_name: bookingData.Guest_first_name,
    guest_last_name: bookingData.Guest_last_name,
    guest_email: bookingData.Guest_email,
    guest_address: `${bookingData.Guest_address.address}, ${bookingData.Guest_address.state}, ${bookingData.Guest_address.province}, ${bookingData.Guest_address.country}, ${bookingData.Guest_address.zipcode}`,
    guest_telnum: bookingData.Guest_telnum,
    addinfomation: bookingData.addinfomation
  };

  return transformedData;
}

async function createBooking(bookingData) {
  try {
    const roomIds = await checkRoomAvailability(
      bookingData.checkin_date,
      bookingData.checkout_date,
      bookingData.rooms
    );

    if (roomIds !== null) {
      const guestId = Math.floor(Math.random() * 99999999) + 1;
      const guestInsertQuery = `
        INSERT INTO guest (guest_id, guest_title, guest_first_name, guest_last_name, guest_email, guest_address, guest_telnum)
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `;
      const guestValues = [guestId, bookingData.guest_title, bookingData.guest_first_name, bookingData.guest_last_name, bookingData.guest_email, bookingData.guest_address, bookingData.guest_telnum];
      
      // Execute guest data insertion query with parameterized query
      connection.query(guestInsertQuery, guestValues, (guestInsertError, guestInsertResults) => {
        if (guestInsertError) {
          console.error('Error inserting guest data:', guestInsertError);
        } else {
          const bookingId = Math.floor(Math.random() * 99999999) + 1;
          // Proceed to create booking
          const insertBookingQuery = `
            INSERT INTO booking (booking_id, checkin_date, checkout_date, guest_id, booking_status, booking_note)
            VALUES (?, ?, ?, ?, 'paid', ?);
          `;
          const bookingValues = [bookingId, bookingData.checkin_date, bookingData.checkout_date, guestId, bookingData.addinfomation];
          
          // Execute booking insertion query with parameterized query
          connection.query(insertBookingQuery, bookingValues, (bookingInsertError, bookingInsertResults) => {
            if (bookingInsertError) {
              console.error('Error creating booking:', bookingInsertError);
            } else {
              // Booking created successfully, update room_status and booking_room table
              bookingData.rooms.forEach(room => {
                const { room_type_id, num_rooms } = room;
                // Query room_id based on room_type_id
                const selectRoomIdQuery = `
                  SELECT room_id
                  FROM room
                  WHERE room_type_id = ?
                  ORDER BY room_id ASC
                  LIMIT ?;
                `;
                const selectValues = [room_type_id, num_rooms];
                
                connection.query(selectRoomIdQuery, selectValues, (selectError, selectResults) => {
                  if (selectError || selectResults.length === 0) {
                    console.error(`Error selecting room_id for room_type_id ${room_type_id}:`, selectError);
                  } else {
                    const room_id = selectResults[0].room_id;
                    const updateRoomStatusQuery = `
                      UPDATE room
                      SET room_status = 'occupined'
                      WHERE room_id = ?
                      LIMIT ?;
                    `;
                    const updateValues = [room_id, num_rooms];
                    
                    const insertBookingRoomQuery = `
                      INSERT INTO booking_room (booking_id, room_id)
                      VALUES (?, ?);
                    `;
                    const bookingRoomValues = [bookingId, room_id];

                    // Execute room status update and booking_room insertion queries with parameterized queries
                    connection.query(updateRoomStatusQuery, updateValues, (updateError, updateResults) => {
                      if (updateError) {
                        console.error('Error updating room status:', updateError);
                      } else {
                        console.log(`Room ${room_id} updated to 'booked'.`);
                        connection.query(insertBookingRoomQuery, bookingRoomValues, (bookingRoomError, bookingRoomResults) => {
                          if (bookingRoomError) {
                            console.error('Error inserting into booking_room:', bookingRoomError);
                          } else {
                            console.log('Booking_room entry added successfully.');
                          }
                        });
                      }
                    });
                  }
                });
              });
              console.log('Booking created successfully!');
            }
          });
        }
      });
    } else {
      console.log('Some room types are not available for the specified dates.');
    }
  } catch (error) {
    console.error('Error checking room availability:', error);
  }
}

// Call the createBooking function
/*createBooking(modifiedBookingData)
  .then(() => {
    console.log('Booking process completed successfully!');
  })
  .catch(error => {
    console.error('Error:', error);
  });*/

  module.exports = {
    checkRoomAvailability,
    createBooking,
    transformBookingData
  };