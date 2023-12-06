import Customer from "../models/customer.model";
class CustomerController {
  index(req, res) {
    res.json({
      message: "This is API for customer",
    });
  }
  create(req, res) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const customer = new Customer({
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone_number: req.body.phone_number,
        year_of_birth: req.body.year_of_birth,
        sex: req.body.sex,
        customer_id_introduced_by: req.body.customer_id_introduced_by,
    });
    Customer.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer.",
        });
      else res.send(data);
    });
  }
}

export default new CustomerController();
