import connection from "../config/index.js"

// constructor
const Invoice = function (invoice) {
    this.payment_status = invoice.payment_status;
    this.staff_id = invoice.staff_id;
    this.customer_id = invoice.customer_id;
};
  
Invoice.create = (newInvoice) => {
    const { payment_status, staff_id, customer_id } = newInvoice;

    return connection.query(
        "INSERT INTO invoice SET payment_status = ?, staff_id = ?, customer_id = ?",
        [payment_status, staff_id, customer_id]
    )
        .then((res) => {
        console.log("created discount event: ", { id: res.insertId, ...newInvoice });
        return { id: res.insertId, ...newInvoice };
        })
        .catch((err) => {
        console.log("error creating new invoice: ", err);
        throw err;
        });
};

Invoice.update = (invoiceId, updatedInvoice) => {
    return connection.query(
        "UPDATE invoice SET payment_status = ?, staff_id = ?, customer_id = ? WHERE id = ?",
        [updatedInvoice.payment_status, updatedInvoice.staff_id, updatedInvoice.customer_id, invoiceId]
    )
    .then((res) => {
    if (res.affectedRows === 0) {
        throw { kind: "not_found" };
    }
    console.log("updated invoice: ", { id: invoiceId, ...updatedInvoice });
    return { id: invoiceId, ...updatedInvoice };
    })
    .catch((err) => {
    console.log("error updating invoice: ", err);
    throw err;
    });
};

Invoice.delete = (invoiceId) => {
    return connection.query("DELETE FROM invoice WHERE id = ?", [invoiceId])
    .then((res) => {
    if (res.affectedRows === 0) {
        throw { kind: "not_found" };
    }
    console.log("deleted invoice with id: ", invoiceId);
    return res;
    })
    .catch((err) => {
    console.log("error deleting invoice: ", err);
    throw err;
    });
};

Invoice.find = (invoiceId) => {
    return connection.query("SELECT * FROM invoice WHERE id = ?", [invoiceId])
    .then((invoice) => {
    if (invoice[0].length === 0) {
        throw { kind: "not_found" };
    }
    console.log("found invoice: ", invoice[0][0]);
    return invoice[0][0];
    })
    .catch((err) => {
    console.log('error finding invoice: ', err);
    throw err;
    });
};

Invoice.getAll = () => {
    return connection.query('SELECT * FROM invoice')
    .then((invoices) => {
    console.log("invoices: ", invoices[0]);
    return invoices[0];
    })
    .catch((err) => {
    console.log('error getting invoices: ', err);
    throw err;
    });
};


// Room Invoice

const RoomInvoice = function (room_invoice) {
    this.room_type = room_invoice.room_type;
    this.room_order = room_invoice.room_order;
    this.invoice_id = room_invoice.invoice_id;
    this.start_time = room_invoice.start_time;
    this.end_time = room_invoice.end_time;
};

RoomInvoice.create = (newRoomInvoice) => {
    const { room_type, room_order, invoice_id, start_time, end_time } = newRoomInvoice;

    return connection.query(
        "INSERT INTO room_invoice SET room_type = ?, room_order = ?, invoice_id = ?, start_time = ?, end_time = ?",
        [room_type, room_order, invoice_id, start_time, end_time]
    )
    .then((res) => {
    console.log("created discount event: ", { id: res.insertId, ...newRoomInvoice });
    return { id: res.insertId, ...newRoomInvoice };
    })
    .catch((err) => {
    console.log("error creating new invoice: ", err);
    throw err;
    });
};

RoomInvoice.update = (roomInvoiceId, updatedRoomInvoice) => {
    return connection.query(
        "UPDATE room_invoice SET room_type = ?, room_order = ?, invoice_id = ?, start_time = ?, end_time = ? WHERE invoice_id = ?",
        [updatedRoomInvoice.room_type, updatedRoomInvoice.room_order, updatedRoomInvoice.invoice_id, updatedRoomInvoice.start_time, updatedRoomInvoice.end_time, roomInvoiceId]
    )
    .then((res) => {
    if (res.affectedRows === 0) {
        throw { kind: "not_found" };
    }
    console.log("updated room invoice: ", { id: roomInvoiceId, ...updatedRoomInvoice });
    return { id: roomInvoiceId, ...updatedRoomInvoice };
    })
    .catch((err) => {
    console.log("error updating invoice: ", err);
    throw err;
    });
};

