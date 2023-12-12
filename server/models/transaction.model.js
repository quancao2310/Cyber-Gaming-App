import connection from "../config/index.js";

const Transaction = function (transaction) {
  this.id = transaction.id;
  this.amount = transaction.amount;
  this.created_at = transaction.created_at;
  this.account_id = transaction.account_id;
  this.content = transaction.content;
  this.status = transaction.status;
  this.invoice_id = transaction.invoice_id;
};

Transaction.create = (newTransaction, result) => {
  connection.query("INSERT INTO transaction SET ?", newTransaction, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transaction: ", { id: res.insertId, ...newTransaction });
    result(null, { id: res.insertId, ...newTransaction });
  });
};

Transaction.find = (transactionId, result) => {
  connection.query(`SELECT * FROM transaction WHERE id = ${transactionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transaction: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Transaction.getAll = (result) => {
  connection.query("SELECT * FROM transaction", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transactions: ", res);
    result(null, res);
  });
};

export default Transaction;