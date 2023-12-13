import { Invoice, InvoiceProduct, RoomInvoice, SlotInvoice } from '../models/invoice.model.js';

class InvoiceController {
  async showAll(req, res) {
    try {
      const data = await Invoice.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showAllRoomInvoice(req, res) {
    try {
      const data = await RoomInvoice.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showAllSlotInvoice(req, res) {
    try {
      const data = await SlotInvoice.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showAllInvoiceProduct(req, res) {
    try {
      const data = await InvoiceProduct.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showInvoice(req, res) {
    try {
      const id = req.params.id;
      const invoice = await Invoice.find(id);

      if (!invoice) {
        return res.status(404).json({ message: 'invoice not found' });
      }

      res.json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showRoomInvoice(req, res) {
    try {
      const id = req.params.id;
      const invoice = await RoomInvoice.find(id);

      if (!invoice) {
        return res.status(404).json({ message: 'invoice not found' });
      }

      res.json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showSlotInvoice(req, res) {
    try {
      const id = req.params.id;
      const invoice = await SlotInvoice.find(id);

      if (!invoice) {
        return res.status(404).json({ message: 'invoice not found' });
      }

      res.json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  async showInvoiceProduct(req, res) {
    try {
      const id = req.params.id;
      const invoice = await InvoiceProduct.find(id);

      if (!invoice) {
        return res.status(404).json({ message: 'invoice not found' });
      }

      res.json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createInvoice(req, res) {
    try {
      const newInvoice = req.body;
      const result = await Invoice.create(newInvoice);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createRoomInvoice(req, res) {
    try {
      const newInvoice = req.body;
      const result = await RoomInvoice.create(newInvoice);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createSlotInvoice(req, res) {
    try {
      const newInvoice = req.body;
      const result = await SlotInvoice.create(newInvoice);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createInvoiceProduct(req, res) {
    try {
      const newInvoice = req.body;
      const result = await InvoiceProduct.create(newInvoice);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateInvoice(req, res) {
    try {
      const id = req.params.id;
      const updatedInvoice = req.body;
      const result = await Invoice.update(id, updatedInvoice);

      if (!result) {
        return res.status(404).json({ message: 'invoice not found' });
      }

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateRoomInvoice(req, res) {
    try {
      const id = req.params.id;
      const updatedInvoice = req.body;
      const result = await RoomInvoice.update(id, updatedInvoice);

      if (!result) {
        return res.status(404).json({ message: 'invoice not found' });
      }

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateSlotInvoice(req, res) {
    try {
      const id = req.params.id;
      const updatedInvoice = req.body;
      const result = await SlotInvoice.update(id, updatedInvoice);

      if (!result) {
        return res.status(404).json({ message: 'invoice not found' });
      }

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateInvoiceProduct(req, res) {
    try {
      const id = req.params.id;
      const updatedInvoice = req.body;
      const result = await InvoiceProduct.update(id, updatedInvoice);

      if (!result) {
        return res.status(404).json({ message: 'invoice not found' });
      }

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteInvoice(req, res) {
    try {
      const id = req.params.id;
      const result = await Invoice.delete(id);

      if (!result) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      res.json({ message: 'Invoice deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteRoomInvoice(req, res) {
    try {
      const id = req.params.id;
      const result = await RoomInvoice.delete(id);

      if (!result) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      res.json({ message: 'Invoice deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteSlotInvoice(req, res) {
    try {
      const id = req.params.id;
      const result = await SlotInvoice.delete(id);

      if (!result) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      res.json({ message: 'Invoice deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteInvoiceProduct(req, res) {
    try {
      const id = req.params.id;
      const result = await InvoiceProduct.delete(id);

      if (!result) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      res.json({ message: 'Invoice deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new InvoiceController();