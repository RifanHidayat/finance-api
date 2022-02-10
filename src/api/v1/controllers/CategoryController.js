const model = require("../models");
exports.store = async function (req, res) {};
exports.update = async function (req, res) {};
exports.destroy = async function (req, res) {};

exports.read = async function (req, res) {
  try {
    let accounts = await model.category.findAll({});

    return res.status(200).json({
      code: 200,
      error: false,
      message: "Sukses",
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

exports.detail = async function (req, res) {};
