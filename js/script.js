// Business Logic for Ticket ---------
function User() {
    this.accounts = {};
    this.currentId = 2013000001;
}

User.prototype.addAccount = function (account) {
    account.id = this.assignId();
    this.accounts[account.id] = account;
};

User.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

User.prototype.findAccount = function (id) {
    if (this.accounts[id] != undefined) {
        return this.accounts[id];
    }
    return false;
};

User.prototype.deleteAccount = function (id) {
    if (this.accounts[id] === undefined) {
        return false;
    }
    delete this.accounts[id];
    return true;
};



// Business Logic for account ---------
function Account(accountName1, accountName2, address, age, bankName, iDeposit , deposit, withdraw) {
    this.accountName1 = accountName1;
    this.accountName2 = accountName2;
    this.address = address;
    this.age = age;
    this.bankName = bankName;
    this.iDeposit = iDeposit ;
    this.deposit = deposit;
    this.withdraw = withdraw;

}

Account.prototype.fullName = function () {
    return this.accountName1 + " " + this.accountName2;
    ;
};

function getInputNumber(id) {
    const amount = document.getElementById(id).value;

    const amountNumber = parseFloat(amount);
    return amountNumber;
}
function getInnerText(id) {
    let currentBalance = document.getElementById(id).innerText;
    let balanceNumber = parseFloat(0 + currentBalance );
    return balanceNumber;
}





// user interface logic
let user = new User();
function displayAccountDetails(userToDisplay) {
    let accountList = $("ol#accounts");
    let htmlForAccountInfo = "";
    Object.keys(userToDisplay.accounts).forEach(function (key) {
        const account = userToDisplay.findAccount(key);
        htmlForAccountInfo += "<li id=" + account.id + ">" + account.fullName() + " " + account.id + " " + account.iDeposit + "</li>";
    });
    accountList.html(htmlForAccountInfo);
}


function showAccount(accountId) {
    const account = user.findAccount(accountId);
    $(".jaiz").toggle();
    $("#user-name").text(account.fullName());
    $("#user-account").html(account.id);
    $(".user-bank").html(account.bankName);
    $("#currentDeposit").html(account.iDeposit);
    $("#currentWithdraw").html(account.withdraw);
    $("#currentBalance").html(account.iDeposit);


    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + " " + account.id + ">Delete Account</button>");
}





function attachContactListeners() {
    $("ol#accounts").on("click", "li", function () {
        showAccount(this.id);
    });
    $("#addDepositBtn").on("click", function () {
        const deposit = getInputNumber('depositAmount')
        const depositAmount = getInnerText('currentDeposit');
        let depositAdBalance = deposit + depositAmount;
        $("#currentDeposit").html(depositAdBalance);
        $("#depositAmount").val("");
        const balance = getInnerText('currentBalance');
        let totalBalance = balance + deposit;
        $("#currentBalance").html(totalBalance);
        console.log(deposit)
        console.log(depositAmount)
        console.log(depositAdBalance)
    });
    $("#withdrawBtn").on("click", function () {
        const withdraw = getInputNumber('withdrawAmount');
        const withdrawNumber = getInnerText('currentWithdraw');
        let totalWithdraw = withdrawNumber + withdraw;
        $('#currentWithdraw').html(totalWithdraw);
        $('#withdrawAmount').val("");
        const balanceNumber = getInnerText('currentBalance');
        let totalBalance = balanceNumber - withdraw;
        $('#currentBalance').html(totalBalance);
        console.log(withdraw)
        console.log(withdrawNumber)
        console.log(totalWithdraw)

    });
    $("#buttons").on("click", ".deleteButton", function () {
        user.deleteAccount(this.id);
        $("#show-account").hide();
        displayAccountDetails(user);
    });
  
}

$(document).ready(function () {
    attachContactListeners();

    // customer details form
    $(".customer-form").submit(function (event) {
        event.preventDefault();
        const inputtedSurname = $("input.surname").val();
        const inputtedFirstName = $("input.firstname").val();
        const inputtedAddress = $("input.address").val();
        const inputtedAge = $("input.age").val();
        const inputtedBank = $("select.bank").val().toUpperCase();
        const initialDeposit = parseInt($("input.i-deposit").val());
        const deposit = parseInt($("input#depositAmount").val());
        const withdraw = parseInt($("input#withdrawAmount").val());
        let newAccount = new Account(inputtedSurname, inputtedFirstName, inputtedAddress, inputtedAge, inputtedBank, initialDeposit, deposit, withdraw);
        user.addAccount(newAccount);
        displayAccountDetails(user);
        console.log(user.accounts);
    });
});