RoomInvoice.delete = (roomInvoiceId) => {
return connection.query("DELETE FROM room_invoice WHERE invoice_id = ?", [roomInvoiceId])
    .then((res) => {
    if (res.affectedRows === 0) {
        throw { kind: "not_found" };
    }
    console.log("deleted room invoice with id: ", roomInvoiceId);
    return res;
    })
    .catch((err) => {
    console.log("error deleting room invoice: ", err);
    throw err;
    });
};

RoomInvoice.find = (roomInvoiceId) => {
return connection.query("SELECT * FROM room_invoice WHERE invoice_id = ?", [roomInvoiceId])
    .then((invoice) => {
    if (invoice[0].length === 0) {
        throw { kind: "not_found" };
    }
    console.log("found invoice: ", invoice[0][0]);
    return invoice[0][0];
    })
    .catch((err) => {
    console.log('error finding invoice: ', err);
    throw err;
    });
};

RoomInvoice.getAll = () => {
return connection.query('SELECT * FROM room_invoice JOIN invoice ON id = invoice_id')
    .then((invoices) => {
    console.log("room invoices: ", invoices[0]);
    return invoices[0];
    })
    .catch((err) => {
    console.log('error getting room invoices: ', err);
    throw err;
    });
};


  // slot invoice
const SlotInvoice = function (slot_invoice) {
    this.room_type = slot_invoice.room_type;
    this.room_order = slot_invoice.room_order;
    this.slot_order = slot_invoice.slot_order;
    this.invoice_id = slot_invoice.invoice_id;
    this.start_time = slot_invoice.start_time;
    this.end_time = slot_invoice.end_time;
};

SlotInvoice.create = (newSlotInvoice) => {
const { room_type, room_order, slot_order, invoice_id, start_time, end_time } = newSlotInvoice;

return connection.query(
    "INSERT INTO slot_invoice SET room_type = ?, room_order = ?, slot_order =?, invoice_id = ?, start_time = ?, end_time = ?",
    [room_type, room_order, slot_order, invoice_id, start_time, end_time]
)
    .then((res) => {
    console.log("created slot invoice: ", { id: res.insertId, ...newSlotInvoice });
    return { id: res.insertId, ...newSlotInvoice };
    })
    .catch((err) => {
    console.log("error creating new invoice: ", err);
    throw err;
    });
};

SlotInvoice.update = (slotInvoiceId, updatedSlotInvoice) => {
return connection.query(
    "UPDATE slot_invoice SET room_type = ?, room_order = ?, slot_order =?, invoice_id = ?, start_time = ?, end_time = ? WHERE invoice_id = ?",
    [updatedSlotInvoice.room_type, updatedSlotInvoice.room_order, updatedSlotInvoice.slot_order, updatedSlotInvoice.invoice_id, updatedSlotInvoice.start_time, updatedSlotInvoice.end_time, slotInvoiceId]
)
    .then((res) => {
    if (res.affectedRows === 0) {
        throw { kind: "not_found" };
    }
    console.log("updated slot invoice: ", { id: slotInvoiceId, ...updatedSlotInvoice });
    return { id: slotInvoiceId, ...updatedSlotInvoice };
    })
    .catch((err) => {
    console.log("error updating invoice: ", err);
    throw err;
    });
};

SlotInvoice.delete = (slotInvoiceId) => {
return connection.query("DELETE FROM slot_invoice WHERE invoice_id = ?", [slotInvoiceId])
    .then((res) => {
    if (res.affectedRows === 0) {
        throw { kind: "not_found" };
    }
    console.log("deleted slot invoice with id: ", slotInvoiceId);
    return res;
    })
    .catch((err) => {
    console.log("error deleting slot invoice: ", err);
    throw err;
    });
};

