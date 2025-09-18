const AreaChartData = (transactions) => {
  
    const groupedData = transactions.reduce((accumulator, transaction) => {

        // converting income/expense date to string for setting it as a key for accumulator
        const dateAsKey = new Date(transaction.date).toISOString().split('T')[0];

        // If accumulator with date as key is not present then set the initial values
        if (!accumulator[dateAsKey]) {
            accumulator[dateAsKey] = { date: dateAsKey, totalAmount: 0, items: [] };
        }

        // Add the amount & other info for incomes into the accumulator
        // Sum total amount of income if the incomes falls under same date
        accumulator[dateAsKey].totalAmount += transaction.amount;
        accumulator[dateAsKey].items.push(
            {
                name: transaction.name,
                amount: transaction.amount
            }
        );

        return accumulator;

    }, {})

    // Collection of dates from the returned object groupedData
    const transactionDatesOnly = Object.keys(groupedData).map(dateStr => new Date(dateStr));

    // This will Check if the first day of the month and today is there or not, if not present then it adds the date as string
    const currentDate = new Date();
    const firstDateOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Created Set for adding all the unique dates
    const dateKeys = new Set([...transactionDatesOnly.map(date => date.toISOString().split('T')[0])]);
    dateKeys.add(firstDateOfTheMonth.toISOString().split('T')[0]);
    dateKeys.add(currentDate.toISOString().split('T')[0]);

    // creates the chart data array which includes all info about each data point
    const chartDataArray = Array.from(dateKeys)
        .map(dateKey => {
            const eachDate = new Date(dateKey);
            if (groupedData[dateKey]) {
                return {
                    ...groupedData[dateKey],
                    month: eachDate.toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short" }
                    )
                };
            } else {
                return {
                    date: dateKey,
                    totalAmount: 0,
                    items: [{ name: "No items are added", amount: "" }],
                    month: eachDate.toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short" }
                    )
                };
            }
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return chartDataArray;

}

const BalanceChartData = (totalIncome, totalExpense, totalBalance) => {

    return [
        { name: "Income", value: totalIncome, colour: "#25933b" },
        { name: "Expense", value: totalExpense, colour: "#C21807" },
        { name: "Balance", value: totalBalance, colour: "#808080" }
    ]

}

const ExpenseIncomeChartData = ({ expenses, incomes }) => {

    // group data by their date
    groupedData = {}

    // For incomes
    incomes.forEach(income => {
        const dateKey = new Date(income.date).toISOString().split('T')[0];

        if (!groupedData[dateKey]) {
            groupedData[dateKey] = { date: dateKey, totalAmount: 0, items: [] };
        }

        groupedData[dateKey].totalAmount += income.amount;
        groupedData[dateKey].items.push({
            name: income.name,
            amount: income.amount,
            type: "income"
        });
    });

    // For expenses
    expenses.map(expense => {
        const dateKey = new Date(income.date).toISOString().split('T')[0];

        if (!groupedData[dateKey]) {
            groupedData[dateKey] = { date: dateKey, totalAmount: 0, items: [] };
        }

        groupedData[dateKey].totalAmount -= expense.amount;
        groupedData[dateKey].items.push({
            name: expense.name,
            amount: (expense.amount * -1),
            type: "expense"
        });
    });

    // Collection of dates from the returned object groupedData
    const transactionDatesOnly = Object.keys(groupedData).map(dateStr => new Date(dateStr));

    // This will Check if the first day of the month and today is there or not, if not present then it adds the date as string
    const currentDate = new Date();
    const firstDateOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Created Set for adding all the unique dates
    const dateKeys = new Set([...transactionDatesOnly.map(date => date.toISOString().split('T')[0])]);
    dateKeys.add(firstDateOfTheMonth.toISOString().split('T')[0]);
    dateKeys.add(currentDate.toISOString().split('T')[0]);

}

export { AreaChartData, ExpenseIncomeChartData, BalanceChartData }