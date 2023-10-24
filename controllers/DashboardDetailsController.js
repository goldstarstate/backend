const Expense = require("../models/ExpenseModel");
const Income = require("../models/IncomeModel");
const moment = require("moment");

const getTotalExpensesAndIncomes = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const incomes = await Income.find();

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

const getDashboardChartData = async (req, res) => {
  function weeksGenerate(numOfWeeks) {
    const weeks = [];
    for (let i = 1; i <= numOfWeeks; i++) {
      weeks.push("Week " + i);
    }
    return weeks;
  }

  function formattedDate(date) {
    return new Date(date).toISOString();
  }

  try {
    const { period } = req.params;
    const currentDate = moment();
    const expenses = await Expense.find();
    const incomes = await Income.find();

    if (period === "THIS_WEEK") {
      const firstDate = currentDate.clone().startOf("week");
      const lastDate = currentDate.clone().endOf("week");
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const filteredExpenses = expenses.filter(
        (i) =>
          new Date(firstDate).toISOString() <=
            new Date(i.createdAt).toISOString() &&
          new Date(i.createdAt).toISOString() < new Date(lastDate).toISOString()
      );
      const filteredIncomes = incomes.filter(
        (i) =>
          new Date(firstDate).toISOString() <=
            new Date(i.createdAt).toISOString() &&
          new Date(i.createdAt).toISOString() < new Date(lastDate).toISOString()
      );

      res.send({
        firstDate,
        lastDate,
        filteredExpenses,
        filteredIncomes,
        xAxisLabels: days,
      });
    } else if (period === "LAST_WEEK") {
      const lastWeekFirstDate = currentDate
        .clone()
        .subtract(1, "weeks")
        .startOf("week");
      const lastWeekLastDate = currentDate
        .clone()
        .subtract(1, "weeks")
        .endOf("week");
      const filteredExpenses = expenses.filter(
        (i) =>
          new Date(lastWeekFirstDate).toISOString() <=
            new Date(i.createdAt).toISOString() &&
          new Date(i.createdAt).toISOString() <
            new Date(lastWeekLastDate).toISOString()
      );
      const filteredIncomes = incomes.filter(
        (i) =>
          new Date(lastWeekFirstDate).toISOString() <=
            new Date(i.createdAt).toISOString() &&
          new Date(i.createdAt).toISOString() <
            new Date(lastWeekLastDate).toISOString()
      );
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      res.send({
        lastWeekFirstDate,
        lastWeekLastDate,
        filteredExpenses,
        filteredIncomes,
        xAxisLabels: days,
      });
    } else if (period === "THIS_MONTH") {
      const thisMonthFirstDate = currentDate.clone().startOf("month");
      const thisMonthLastDate = currentDate.clone().endOf("month");
      const filteredExpenses = expenses.filter(
        (i) =>
          formattedDate(thisMonthFirstDate) <= formattedDate(i.createdAt) &&
          formattedDate(i.createdAt) < formattedDate(thisMonthLastDate)
      );
      const filteredIncomes = incomes.filter(
        (i) =>
          formattedDate(thisMonthFirstDate) <= formattedDate(i.createdAt) &&
          formattedDate(i.createdAt) < formattedDate(thisMonthLastDate)
      );
      const noOfWeeks =
        thisMonthLastDate.week() - thisMonthFirstDate.week() + 1;
      const weeks = weeksGenerate(noOfWeeks);

      res.send({
        thisMonthFirstDate,
        thisMonthLastDate,
        filteredExpenses,
        filteredIncomes,
        xAxisLabels: weeks,
      });
    } else if (period === "LAST_MONTH") {
      const lastMonthFirstDate = moment(currentDate)
        .subtract(1, "month")
        .startOf("month");
      const lastMonthLastDate = moment(currentDate)
        .subtract(1, "month")
        .endOf("month");
      const filteredExpenses = expenses.filter(
        (i) =>
          formattedDate(lastMonthFirstDate) <= formattedDate(i.createdAt) &&
          formattedDate(i.createdAt) < formattedDate(lastMonthLastDate)
      );
      const filteredIncomes = incomes.filter(
        (i) =>
          formattedDate(lastMonthFirstDate) <= formattedDate(i.createdAt) &&
          formattedDate(i.createdAt) < formattedDate(lastMonthLastDate)
      );
      const noOfWeeks =
        lastMonthLastDate.week() - lastMonthFirstDate.week() + 1;
      const weeks = weeksGenerate(noOfWeeks);

      res.send({
        lastMonthFirstDate,
        lastMonthLastDate,
        filteredExpenses,
        filteredIncomes,
        xAxisLabels: weeks,
      });
    } else if (period === "THIS_YEAR") {
      const months = moment.months();
      const thisYearFirstDate = currentDate.clone().startOf("year");
      const thisYearLastDate = currentDate.clone().endOf("year");
      const filteredExpenses = expenses.filter(
        (i) =>
          formattedDate(thisYearFirstDate) <= formattedDate(i.createdAt) &&
          formattedDate(i.createdAt) < formattedDate(thisYearLastDate)
      );
      const filteredIncomes = incomes.filter(
        (i) =>
          formattedDate(thisYearFirstDate) <= formattedDate(i.createdAt) &&
          formattedDate(i.createdAt) < formattedDate(thisYearLastDate)
      );

      res.send({
        thisYearFirstDate,
        thisYearLastDate,
        filteredExpenses,
        filteredIncomes,
        xAxisLabels: months,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTotalExpensesAndIncomes, getDashboardChartData };
