const Salary = require("../models/SalaryModel");
const { paginationController } = require("./paginationController");

const getSalaries = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const salaries = await Salary.find();
    const salResults = paginationController(salaries, page);
    res.status(200).json(salResults);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSalariesBySearch = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const empName = new RegExp(searchQuery, "i");
    const salary = await Salary.find({ empName });
    res.json(salary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const withdraw = async (req, res) => {
  try {
    const { amount, id } = req.params;
    const sal = await Salary.findById(id);
    const updated = await Salary.findByIdAndUpdate(
      id,
      {
        salary: (sal.salary -= amount),
        lastWithdrawals: { date: new Date(), amount },
      },
      { new: true }
    );
    res.send(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getSalaries, withdraw, getSalariesBySearch };
