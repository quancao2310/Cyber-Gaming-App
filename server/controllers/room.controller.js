import Room from '../models/room.model.js';

class RoomController {
  async showAll(req, res) {
    try {
      const data = await Room.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      const { room_type, room_order } = req.params;
      const room = await Room.findById(room_type, room_order);

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.json(room);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req, res) {
    try {
      const newRoom = req.body;
      const result = await Room.create(newRoom);

      res.status(201).json({ message: 'Room created successfully', result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const { room_type, room_order } = req.params;
      const updatedRoom = req.body;
      const result = await Room.update(room_type, room_order, updatedRoom);

      res.status(200).json({ message: 'Room updated successfully', result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const { room_type, room_order } = req.params;
      const result = await Room.delete(room_type, room_order);

      res.status(200).json({ message: 'Room deleted successfully', result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showAllPrivateRoom(req, res) {
    try {
      const data = await Room.getAllPrivateRoom();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showAllPublicRoom(req, res) {
    try {
      const data = await Room.getAllPublicRoom();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new RoomController();
