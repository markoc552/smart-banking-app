/******************************************************************************
* Smart Banking app smart contract.
*
* Created by: Marko Perajica
* Date: 02.05.2020
******************************************************************************/

pragma solidity 0.4.17;

contract FactorySBA
{
  address[] public accounts;
  address public created;

  event EmitContract(address indexed contractAddress);

  function createAccount(address _user, string firstName, string lastName, string email) public {
      address newAccount = new SBAContract(_user, firstName, lastName, email);

      accounts.push(newAccount);

      created = newAccount;
  }

  function getAccount() public view returns (address) {
      return created;
  }
}

contract SBAContract
{

    struct User {
        string _firstName;
        string _lastName;
        string _email;
        address _address;
    }

    struct Transaction {
        address _sender;
        address _recepient;
        uint256 _timestamp;
        uint256 _amount;
    }

    address private _authority;
    uint16 private transactionCount;
    mapping(uint => Transaction) transactions;
    mapping(uint => User) _user;
    address[] waults;

    event SendTransaction(address indexed recepient, address indexed sender, uint amount);

    modifier restricted() {
        require(msg.sender == _user[0]._address);
        _;
    }

    function SBAContract(address user, string firstName, string lastName, string email) public {
        _authority = msg.sender;

        User memory newUser = User({
            _firstName : firstName,
            _lastName : lastName,
            _email : email,
            _address : user
            });

        _user[0] = newUser;
    }

    function getUser() public view returns (string, string, string, address) {
        return (_user[0]._firstName, _user[0]._lastName, _user[0]._email, _user[0]._address);
    }

    function createWault(uint16 moneyToSave, string reason, uint256 timeline) public restricted {
        address newWault = new Wault(_user[0]._address, reason, moneyToSave, timeline);

        waults.push(newWault);
    }

    function getWaults() public view returns (address[]) {
        return waults;
    }

    function sendMoney(address recepient, uint256 amount) public payable {
        recepient.transfer(amount);

        Transaction memory newTransaction = Transaction({
            _sender : msg.sender,
            _recepient : recepient,
            _timestamp: block.timestamp,
            _amount : amount
            });

        transactions[getTransactionCount()] = newTransaction;
        transactionCount++;

        //emit event SendTransaction
        SendTransaction(recepient, msg.sender, msg.value);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function addMoneyToAccount() public payable {
        Transaction memory newTransaction = Transaction({
            _sender : msg.sender,
            _recepient : 0,
            _timestamp: block.timestamp,
            _amount : msg.value
            });

        transactions[getTransactionCount()] = newTransaction;

        transactionCount++;

        SendTransaction(0, msg.sender, msg.value);
    }

    function addSenderToTransactions(address _address, uint256 amount) public {
        Transaction memory newTransaction = Transaction({
            _sender : _address,
            _recepient : 0,
            _timestamp: block.timestamp,
            _amount : amount
            });

        transactions[getTransactionCount()] = newTransaction;

        transactionCount++;
    }

    function getTransactions(uint index) public view returns (address, address, uint256, uint256) {
        address sender = transactions[index]._sender;
        address recepient = transactions[index]._recepient;
        uint256 time = transactions[index]._timestamp;
        uint256 amount = transactions[index]._amount;

        return (sender, recepient, time, amount);
    }

    function getMoneyStatus() public view returns (uint256) {
        return this.balance;
    }

    //Simulation of withdraw money (money is sent to authority instead withdrawn)
    function withDrawMoney(uint256 _amount, address authority) public payable restricted {

      Transaction memory newTransaction = Transaction({
          _sender : msg.sender,
          _recepient : 0x1,
          _timestamp: block.timestamp,
          _amount : _amount
          });

          transactions[getTransactionCount()] = newTransaction;

          transactionCount++;

          SendTransaction(0, msg.sender, msg.value);

        authority.transfer(_amount);
    }
}

contract Wault
{
    struct Payment {
        uint timestamp;
        uint amount;
    }

    address owner;
    uint16 _moneyGoal;
    uint256 _timeline;
    string _reason;
    Payment[] payments;

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function Wault(address _address, string reason, uint16 moneyToSave, uint256 timeline) public {
        owner = _address;
        _moneyGoal = moneyToSave;
        _timeline = timeline;
        _reason = reason;
    }

    function getWaultStatus() public view returns (uint16, uint256, uint256, string) {
        return (_moneyGoal, this.balance, _timeline, _reason);
    }

    function sendMoneyToWault() public payable {
        Payment memory newPayment = Payment({
            timestamp : block.timestamp,
            amount : msg.value
            });

        payments.push(newPayment);
    }

    function withDrawMoney(address authority) public payable {
        authority.transfer(this.balance);
    }
}
