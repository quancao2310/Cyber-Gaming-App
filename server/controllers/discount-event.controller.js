import DiscountEvent from '../models/discount-event.model.js';

class DiscountEventController {
  async showAll(req, res) {
    try {
      const data = await DiscountEvent.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      const eventId = req.params.eventId;
      const discountEvent = await DiscountEvent.find(eventId);

      if (!discountEvent) {
        return res.status(404).json({ message: 'DiscountEvent not found' });
      }

      res.json(discountEvent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req, res) {
    try {
      const newEvent = req.body;
      const result = await DiscountEvent.create(newEvent);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const eventId = req.params.eventId;
      const updatedEvent = req.body;
      const result = await DiscountEvent.update(eventId, updatedEvent);

      if (!result) {
        return res.status(404).json({ message: 'DiscountEvent not found' });
      }

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const eventId = req.params.eventId;
      const result = await DiscountEvent.delete(eventId);

      if (!result) {
        return res.status(404).json({ message: 'DiscountEvent not found' });
      }

      res.json({ message: 'DiscountEvent deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new DiscountEventController();