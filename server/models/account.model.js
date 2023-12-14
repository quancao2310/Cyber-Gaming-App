import connection from "../config";

// constructor
const Account = function (account) {
  this.id = account.id;
  this.account_name = account.account_name;
  this.password = account.account_password;
  this.account_balance = account.account_balance;
  this.customer_id = account.customer_id;
};

Account.create = (newAccount) => {
  return connection
    .query("INSERT INTO account SET ?", newAccount)
    .then((data) => {
      console.log(data);
      if (data[0].affectedRows === 0) {
        return {
          error: "Can not create account"
        }
      }

      return "Create account success"
    })
    .catch((err) => {
      console.log("error: ", err);
      return {
        error: "Can not create account"
      }
    });
};

Account.findById = (accountId, result) => {
  connection.query(
    `SELECT * FROM account WHERE id = ${accountId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found account: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Account with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Account.findByAccountName = (accountName) => {
  return connection
    .query(`SELECT * FROM account WHERE account_name = '${accountName}'`)
    .then((data) => {
      return data[0][0] || null;
    })
    .catch((err) => {
      console.log("error: ", err);
      return {
        error: "Can not find account"
      }
    });
  
};

Account.findByCustomerID = (customerID) => {
  return connection
    .query(`SELECT * FROM account WHERE customer_id = ${customerID}`)
    .then((data) => {
      return data[0] || null;
    })
    .catch((err) => {
      console.log("error: ", err);
      return {
        error: "Can not find account"
      }
    });
};  

Account.updateBalance = (accountId, balance) => {
  return connection
    .query(`UPDATE account SET account_balance = ${balance} WHERE id = '${accountId}'`)
    .then((data) => {
      console.log(data);
      if (data[0].affectedRows === 0) {
        return {
          error: "Can not update account"
        }
      }

      return "Update account success"
    })
    .catch((err) => {
      console.log("error: ", err);
      return {
        error: "Can not update account"
      }
    });
};

Account.getAll = (result) => {
  connection.query("SELECT * FROM account", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("account: ", res);
    result(null, res);
  });
};

export default Account;
