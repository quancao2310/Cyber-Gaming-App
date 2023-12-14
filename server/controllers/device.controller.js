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
  // create(req, res) {
  //   if (!req.body) {
  //     return res.status(400).send({ message: "Content can not be empty!" });
  //   }
  //   const customer = new Device({
  //       id: req.body.id,
  //       firstname: req.body.firstname,
  //       lastname: req.body.lastname,
  //       email: req.body.email,
  //       phone_number: req.body.phone_number,
  //       year_of_birth: req.body.year_of_birth,
  //       sex: req.body.sex,
  //       customer_id_introduced_by: req.body.customer_id_introduced_by,
  //   });
  //   Device.create(customer, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while creating the Customer.",
  //       });
  //     else res.send(data);
  //   });
  // }
}

export default new DeviceController();