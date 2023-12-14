import connection from "../config/index.js";

// constructor
const Device = function (device) {
  this.room_type = device.room_type;
  this.room_order = device.room_order;
  this.slot_order = device.slot_order;
  this.device_order = device.device_order;
  this.name = device.name;
  this.type = device.type;
  this.start_date = device.start_date;
  this.last_time_maintain = device.last_time_maintain;
  this.expire_time = device.expire_time;
}

Device.create = async (newDevice, result) => {
  try {
    const result = await connection.query(
      `INSERT INTO device (room_type, room_order, slot_order, device_order, name, type, start_date, last_time_maintain, expire_time)
      VALUES ?`, [newDevice.room_type, newDevice.room_order, newDevice.slot_order, newDevice.device_order, newDevice.name, newDevice.type, newDevice.start_date, newDevice.last_time_maintain, newDevice.expire_time]
    );
    console.log("created device: ", { id: result.insertId, ...newDevice });
    result(null, { id: result.insertId, ...newDevice });
  }
  catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
}

Device.findById = async (room_type, room_order, slot_order, device_order, result) => {
  try {
    const result = await connection.query(
      `SELECT * FROM device WHERE room_type=? AND room_order=? AND slot_order=? AND device_order=?`,
      [room_type, room_order, slot_order, device_order]
    );
    
    console.log("found device: ", result[0]);
    result(null, result[0]);
  }
  catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
}

Device.getAll = async (result) => {
  try {
    const result = await connection.query("SELECT * FROM device");
    console.log("found devices: ", result[0]);
    result(null, result[0]);
  }
  catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
}

export default Device;