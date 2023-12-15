import Room from "../models/room.model";

class ProductController {
  async showAll(req, res) {
    try {
      const data = await Room.getAll();
      res.json(data);
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

export default new ProductController();