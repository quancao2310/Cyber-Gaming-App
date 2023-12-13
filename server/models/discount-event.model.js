import connection from "../config/index.js";

const DiscountEvent = function (event) {
  this.id = event.id;
  this.name = event.name;
  this.start_date = event.start_date;
  this.end_date = event.end_date;
  this.discount_percent = event.discount_percent;
};

DiscountEvent.create = (newEvent) => {
  const { name, start_date, end_date, discount_percent } = newEvent;

  return connection.query(
    "INSERT INTO discount_event SET name = ?, start_date = ?, end_date = ?, discount_percent = ?",
    [name, start_date, end_date, discount_percent]
  )
    .then((res) => {
      console.log("created discount event: ", { id: res.insertId, ...newEvent });
      return { id: res.insertId, ...newEvent };
    })
    .catch((err) => {
      console.log("error creating discount event: ", err);
      throw err;
    });
};

DiscountEvent.update = (eventId, updatedEvent) => {
  return connection.query(
    "UPDATE discount_event SET name = ?, start_date = ?, end_date = ?, discount_percent = ? WHERE id = ?",
    [updatedEvent.name, updatedEvent.start_date, updatedEvent.end_date, updatedEvent.discount_percent, eventId]
  )
    .then((res) => {
      if (res.affectedRows === 0) {
        throw { kind: "not_found" };
      }
      console.log("updated discount event: ", { id: eventId, ...updatedEvent });
      return { id: eventId, ...updatedEvent };
    })
    .catch((err) => {
      console.log("error updating discount event: ", err);
      throw err;
    });
};

DiscountEvent.delete = (eventId) => {
  return connection.query("DELETE FROM discount_event WHERE id = ?", [eventId])
    .then((res) => {
      if (res.affectedRows === 0) {
        throw { kind: "not_found" };
      }
      console.log("deleted discount event with id: ", eventId);
      return res;
    })
    .catch((err) => {
      console.log("error deleting discount event: ", err);
      throw err;
    });
};

DiscountEvent.find = (eventId) => {
  return connection.query("SELECT * FROM discount_event WHERE id = ?", [eventId])
    .then((events) => {
      if (events[0].length === 0) {
        throw { kind: "not_found" };
      }
      console.log("found discount event: ", events[0][0]);
      return events[0][0];
    })
    .catch((err) => {
      console.log('error finding discount event: ', err);
      throw err;
    });
};

DiscountEvent.getAll = () => {
  return connection.query('SELECT * FROM discount_event')
    .then((events) => {
      console.log("discount events: ", events[0]);
      return events[0];
    })
    .catch((err) => {
      console.log('error getting discount events: ', err);
      throw err;
    });
};

export default DiscountEvent;