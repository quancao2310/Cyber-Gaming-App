import connection from "../config/index"

// constructor
const Customer = function (customer) {
  this.id = customer.id;
  this.firstname = customer.firstname;
  this.lastname = customer.lastname;
  this.email = customer.email;
  this.phone_number = customer.phone_number;
  this.year_of_birth = customer.year_of_birth;
  this.sex = customer.sex;
  this.customer_id_introduced_by = customer.customer_id_introduced_by;
};

Customer.create = (newCustomer, result) => {
  connection.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  connection.query(`SELECT * FROM customer WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = (result) => {
  connection.query("SELECT * FROM customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customer: ", res);
    result(null, res);
  });
};

export default Customer;

