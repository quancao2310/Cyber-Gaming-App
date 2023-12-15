import connection from "../config/index.js";

const Slot = function (room) {
  this.id = room.id;
  this.description = room.description;
  this.name = room.name;
  this.category = room.category;
  this.price = room.price;
  this.item_sold = room.item_sold;
};

Slot.create = async (newRoom) => {
  const { description, name, category, price, item_sold } = newRoom;

  return await connection
    .query(
      "INSERT INTO Room SET description = ?, name = ?, category = ?, price = ?, item_sold = ?",
      [description, name, category, price, item_sold]
    )
    .then((result) => {
      const insertId = result[0].insertId;
      newRoom.id = insertId;
      return newRoom;
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Slot.update = (RoomId, updatedRoom) => {
  return connection
    .query(
      "UPDATE Room SET description = ?, name = ?, category = ?, price = ?, item_sold = ? WHERE id = ?",
      [
        updatedRoom.description,
        updatedRoom.name,
        updatedRoom.category,
        updatedRoom.price,
        updatedRoom.item_sold,
        RoomId,
      ]
    )
    .then((res) => {
      if (res.affectedRows === 0) {
        throw { kind: "update failed!" };
      }
      return updatedRoom;
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Slot.delete = (RoomId) => {
  return connection
    .query("DELETE FROM Room WHERE id = ?", [RoomId])
    .then((res) => {
      if (res.affectedRows === 0) {
        throw { kind: "not_found" };
      }
      console.log("deleted Room with id: ", RoomId);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Slot.find = (RoomId) => {
  return connection
    .query("SELECT * FROM Room WHERE id = ?", [RoomId])
    .then(async (Rooms) => {
      const RoomsWithImages = await Promise.all(
        Rooms[0].map(async (Room) => {
          const images = await connection.query(
            "SELECT * FROM Room_image WHERE Room_id = ?",
            [Room.id]
          );
          Room.images = images[0];
          return Room;
        })
      );
      return RoomsWithImages;
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Slot.getAll = () => {
  return connection
    .query(
      "SELECT * FROM slot WHERE NOT EXISTS (SELECT 1 FROM slot_invoice WHERE slot.room_type = slot_invoice.room_type AND slot.room_order = slot_invoice.room_order AND slot.slot_order = slot_invoice.slot_order AND NOW() < slot_invoice.end_time"
    )
    .then((rooms) => {
      return slot;
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

export default Slot;
