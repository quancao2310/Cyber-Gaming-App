import Device from "../models/device.model.js";

class DeviceController {
  index(req, res) {
    res.json({
      message: "This is API for device",
    });
  }
  async getAll(req, res) {
    try {
      const result = await Device.getAll();
      res.json(result);
    }
    catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting all Devices."
      });
    }
  }
  async delete(req, res) {
    if (!req.params.room_type || !req.params.room_order || !req.params.slot_order || !req.params.device_order) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }
    try {
      await Device.delete(req.params.room_type, req.params.room_order, req.params.slot_order, req.params.device_order);
      res.send({ message: 'Delete successfully' });
    }
    catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while delete device."
      });
    }
  }
  async filter(req, res) {
    try {
      console.log(req.query);
      const seletedDevice = req.query.selectedDevice ?? '';
      const minT = Number(req.query.minT) ?? 0;
      const result = await Device.filter(seletedDevice, minT);
      res.json(result);
    }
    catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while filter device."
      });
    }
  }
  async create(req, res) {
    if (!req.body) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }
    const device = new Device({
      room_type: req.body.room_type,
      room_order: req.body.room_order,
      slot_order: req.body.slot_order,
      device_order: req.body.device_order,
      name: req.body.name,
      type: req.body.type,
      start_date: req.body.start_date,
      last_time_maintain: req.body.last_time_maintain,
      expire_time: req.body.expire_time
    });
    try {
      const result = await Device.create(device);
      res.send(result);
    }
    catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Device.",
      });
    }
    
  }
}

export default new DeviceController();