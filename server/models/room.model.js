import connection from "../config/index.js";

// constructor
const Room = function (room) {
  this.room_type = room.room_type;
  this.room_order = room.room_order;
  this.description = room.description;
  this.unit_price = room.unit_price;
  this.available_slot_quantity = room.available_slot_quantity;
  this.room_status = room.room_status;
  this.rent_price = room.rent_price;
}

Room.create = async (newRoom) => {
  try {
    const result = await connection.query(
      `INSERT INTO room (room_type, room_order, description, unit_price, available_slot_quantity, room_status, rent_price)
      VALUES ?`, [newRoom.room_type, newRoom.room_order, newRoom.description, newRoom.unit_price, newRoom.available_slot_quantity, newRoom.room_status, newRoom.rent_price]
    );
    console.log("created room: ", { id: result.insertId, ...newRoom });
    return result;
  }
  catch (err) {
    console.log("error: ", err);
    throw err;
  }
}

Room.update = async (roomId, updatedRoom) => {
  try {
    const result = await connection.query(
      "UPDATE room SET description = ?, unit_price = ?, available_slot_quantity = ?, room_status = ?, rent_price = ? WHERE id = ?",
      [
        updatedRoom.description,
        updatedRoom.unit_price,
        updatedRoom.available_slot_quantity,
        updatedRoom.room_status,
        updatedRoom.rent_price,
        roomId,
      ]
    );
    console.log(result);
    return result;
  }
  catch (err) {
    throw err;
  }
}

Room.findById = async (room_type, room_order) => {
  try {
    const result = await connection.query(
      `SELECT * FROM room WHERE room_type=? AND room_order=?`,
      [room_type, room_order]
    );
    
    console.log("found room: ", result[0]);
    return result[0];
  }
  catch (err) {
    console.log("error: ", err);
    throw err;
  }
}

Room.getAll = async () => {
  try {
    const result = await connection.query("SELECT * FROM room");
    console.log("found rooms: ", result[0]);
    return result[0];
  }
  catch (err) {
    console.log("error: ", err);
    throw err;
  }
}

Room.delete = async (room_type, room_order) => {
  try {
    const result = await connection.query(
      `DELETE FROM room WHERE room_type=? AND room_order=?`,
      [room_type, room_order]
    );
    console.log(result);
    return result;
  }
  catch (err) {
    console.log("error: ", err);
    throw err;
  }
}

Room.getAllPrivateRoom = async () => {
  try {
    const result = await connection.query(
      `SELECT * FROM room WHERE rent_price IS NOT NULL`
    );
    console.log("found rooms: ", result[0]);
    return result[0];
  }
  catch (err) {
    console.log("error: ", err);
    throw err;
  }
}

Room.getAllPublicRoom = async () => {
  try {
    const result1 = await connection.query(
      `SELECT * FROM room WHERE rent_price IS NULL`
    );
    const result = await connection.query(
      `SELECT * FROM slot 
       WHERE NOT EXISTS (
         SELECT 1 
         FROM slot_invoice 
         WHERE slot.room_type = slot_invoice.room_type 
           AND slot.room_order = slot_invoice.room_order 
           AND slot.slot_order = slot_invoice.slot_order 
           AND NOW() < slot_invoice.end_time
       )`
    );
    const room = [];
    for (let i = 0; i < result1[0].length; i++) {
      const available_slot = result[0].filter(slot => slot.room_type === result1[0][i].room_type && slot.room_order === result1[0][i].room_order);
      room.push({
        ...result1[0][i],
        available_slot: available_slot
      })
    }
    
    // console.log("found rooms: ", result[0]);
    return room;
  }
  catch (err) {
    console.log("error: ", err);
    throw err;
  }
}

export default Room;