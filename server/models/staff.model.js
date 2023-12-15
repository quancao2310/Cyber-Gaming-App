import connection from "../config/index.js";

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
  };

  Staff.create = (newStaff, result) => {
    const {id, firstname, lastname, CCCD, age, sex, type, bank_name, bank_credit_num} = newStaff;

    return connection.query(
        "INSERT INTO staff SET id = ?, firstname = ?, lastname = ?, CCCD = ?, age = ?, sex = ?, type = ?, bank_name = ?, bank_credit_num = ?",
        [id, firstname, lastname, CCCD, age, sex, type, bank_name, bank_credit_num]
    )
        .then((res) => {
        console.log("created new staff: ", { id: res.insertId, ...newStaff });
        return { id: res.insertId, ...newStaff };
        })
        .catch((err) => {
        console.log("error creating new staff: ", err);
        throw err;
        });
  };

  Staff.findById = (staffID) => {
    return connection.query("SELECT * FROM staff WHERE id = ?", [staffID])
    .then((staff) => {
    if (staff[0].length === 0) {
        throw { kind: "not_found" };
    }
    return staff[0][0];
    })
    .catch((err) => {
    console.log('error finding staff: ', err);
    throw err;
    });
};

    Staff.findByCCCD = (CCCD) => {
        return connection.query("SELECT * FROM staff WHERE CCCD = ?", [CCCD])
        .then((staff) => {
        if (staff[0].length === 0) {
            throw { kind: "not_found" };
        }
        return staff[0][0];
        })
        .catch((err) => {
        console.log('error finding staff: ', err);
        throw err;
        });
    };

    Staff.getAll = () => {
        return connection.query('SELECT * FROM staff')
        .then((staff) => {
        return staff[0];
        })
        .catch((err) => {
        console.log('error getting staffs: ', err);
        throw err;
        });
    };

  export default Staff;
  