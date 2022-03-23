const { response } = require("express");
const model = require("../models");

exports.store = async function (req, res) {
  try {
    let companyId = req.body.company_id;
    let number = req.body.number;
    let date = req.body.date;
    let source = req.body.source;
    let memo = req.body.memo;
    model.journal_transaction
      .create({
        number: number,
        date: date,
        source: source,
        memo: memo,
        company_id: companyId,
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
    let companyId = req.body.company_id;
    let number = req.body.number;
    let date = req.body.date;
    let source = req.body.source;
    let memo = req.body.memo;

    model.journal_transaction
      .update(
        {
          number: number,
          date: date,
          source: source,
          memo: memo,
          company_id: companyId,
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
    await model.journal_transaction
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
    let accountId = req.query.account_id;
    console.log(accountId);
    if (accountId == null) {
      let journals = await model.journal.findAll({
        include: [{ model: model.account }],
      });
      return res.status(200).json({
        code: 200,
        error: false,
        message: "Successfuly",
        data: journals,
      });
    } else {
      let journals = await model.journal.findAll({
        include: [{ model: model.account }],
        where: {
          account_id: accountId,
        },
      });
      return res.status(200).json({
        code: 200,
        error: false,
        message: "Successfuly",
        data: journals,
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
    let journals = await model.journal.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      code: 200,
      error: false,
      message: "Successfuly",
      data: journals,
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

exports.journal_transaction = async function (req, res) {
  try {
    let journals = await model.journal_transaction.findAll({
      include: [
        {
          model: model.journal_transaction,
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
      data: journals,
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
