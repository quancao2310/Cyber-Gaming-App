import Staff from '../models/staff.model.js';

class StaffController {
  async showAll(req, res) {
    try {
      const data = await Staff.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showStaff(req, res) {
    try {
      const id = req.params.id;
      const staff = await Staff.findById(id);

      if (!staff) {
        return res.status(404).json({ message: 'staff not found' });
      }

      res.json(staff);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  async createStaff(req, res) {
    try {
      const newStaff = req.body;
      const result = await Staff.create(newStaff);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showStaffByCCCD(req, res) {
    try {
      const CCCD = req.params.CCCD;
      const staff = await Staff.findByCCCD(CCCD);

      if (!staff) {
        return res.status(404).json({ message: 'staff not found' });
      }

      res.json(staff);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new StaffController();