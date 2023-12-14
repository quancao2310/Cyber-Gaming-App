import connection from "../config";

// constructor
const Staff = function (staff) {
    this.id = staff.id;
    this.firstname = staff.firstname;
    this.lastname = staff.lastname;
    this.CCCD = staff.CCCD;
    this.age = staff.age;
    this.sex = staff.sex;
    this.type = staff.type;
    this.bank_name = staff.bank_name;
    this.bank_credit_num = staff.bank_credit_num;
  }

  Staff.create = (newStaff, result) => {
    connection.query("INSERT INTO customer SET ?", newStaff, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created staff: ", { id: res.insertId, ...newStaff });
      result(null, { id: res.insertId, ...newStaff });
    });
  };

  Staff.findById = (staffID, result) => {
    connection.query(
      `SELECT * FROM staff WHERE id = ${staffID}`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("found staff: ", res[0]);
          result(null, res[0]);
          return;
        }
  
        result({ kind: "not_found" }, null);
      }
    );
  };

  Staff.findByCCCD = (CCCD) => {
    return connection
      .query(`SELECT * FROM staff WHERE CCCD = '${CCCD}'`)
      .then((data) => {
        return data[0][0] || null;
      })
      .catch((err) => {
        console.log("error: ", err);
        return {
          error: "Can not find staff",
        };
      });
  };

  Staff.getAll = (result) => {
    connection.query("SELECT * FROM staff", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("staff: ", res);
      result(null, res);
    });
  };

  export default Staff;
  