import Slot from '../models/slot.model.js';

class SlotController {
  async showAll(req, res) {
    try {
      const data = await Slot.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showByRoom(req, res) {
    try {
      const { room_type, room_order } = req.params;
      const slots = await Slot.findByRoom(room_type, room_order);

      if (!slots || slots.length === 0) {
        return res.status(404).json({ message: 'Slots not found for the specified room' });
      }

      res.json(slots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new SlotController();
