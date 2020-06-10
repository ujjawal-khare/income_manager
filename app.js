// Data constructor
// transaction type, description, amount as parameter
function Transaction(transaction_type, description, amount) {
    this.transaction_type = transaction_type;
    this.description = description;
    this.amount = amount;
}

// To validate csv string

function validate (val) {
    
    var rows = String(doc.split('\n'));
    var data = rows.split(',');

    if(data[0]==='' || data[1]==='' || data[2]==='') {
        return false;
    }
    console.log(data);
    if(data.length !== 3)
    {
        //alert("Please enter valid csv data");
        return false;
    }

    // console.log("val " +  typeof(val));
    // for(var i=0;i<val.length;i++)
    // {
    //     if(val[i].length != 1){
    //         alert("Please enter valid csv data");
    //         return false;
    //     }
    // }
return true;
}

// UI Constructor
function UI() {}

//Adding expense to the data
UI.prototype.addTransaction = function(transaction) {
    const list = document.getElementById('transaction-list');
    const new_row = document.createElement('tr');
    new_row.className = `${transaction.transaction_type}`;
    
    new_row.innerHTML = `
        <td > ${transaction.transaction_type} </td>
        <td> ${transaction.description} </td>
        <td> ${transaction.amount} </td>
        <td> <a href = '#' class = 'delete' > Delete </a></td>` ;
    
    list.appendChild(new_row);
}

// Showing alert on the page
UI.prototype.showAlert = function(message, className) {
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

UI.prototype.deleteData = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}
//Clearing default fields
UI.prototype.clearField = function() {
    document.getElementById('data').value = '';
}

// For submitting data
document.getElementById('data-form').addEventListener('submit', 
function(e) {
    doc = document.getElementById('data').value;
    var isValid = validate(doc);

    const ui = new UI();
    console.log(isValid);
    if(!isValid){
        ui.showAlert('Please enter valid data', 'error');
    }
    else{
        var rows = String(doc.split('\n'));
        var data = rows.split(',');
        
        var transaction_type = data[0];
        var description = data[1];
        var amount = data[2];

        const transaction = new Transaction(transaction_type,
                description, amount);
        
        ui.addTransaction(transaction);
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

