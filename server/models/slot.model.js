import connection from "../config/index.js";

const Slot = function (slot) {
  this.room_type = slot.room_type;
  this.room_order = slot.room_order;
  this.slot_order = slot.slot_order;
};

Slot.findByRoom = async (room_type, room_order) => {
  try {
    const result = await connection.query(
      `SELECT * FROM slot WHERE room_type=? AND room_order=?`,
      [room_type, room_order]
    );

    console.log("found slots for room: ", result[0]);
    return result[0];
  } catch (err) {
    console.log("error: ", err);
    throw err;
  }
};

Slot.getAll = async () => {
  try {
    const result = await connection.query("SELECT * FROM slot");
    console.log("found slots: ", result[0]);
    return result[0];
  } catch (err) {
    console.log("error: ", err);
    throw err;
  }
};

export default Slot;
