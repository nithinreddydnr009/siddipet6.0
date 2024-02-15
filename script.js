// script.js

const salesData = [];

function displaySalesData() {
    const tableBody = document.getElementById('salesTableBody');
    const totalTonsCell = document.getElementById('totalTons');
    const totalAmountPaidCell = document.getElementById('totalAmountPaid');
    const totalAmountPaidInCashCell = document.getElementById('totalAmountPaidInCash');
    const totalCreditCell = document.getElementById('totalCredit');
    const totalSaleCell = document.getElementById('totalSale');
    let totalTons = 0;
    let totalAmountPaid = 0;
    let totalAmountPaidInCash = 0;
    let totalCredit = 0;
    let totalSale = 0;

    tableBody.innerHTML = '';

    salesData.forEach((sale, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = sale.Date;
        row.insertCell(1).textContent = sale.Customer;
        row.insertCell(2).textContent = sale.Product;
        row.insertCell(3).textContent = sale.Rate || 0;
        const tonsCell = row.insertCell(4);
        const amountPaidCell = row.insertCell(5);
        const amountPaidInCashCell = row.insertCell(6);
        const creditCell = row.insertCell(7);
        const totalSaleCell = row.insertCell(8);

        if (sale.tons) {
            tonsCell.textContent = sale.tons;
            totalTons += sale.tons;
        }

        if (sale.amountPaid) {
            amountPaidCell.textContent = sale.amountPaid.toFixed(2);
            totalAmountPaid += sale.amountPaid;
        }

        if (sale.amountPaidInCash) {
            amountPaidInCashCell.textContent = sale.amountPaidInCash.toFixed(2);
            totalAmountPaidInCash += sale.amountPaidInCash;
        }

        if (sale.credit) {
            creditCell.textContent = sale.credit.toFixed(2);
            totalCredit += sale.credit;
        }

        const totalSaleValue = (sale.amountPaid || 0) + (sale.amountPaidInCash || 0) + (sale.credit || 0);
        totalSaleCell.textContent = totalSaleValue.toFixed(2);
        totalSale += totalSaleValue;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSale(index);
        row.insertCell(9).appendChild(deleteButton);
    });

    totalTonsCell.textContent = totalTons;
    totalAmountPaidCell.textContent = totalAmountPaid.toFixed(2);
    totalAmountPaidInCashCell.textContent = totalAmountPaidInCash.toFixed(2);
    totalCreditCell.textContent = totalCredit.toFixed(2);
    totalSaleCell.textContent = totalSale.toFixed(2);
}

function addSale() {
    const dateInput = document.getElementById('dateInput').value;
    const personInput = document.getElementById('personInput').value;
    const productInput = document.getElementById('productInput').value;
    const rateInput = parseFloat(document.getElementById('rateInput').value) || 0;
    const tonsInput = parseFloat(document.getElementById('tonsInput').value) || 0;
    const amountPaidInput = parseFloat(document.getElementById('amountPaidInput').value) || 0;
    const amountPaidInCashInput = parseFloat(document.getElementById('amountPaidInCashInput').value) || 0;
    const creditInput = parseFloat(document.getElementById('creditInput').value) || 0;

    if (dateInput && personInput && productInput) {
        const newSale = { Date: dateInput, Customer: personInput, Product: productInput, Rate: rateInput, tons: tonsInput, amountPaid: amountPaidInput, amountPaidInCash: amountPaidInCashInput, credit: creditInput, totalSale: amountPaidInput + amountPaidInCashInput + creditInput };
        salesData.push(newSale);
        displaySalesData();

        document.getElementById('dateInput').value = '';
        document.getElementById('personInput').value = '';
        document.getElementById('productInput').value = '';
        document.getElementById('rateInput').value = '';
        document.getElementById('tonsInput').value = '';
        document.getElementById('amountPaidInput').value = '';
        document.getElementById('amountPaidInCashInput').value = '';
        document.getElementById('creditInput').value = '';
    } else {
        alert('Please fill in all required fields with valid values.');
    }
}

function deleteSale(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        salesData.splice(index, 1);
        displaySalesData();
    }
}

function downloadBalanceSheet() {
    const withTotal = [...salesData, { Date: 'TOTAL:', Customer: '', Product: '', Rate: '', tons: document.getElementById('totalTons').textContent, amountPaid: document.getElementById('totalAmountPaid').textContent, amountPaidInCash: document.getElementById('totalAmountPaidInCash').textContent, credit: document.getElementById('totalCredit').textContent, totalSale: document.getElementById('totalSale').textContent }];
    
    const worksheet = XLSX.utils.json_to_sheet(withTotal);
  	const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Balance_Sheet');
    XLSX.writeFile(workbook, 'balance_sheet.xlsx');
}

displaySalesData();

