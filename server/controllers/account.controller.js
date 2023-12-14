import { parse } from "dotenv";
import Account from "../models/account.model.js";
import Customer from "../models/customer.model.js";
class AccountController {
  async index(req, res) {
    res.json({
      message: "This is API for account",
    });
  }

  async create(req, res) {
    console.log(req.body);
    const { username, password, customer_phone_number } = req.body;
    const account = await Account.findByAccountName(username);
    if (account) {
      res.status(401).json({
        error: "Account is already existed",
      });
    } else {
      const customer = await Customer.findByPhoneNumber(customer_phone_number);
      if (customer === null) {
        res.status(401).json({
          error: "Customer is not existed",
        });
        return;
      }
      const customer_id = customer.id;
      const account = await Account.findByCustomerID(customer_id);
      if (account !== null) {
        res.status(401).json({
          error: "Customer is already have account",
        });
        return;
      }
      const newAccount = new Account({
        account_name: username,
        account_password: password,
        account_balance: 0,
        customer_id: customer_id,
      });
      const result = await Account.create(newAccount);
      if (result.error) {
        res.status(401).json({
          error: result.error,
        });
        return;
      }
      res.status(200).json({
        message: "Create account success",
        account: await Account.findByAccountName(username),
      });
    }
  }

  findAll(req, res) {
    res.json({
      message: "Find all account",
    });
  }

  findOne(req, res) {
    res.json({
      message: "Find one account",
    });
  }

  update(req, res) {
    res.json({
      message: "Update account",
    });
  }

  delete(req, res) {
    res.json({
      message: "Delete account",
    });
  }

  async login(req, res) {
    console.log(req.body);
    const { username, password } = req.body;
    const account = await Account.findByAccountName(username);
    if (!account) {
      res.status(401).json({
        error: "Account not found",
      });
    } else {
      if (account.password !== password) {
        res.status(401).json({
          error: "Password is not correct",
        });
      } else {
        res.status(200).json({
          message: "Login success",
          account,
        });
      }
    }
  }

  async cashIn(req, res) {
    const { account_name, amount, type, content } = req.body;
    const account = await Account.findByAccountName(account_name);
    if (!account) {
      res.status(401).json({
        error: "Account not found",
      });
    } else {
      const newBalance = parseInt(account.account_balance) + parseInt(amount);
      const result = await Account.updateBalance(account.id, newBalance);
      if (result.error) {
        res.status(401).json({
          error: result.error,
        });
      } else {
        res.status(200).json({
          message: "Cash in success",
          account: await Account.findByAccountName(account_name),
        });
      }
    }
  }
}

export default new AccountController();
