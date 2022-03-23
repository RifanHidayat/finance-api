const { response } = require("express");
const model = require("../models");

exports.store = async function (req, res) {
  try {
    let number = req.body.number;
    let name = req.body.name;
    let date = req.body.date;
    let type = req.body.type;
    let level = req.body.level;
    let initbalance = req.body.init_balance;
    let balance = req.body.balance;
    let parentid = req.body.parent_id;
    let categoryId = req.body.category_id;
    let isActive = req.body.is_active;
    let accountNumnber = req.body.account_number;
    let companyId = req.body.company_id;
    let tax_id = await model.account
      .create({
        number: number,
        name: name,
        date: date,
        type: type,
        level: level,
        init_balance: initbalance,
        balance: balance,
        parent_id: parentid,
        category_id: categoryId,
        is_active: isActive,
        account_number: accountNumnber,
        company_id: companyId,
        tax_id: 0,
      })
      .then((response) => {
        return res.status(200).json({
          code: 200,
          error: false,
          message: "Data has been saved",
          data: response,
        });
      })
      .catch((e) => {
        return res.status(404).json({
          code: 404,
          error: false,
          data: [],
          message: `${e}`,
        });
      });
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: false,
      data: [],
      message: `${e}`,
    });
  }
};
exports.update = async function (req, res) {
  try {
    let number = req.body.number;
    let name = req.body.name;
    let date = req.body.date;
    let type = req.body.type;
    let level = req.body.level;
    let initbalance = req.body.init_balance;
    let balance = req.body.balance;
    let parentid = req.body.parent_id;
    let categoryId = req.body.category_id;
    let isActive = req.body.is_active;
    let accountNumnber = req.body.account_number;
    let companyId = req.body.company_id;
    let tax_id = 0;

    model.account
      .update(
        {
          number: number,
          name: name,
          date: date,
          type: type,
          level: level,
          init_balance: initbalance,
          balance: balance,
          parent_id: parentid,
          category_id: categoryId,
          is_active: isActive,
          account_number: accountNumnber,
          company_id: companyId,
          tax_id: 0,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((response) => {
        return res.status(200).json({
          code: 200,
          error: false,
          message: "Data has been saved",
          data: response,
        });
      })
      .catch((e) => {
        return res.status(404).json({
          code: 404,
          error: false,
          data: [],
          message: `${e}`,
        });
      });
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: false,
      data: [],
      message: `${e}`,
    });
  }
};

exports.destroy = async function (req, res) {
  try {
    await model.account
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((response) => {
        return res.status(200).json({
          code: 200,
          error: false,
          message: "Data has been deleted",
          data: response,
        });
      })
      .catch((e) => {
        return res.status(404).json({
          code: 404,
          error: false,
          data: [],
          message: `${e}`,
        });
      });
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: false,
      data: [],
      message: `${e}`,
    });
  }
};

exports.read = async function (req, res) {
  try {
    let categoryId = req.query.category_id;
    console.log(categoryId);
    if (categoryId == null) {
      let accounts = await model.account.findAll({
        include: [{ model: model.category }],
      });
      return res.status(200).json({
        code: 200,
        error: false,
        message: "Successfuly",
        data: accounts,
      });
    } else {
      let accounts = await model.account.findAll({
        include: [{ model: model.category }],
        where: {
          category_id: categoryId,
        },
      });
      return res.status(200).json({
        code: 200,
        error: false,
        message: "Successfuly",
        data: accounts,
      });
    }
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: false,
      data: [],
      message: `${e}`,
    });
  }
};
exports.detail = async function (req, res) {
  try {
    let accounts = await model.account.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      code: 200,
      error: false,
      message: "Successfuly",
      data: accounts,
    });
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: false,
      data: [],
      message: `${e}`,
    });
  }
};

exports.category = async function (req, res) {
  try {
    let accounts = await model.category.findAll({
      include: [
        {
          model: model.account,
          where: {
            type: "detail",
          },
        },
      ],
    });
    return res.status(200).json({
      code: 200,
      error: false,
      message: "Successfuly",
      data: accounts,
    });
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: false,
      data: [],
      message: `${e}`,
    });
  }
};

exports.transactions = async function (req, res) {
  try {
    let account = await model.account.findOne({
      include: [
        // { model: model.account, as: "chart_of_account" },
        {
          model: model.account_transaction,
          include: [{ model: model.account, as: "chart_of_account" }],
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      code: 200,
      error: false,
      message: "Successfuly",
      data: account,
    });
  } catch (e) {
    return res.status(404).json({
      code: 404,
      error: false,
      data: [],
      message: `${e}`,
    });
  }
};