SlotInvoice.find = (slotInvoiceId) => {
return connection.query("SELECT * FROM slot_invoice WHERE invoice_id = ?", [slotInvoiceId])
    .then((invoice) => {
    if (invoice[0].length === 0) {
        throw { kind: "not_found" };
    }
    console.log("found invoice: ", invoice[0][0]);
    return invoice[0][0];
    })
    .catch((err) => {
    console.log('error finding invoice: ', err);
    throw err;
    });
};

SlotInvoice.getAll = () => {
return connection.query('SELECT * FROM slot_invoice JOIN invoice ON id = invoice_id')
    .then((invoices) => {
    console.log("slot invoices: ", invoices[0]);
    return invoices[0];
    })
    .catch((err) => {
    console.log('error getting slot invoices: ', err);
    throw err;
    });
};

// Invoice Product
const InvoiceProduct = function (invoice_product) {
    this.invoice_id = invoice_product.invoice_id;
    this.product_id = invoice_product.product_id;
    this.price = invoice_product.price;
    this.quantity = invoice_product.quantity;
};

InvoiceProduct.create = (newInvoiceProduct) => {
const { invoice_id, product_id, price, quantity } = newInvoiceProduct;

return connection.query(
    "INSERT INTO invoice_product SET invoice_id = ?, product_id = ?, price = ?, quantity = ?",
    [invoice_id, product_id, price, quantity]
)
    .then((res) => {
    console.log("created product invoice: ", { id: res.insertId, ...newInvoiceProduct });
    return { id: res.insertId, ...newInvoiceProduct };
    })
    .catch((err) => {
    console.log("error creating new invoice: ", err);
    throw err;
    });
};

InvoiceProduct.update = (invoiceProductId, updatedInvoiceProduct) => {
return connection.query(
    "UPDATE invoice_product SET invoice_id = ?, product_id = ?, price = ?, quantity = ? WHERE invoice_id = ?",
    [updatedInvoiceProduct.invoice_id, updatedInvoiceProduct.product_id, updatedInvoiceProduct.price, updatedInvoiceProduct.quantity, invoiceProductId]
)
    .then((res) => {
    if (res.affectedRows === 0) {
        throw { kind: "not_found" };
    }
    console.log("updated product invoice: ", { id: invoiceProductId, ...updatedInvoiceProduct });
    return { id: invoiceProductId, ...updatedInvoiceProduct };
    })
    .catch((err) => {
    console.log("error updating invoice: ", err);
    throw err;
    });
};

InvoiceProduct.delete = (invoiceProductId) => {
return connection.query("DELETE FROM invoice_product WHERE invoice_id = ?", [invoiceProductId])
    .then((res) => {
    if (res.affectedRows === 0) {
        throw { kind: "not_found" };
    }
    console.log("deleted product invoice with id: ", invoiceProductId);
    return res;
    })
    .catch((err) => {
    console.log("error deleting product invoice: ", err);
    throw err;
    });
};

InvoiceProduct.find = (invoiceProductId) => {
return connection.query("SELECT * FROM invoice_product WHERE invoice_id = ?", [invoiceProductId])
    .then((invoice) => {
    if (invoice[0].length === 0) {
        throw { kind: "not_found" };
    }
    console.log("found invoice: ", invoice[0][0]);
    return invoice[0][0];
    })
    .catch((err) => {
    console.log('error finding invoice: ', err);
    throw err;
    });
};

InvoiceProduct.getAll = () => {
return connection.query('SELECT * FROM invoice_product JOIN invoice ON id = invoice_id')
    .then((invoices) => {
    console.log("slot invoices: ", invoices[0]);
    return invoices[0];
    })
    .catch((err) => {
    console.log('error getting slot invoices: ', err);
    throw err;
    });
};
export { Invoice, InvoiceProduct, SlotInvoice, RoomInvoice };

