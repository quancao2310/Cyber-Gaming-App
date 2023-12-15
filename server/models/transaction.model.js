import connection from "../config/index.js";

const Transaction = function (transaction) {
  this.amount = transaction.amount;
  this.created_at = transaction.created_at;
  this.account_id = transaction.account_id;
  this.content = transaction.content;
  this.status = transaction.status;
  this.invoice_id = transaction.invoice_id;
};

Transaction.create = (newTransaction) => {
  return connection.query("INSERT INTO transaction SET ?", newTransaction)
    .then((res) => {
      console.log("created transaction: ", { id: res.insertId, ...newTransaction });
      return { id: res.insertId, ...newTransaction };
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Transaction.find = (transactionId) => {
  return connection.query(`SELECT * FROM transaction WHERE id = ${transactionId}`)
    .then((res) => {
      if (res.length) {
        console.log("found transaction: ", res[0]);
        return res[0];
      }
      throw { kind: "not_found" };
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Transaction.getAll = () => {
  return connection.query("SELECT * FROM transaction")
    .then((res) => {
      console.log("transactions: ", res[0]);
      return res[0];
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

export default Transaction;