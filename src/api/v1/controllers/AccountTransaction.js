const model = require("../models");

exports.store = async function (req, res) {
  let account = req.body.account;
  try {
    let date = req.body.date;
    let amount = req.body.amount;
    let description = null;
    let note = req.body.note;
    let image = null;

    let data = req.body.data;
    let source = req.body.source;
    let category = await model.category.findOne({
      where: {
        id: account.account.category_id,
      },
    });
    console.log(category.methode);
    await model.account_transaction
      .create({
        date: date,
        amount: amount,
        note: note,
        description: description,
        source_name: source,
        source_id: data.id,
        account_id: account.account.id,
        coa: account.chart_of_account.id,
        type: category.methode,
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
exports.update = async function (req, res) {};
exports.destroy = async function (req, res) {};
exports.read = async function (req, res) {
  try {
    let accountTransactions = await model.account_transaction.findAll({
      include: [
        { model: model.account, as: "chart_of_account" },
        { model: model.account, as: "account" },
      ],
    });
    return res.status(200).json({
      code: 200,
      error: false,
      message: "Successfuly",
      data: accountTransactions,
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
exports.detail = async function (req, res) {
  try {
    let accountTransactions = await model.account_transaction.findAll(
      {
        include: [
          { model: model.account, as: "chart_of_account" },
          { model: model.account, as: "account" },
        ],
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.status(200).json({
      code: 200,
      error: false,
      message: "Successfuly",
      data: accountTransactions,
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
