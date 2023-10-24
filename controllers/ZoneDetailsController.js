const Zone = require("../models/ZoneModel");
const Expense = require("../models/ExpenseModel");
const Income = require("../models/IncomeModel");
const Salary = require("../models/SalaryModel");
const { paginationController } = require("./paginationController");

const getZoneDetails = async (req, res) => {
  try {
    const { zoneSlug, category } = req.params;
    const page = parseInt(req.query.page);

    const expenses = await Expense.find({
      zoneSlug,
      categoryName: category,
    });

    const incomes = await Income.find({
      zoneSlug,
      categoryName: category,
    });

    const mergedArray = expenses
      .concat(incomes)
      .sort((a, b) => b.createdAt - a.createdAt);

    const getAllSalaries = expenses.map((exp) => exp.salary);
    const totalExpenses = getAllSalaries.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const getAllIncomes = incomes.map((inc) => inc.amount);
    const totalIncomes = getAllIncomes.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    const zoneDetailsResults = paginationController(mergedArray, page);
    res.json({ zoneDetailsResults, totalExpenses, totalIncomes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getZoneDetailsBySearch = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const { zoneSlug, category } = req.params;

    const expenses = await Expense.find({
      zoneSlug,
      categoryName: category,
    });

    const incomes = await Income.find({ zoneSlug, categoryName: category });

    const getAllSalaries = expenses.map((exp) => exp.salary);
    const totalExpenses = getAllSalaries.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const getAllIncomes = incomes.map((inc) => inc.amount);
    const totalIncomes = getAllIncomes.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    const searchText = new RegExp(searchQuery, "i");
    const expense = await Expense.find({ empName: searchText });
    const income = await Income.find({ resource: searchText });

    const details = expense.concat(income);

    res.json({ details, totalExpenses, totalIncomes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTotalZoneExpensesAndIncomes = async (req, res) => {
  try {
    const { zoneSlug } = req.params;
    const expenses = await Expense.find({ zoneSlug });
    const incomes = await Income.find({ zoneSlug });

    const getAllSalaries = expenses.map((exp) => exp.salary);
    const totalExpenses = getAllSalaries.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const getAllIncomes = incomes.map((inc) => inc.amount);
    const totalIncomes = getAllIncomes.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    res.status(200).json({ totalExpenses, totalIncomes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createZoneDetails = async (req, res) => {
  try {
    const { zoneId, type } = req.body;
    const zone = await Zone.findById(zoneId);

    if (!zone) {
      return res.status(404).json({ error: "Zone not found" });
    }

    if (type === "Expense") {
      const { categoryName, empName, eDescription, type, salary } = req.body;

      const expense = new Expense({
        zoneId: zone._id,
        zoneSlug: zone.name,
        categoryName,
        empName,
        eDescription,
        type,
        salary,
      });

      const existingSalary = await Salary.findOne({ empName });

      if (!existingSalary) {
        const empSalary = new Salary({
          zoneSlug: zone.name,
          categoryName,
          empName,
          salary,
        });
        await empSalary.save();
      } else {
        let oldSal = existingSalary.salary;
        await Salary.findOneAndUpdate(
          existingSalary,
          {
            salary: (oldSal += salary),
          },
          { new: true }
        );
      }

      await expense.save();

      res.status(201).json(expense);
    } else {
      const { categoryName, resource, iDescription, type, amount } = req.body;
      const income = new Income({
        zoneId: zone._id,
        zoneSlug: zone.name,
        categoryName,
        resource,
        iDescription,
        type,
        amount,
      });

      await income.save();
      res.status(201).json(income);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editzZoneDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    if (newData.type === "Expense") {
      const updatedExpense = await Expense.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json(updatedExpense);
    } else {
      const updatedIncome = await Income.findByIdAndUpdate(id, newData, {
        new: true,
      });
      res.json(updatedIncome);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteZoneDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseDetails = await Expense.findById(id);
    const incomeDetails = await Income.findById(id);

    if (incomeDetails === null) {
      const deletedDetails = await Expense.findByIdAndRemove(
        expenseDetails._id
      );

      const decrSal = await Salary.findOne({
        empName: expenseDetails.empName,
        zoneSlug: expenseDetails.zoneSlug,
        categoryName: expenseDetails.categoryName,
      });

      await Salary.findByIdAndUpdate(decrSal._id, {
        salary: decrSal.salary - expenseDetails.salary,
      });

      res.status(200).json(deletedDetails);
    }

    if (expenseDetails === null) {
      const deletedDetails = await Income.findByIdAndRemove(incomeDetails._id);
      res.status(200).json(deletedDetails);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getZoneDetails,
  getZoneDetailsBySearch,
  getTotalZoneExpensesAndIncomes,
  createZoneDetails,
  editzZoneDetails,
  deleteZoneDetails,
};
