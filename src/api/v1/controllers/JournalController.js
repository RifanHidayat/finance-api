const { response } = require("express");
const model = require("../models");

exports.store = async function (req, res) {
  try {
    let companyId = req.body.companyId;
    let number = req.body.number;
    let date = req.body.date;
    let source = req.body.source;
    let memo = req.body.memo;
    let journalTransactions = req.body.transactionList;
    let journal = await model.journal.create({
      company_id: companyId,
      number: number,
      date: date,
      source: source,
      memo: memo,
    });
    await journalTransactions.map((item) => {
      model.journal_transaction.create({
        journal_id: journal.id,
        account_id: item.account_id,
        debit: item.debit,
        credit: item.credit,
        job: item.job,
        memo: item.memo,
        tax: item.tax,
        date: date,
      });
    });

    return res.status(200).json({
      code: 200,
      error: false,
      message: "Data has been saved",
      data: journalTransactions,
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
    let companyId = req.body.companyId;
    let number = req.body.number;
    let date = req.body.date;
    let source = req.body.source;
    let memo = req.body.memo;
    let journalTransactions = req.body.transactionList;
    let journal = await model.journal.update(
      {
        company_id: companyId,
        number: number,
        date: date,
        source: source,
        memo: memo,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    await model.journal_transaction.destroy({
      where: {
        journal_id: req.params.id,
      },
    });
    await journalTransactions.map((item) => {
      model.journal_transaction.create({
        journal_id: req.params.id,
        account_id: item.account_id,
        debit: item.debit,
        credit: item.credit,
        job: item.job,
        memo: item.memo,
        tax: item.tax,
        date: item.date,
      });
    });

    return res.status(200).json({
      code: 200,
      error: false,
      message: "Data has been saved",
      data: journalTransactions,
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
    await model.journal.destroy({
      where: {
        id: req.params.id,
      },
    });

    await model.journal_transaction.destroy({
      where: {
        journal_id: req.params.id,
      },
    });
    return res.status(200).json({
      code: 200,
      error: false,
      message: "Data has been deleted",
      data: response,
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
  //return "tes";
  try {
    let journalId = req.query.journal_id;
    console.log(journalId);
    if (journalId == null) {
      let journals = await model.journal.findAll({
        include: [{ model: model.journal_transaction }],
      });
      return res.status(200).json({
        code: 200,
        error: false,
        message: "Successfuly",
        data: journals,
      });
    } else {
      let journals = await model.journal.findAll({
        include: [{ model: model.journal_transaction }],
        where: {
          journal_id: journalId,
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
  //return "tes";
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

exports.journal = async function (req, res) {
  try {
    let journals = await model.journal.findAll({
      include: [
        {
          model: model.journal,
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
    let journal = await model.journal.findOne({
      include: [
        // { model: model.account, as: "chart_of_account" },
        {
          model: model.journal_transaction,
          include: [
            { model: model.journal, as: "journal" },
            { model: model.account, as: "account" },
          ],
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
      data: journal,
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
