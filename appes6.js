class MetaData{
    constructor(){
        this.id_amount_map = new Map();
        this.total_numbers = 0;
        this.total_income = 0;
        this.total_expense = 0;
        this.income_numbers = 0;
        this.expense_numbers = 0;

        document.getElementById('total-income').innerHTML = `Total income: ${this.total_income}`;
        document.getElementById('avg-income').innerHTML = `Average income: 0`;
        document.getElementById('total-expense').innerHTML = `Total expense: ${this.total_expense}`;
        document.getElementById('avg-expense').innerHTML = `Average expense: 0`;

    }

    ShowIncomeData(){
        document.getElementById('total-income').innerHTML = `Total income: 
        ${this.total_income}`;
        document.getElementById('avg-income').innerHTML = `Average income:
         ${(this.total_income===0 ? 0 : this.total_income/this.income_numbers)}`;
    }

    ShowExpenseData(){
        document.getElementById('total-expense').innerHTML = `Total expense:
         ${this.total_expense}`;
        document.getElementById('avg-expense').innerHTML = `Average expense:
         ${(this.total_expense===0 ? 0: this.total_expense/this.expense_numbers)}`;
    }

    AddIncome(amount) {
        this.total_income += Number(amount);
        this.income_numbers++;
        meta_data.ShowIncomeData();        
    }

    AddExpense(amount) {
        this.total_expense += Number(amount);
        this.expense_numbers++;
        meta_data.ShowExpenseData();
    }

    DeleteIncome(amount) {
        this.total_income -= Number(amount);
        this.income_numbers--; 
        meta_data.ShowIncomeData();
    }

    DeleteExpense(amount) {
        this.total_expense -= Number(amount);
        this.expense_numbers--;
        meta_data.ShowExpenseData();
    }
    
}

const meta_data = new MetaData();

class Transaction{
    constructor(transaction_type, description, amount) {
        meta_data.id_amount_map.set(meta_data.total_numbers, amount);
        this.id = meta_data.total_numbers;
        this.transaction_type = transaction_type;
        this.description = description;
        this.amount = amount;
        meta_data.total_numbers +=1;
    }
}

class Validate_data{
    validate (val) {
    
        let rows = String(doc.split('\n'));
        let data = rows.split(',');
    
        if(data[0]==='' || data[1]==='' || data[2]==='') {
            return false;
        }
        if(data.length !== 3)
        {
            //alert("Please enter valid csv data");
            return false;
        }
    
        // console.log("val " +  typeof(val));
        // for(let i=0;i<val.length;i++)
        // {
        //     if(val[i].length != 1){
        //         alert("Please enter valid csv data");
        //         return false;
        //     }
        // }
    return true;
    }
}
class UI {
    addTransaction(transaction) {
        const list = document.getElementById('transaction-list');
        const new_row = document.createElement('tr');
        new_row.className = `${transaction.transaction_type}`;
        
        //console.log('id '+ transaction.id + ' ' + meta_data.id_amount_map.get(transaction.id));
        new_row.innerHTML = `
            <td > ${transaction.transaction_type} </td>
            <td> ${transaction.description} </td>
            <td> ${transaction.amount} </td>
            <td> <a href = '#' class = 'delete' id=${transaction.id} > Delete </a></td>` ;
        
        list.appendChild(new_row);
        if(transaction.transaction_type === 'income'){
            meta_data.AddIncome(transaction.amount);
        }
        else {
            meta_data.AddExpense(transaction.amount);
        }
    }
    
    // Showing alert on the page
    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
    
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
    
        const form = document.querySelector('#data-form');
        container.insertBefore(div, form);
        
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    
    deleteData(target) {
        if(target.className === 'delete'){
            if(target.parentElement.parentElement.className === 'income'){
                meta_data.DeleteIncome(meta_data.id_amount_map.get(Number(target.id)));
            }
            else if(target.parentElement.parentElement.className==='expense'){
                meta_data.DeleteExpense(meta_data.id_amount_map.get(Number(target.id)));
            }

            target.parentElement.parentElement.remove();
        }
    }
    //Clearing default fields
    clearField() {
        document.getElementById('data').value = '';
    }
}

// document.addEventListener('DOMcontentLoaded', function(e){
//     const meta_data = new MetaData();
// });

// Submit event
document.getElementById('data-form').addEventListener('submit', 
function(e) {
    doc = document.getElementById('data').value;
    const valid = new Validate_data();
    let isValid = true;
    
    // Not checking csv data for now
    //let isValid = valid.validate(doc);

    const ui = new UI();
    if(!isValid){
        ui.showAlert('Please enter valid data', 'error');
    }
    else{
        let rows = doc.split(' ');

        for(let i = 1; i< rows.length ;i++)
        {
            let data = rows[i].split(',');
            let transaction_type = data[0];
            let description = data[1];
            let amount = data[2];

            const transaction = new Transaction(transaction_type,
                    description, amount);
            
            ui.addTransaction(transaction);
        }

        ui.clearField();
        ui.showAlert('Data added', 'success');
    }
    e.preventDefault();
});

// To delete the data
document.getElementById('transaction-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteData(e.target);
    ui.showAlert('Transaction deleted', 'success');
    e.preventDefault();
});
