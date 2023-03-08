// Business Logic for Ticket ---------
function User() {
    this.accounts = {};
    this.currentId = 0;
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
function Account(accountName1, accountName2, address, age, bankName, balance) {
    this.accountName1 = accountName1;
    this.accountName2 = accountName2;
    this.address = address;
    this.age = age;
    this.bankName = bankName;
    this.balance = balance;

    this.acctNumber = 2012345678;

}

Account.prototype.fullName = function () {
    return this.accountName1 + " " + this.accountName2;
    ;
};
Account.prototype.accountNumber = function () {

    return this.acctNumber++;

};


    // function(1) for take input value
function getInputNumber(id) {
        const amount = document.getElementById(id).value;
        const amountNumber = parseFloat(amount);
        return amountNumber;
    }
    // function(2) for take inner text value
    function getInnerText(id) {
        let currentBalance = document.getElementById(id).innerText;
        let balanceNumber = parseFloat(currentBalance);
        return balanceNumber;
}
    
    document.getElementById('addDepositBtn').addEventListener('click', function () {
        const deposit = getInputNumber('depositAmount');
        const depositAmount = getInnerText('currentDeposit');
        let depositAdBalance = deposit + depositAmount;

        document.getElementById('currentDeposit').innerText = depositAdBalance;
        document.getElementById('depositAmount').value = "";

        const balance = getInnerText('currentBalance');
        let totalBalance = balance + deposit;
        document.getElementById('currentBalance').innerText = totalBalance;
    })
    document.getElementById('withdrawBtn').addEventListener('click', function () {
        const withdraw = getInputNumber('withdrawAdd');
        const withdrawNumber = getInnerText('withdrawMony');
        const balanceNumber = getInnerText('currentBalance');
        const totalWithdraw = withdrawNumber + withdraw;

        document.getElementById('withdrawMony').innerText = totalWithdraw;
        document.getElementById('currentBalance').innerText = balanceNumber - withdraw;
        document.getElementById('withdrawAdd').value = "";
    });