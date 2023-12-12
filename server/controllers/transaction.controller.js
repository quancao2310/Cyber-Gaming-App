import Transaction from '../models/transaction.model.js';

class TransactionController {
  async create(req, res) {
    try {
      const newTransaction = req.body;
      const result = await Transaction.create(newTransaction);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      const transactionId = req.params.transactionId;
      const transaction = await Transaction.find(transactionId);

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.json(transaction);
    } catch (error) {
      console.error('Error retrieving transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showAll(req, res) {
    try {
      const transactions = await Transaction.getAll();
      res.json(transactions);
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new TransactionController();