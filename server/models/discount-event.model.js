import connection from "../config/index.js";

const DiscountEvent = function (event) {
  this.id = event.id;
  this.name = event.name;
  this.start_date = event.start_date;
  this.end_date = event.end_date;
  this.discount_percent = event.discount_percent;
};

DiscountEvent.create = (newEvent, result) => {
  connection.query("INSERT INTO discount_event SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created discount event: ", { id: res.insertId, ...newEvent });
    result(null, { id: res.insertId, ...newEvent });
  });
};

DiscountEvent.find = (eventId, result) => {
  connection.query(`SELECT * FROM discount_event WHERE id = ${eventId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found discount event: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

DiscountEvent.getAll = (result) => {
  connection.query("SELECT * FROM discount_event", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("discount events: ", res);
    result(null, res);
  });
};

DiscountEvent.update = (eventId, updatedEvent, result) => {
  connection.query(
    "UPDATE discount_event SET name = ?, start_date = ?, end_date = ?, discount_percent = ? WHERE id = ?",
    [updatedEvent.name, updatedEvent.start_date, updatedEvent.end_date, updatedEvent.discount_percent, eventId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated discount event: ", { id: eventId, ...updatedEvent });
      result(null, { id: eventId, ...updatedEvent });
    }
  );
};

DiscountEvent.delete = (eventId, result) => {
  connection.query("DELETE FROM discount_event WHERE id = ?", eventId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted discount event with id: ", eventId);
    result(null, res);
  });
};

export default DiscountEvent;