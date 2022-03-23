const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const account = require("../src/api/v1/routes/account");
const category = require("../src/api/v1/routes/category");
const accountMappings = require("../src/api/v1/routes/account_mapping");
const accountTransaction = require("../src/api/v1/routes/account_transaction");
const journal = require("../src/api/v1/routes/journal");
const journalTransaction = require("../src/api/v1/routes/journal_transaction");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", [
  account,
  category,
  accountMappings,
  accountTransaction,
  journal,
  journalTransaction,
]);

app.listen(3000, () => {
  console.log("Server started on post");
});
