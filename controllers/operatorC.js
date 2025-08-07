const Operator = require("../models/Operator");

exports.getAllOperators = async (req, res) => {
    const operator = await Operator.find().populate("asset");
    res.json(operator);
}

exports.createOperator = async (req, res) => {
    const operator = await Operator.create(req.body);
    res.status(201).json(operator);
}