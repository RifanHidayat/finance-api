const model = require("../models");
exports.store = async function (req, res) {
  try {
    let name = req.body.name;
    let accountId = req.body.account_id;
    let coaId = req.body.coa;

    model.account_mapping
      .create({
        name: name,
        account_id: accountId,
        coa: coaId,
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
    let name = req.body.name;
    let accountId = req.body.account_id;

    model.account_mapping
      .update(
        {
          name: name,
          account_id: accountId,
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
    await model.account_mapping
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
    let name = req.query.name;

    if (name == null) {
      let accountMappings = await model.account_mapping.findAll({
        include: [
          { model: model.account, as: "chart_of_account" },
          { model: model.account, as: "account" },
        ],
      });
      return res.status(200).json({
        code: 200,
        error: false,
        message: "Successfuly",
        data: accountMappings,
      });
    } else {
      let accountMappings = await model.account_mapping.findAll({
        include: [
          { model: model.account, as: "chart_of_account" },
          { model: model.account, as: "account" },
        ],
        where: {
          name: name,
        },
      });
      return res.status(200).json({
        code: 200,
        error: false,
        message: "Successfuly",
        data: accountMappings,
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
exports.detail = async function (req, res) {};
