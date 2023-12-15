import connection from "../config/index.js";

const Room = function (room) {
  this.id = room.id;
  this.description = room.description;
  this.name = room.name;
  this.category = room.category;
  this.price = room.price;
  this.item_sold = room.item_sold;
};

Room.create = async (newRoom) => {
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

Room.update = (RoomId, updatedRoom) => {
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

Room.delete = (RoomId) => {
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

Room.find = (RoomId) => {
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

Room.getAll = () => {
  return connection
    .query("SELECT * FROM room")
    .then((rooms) => {
      return rooms[0];
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Room.getAllPrivateRoom = () => {
  return connection
    .query("SELECT * FROM room WHERE rent_price IS NOT NULL")
    .then((rooms) => {
      return rooms[0];
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Room.getAllPublicRoom = () => {
  return connection
    .query("SELECT * FROM room WHERE rent_price IS NULL")
    .then(async (rooms) => {
      const fullroom = rooms[0];    
      for (let i = 0; i < fullroom.length; i++) {
        const room = fullroom[i];
        room.images = [];
      }
      
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

export default Room;
