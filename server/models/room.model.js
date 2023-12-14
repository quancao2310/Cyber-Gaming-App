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

export default Room;