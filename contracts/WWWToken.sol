/// This file is auto-generated by Scribble and shouldn't be edited directly.
/// Use --disarm prior to make any changes.
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WWWToken is Ownable {
    event Paused(address _account);

    event Unpaused(address _account);

    event AssertionFailed(string message);

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    string private name;
    string private symbol;
    uint256 private totalSupply;
    bool private paused;

    modifier whenNotPaused() {
        require(!paused, "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(paused, "Pausable: not paused");
        _;
    }

    constructor() {
        WWWToken_name_ptr_string_memory_assign("WWWToken");
        symbol = "WWW";
    }

    function getName() external view returns (string memory) {
        return name;
    }

    function getSymbol() external view returns (string memory) {
        return symbol;
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }

    function getPaused() external view returns (bool) {
        return paused;
    }

    function decimals() public pure returns (uint8) {
        return 9;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function transfer(address _recipient, uint256 _amount) external onlyOwner() whenNotPaused() returns (bool) {
        _transfer(msg.sender, _recipient, _amount);
        return true;
    }

    function transferFrom(address _sender, address _recipient, uint256 _amount) external whenNotPaused() returns (bool) {
        _transfer(_sender, _recipient, _amount);
        uint256 currentAllowance = _allowances[_sender][msg.sender];
        require(currentAllowance >= _amount, "ERC20: transfer amount exceeds allowance");
        unchecked {
            _approve(_sender, msg.sender, currentAllowance - _amount);
        }
        return true;
    }

    function approve(address _spender, uint256 _amount) external whenNotPaused() returns (bool) {
        _approve(msg.sender, _spender, _amount);
        return true;
    }

    function allowance(address _owner, address _spender) external view returns (uint256) {
        return _allowances[_owner][_spender];
    }

    function burn(uint256 _amount) external whenNotPaused() returns (bool) {
        _burn(msg.sender, _amount);
        return true;
    }

    function mint(address _account, uint256 _amount) external onlyOwner() whenNotPaused() returns (bool) {
        _mint(_account, _amount);
        return true;
    }

    function pause() external onlyOwner() whenNotPaused() {
        paused = true;
        emit Paused(_msgSender());
    }

    function unpause() external whenPaused() onlyOwner() {
        paused = false;
        emit Unpaused(_msgSender());
    }

    function _transfer(address _sender, address _recipient, uint256 _amount) internal {
        require(_sender != address(0), "ERC20: transfer from the zero address");
        require(_recipient != address(0), "ERC20: transfer to the zero address");
        uint256 senderBalance = balances[_sender];
        require(senderBalance >= _amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            balances[_sender] = senderBalance - _amount;
        }
        balances[_recipient] += _amount;
    }

    function _mint(address _account, uint256 _amount) internal {
        require(_account != address(0), "ERC20: mint to the zero address");
        require((totalSupply + _amount) <= (10 ** decimals()), "Maximum number of tokens");
        totalSupply += _amount;
        balances[_account] += _amount;
    }

    function _burn(address _account, uint256 _amount) internal {
        require(_account != address(0), "ERC20: burn from the zero address");
        uint256 accountBalance = balances[_account];
        require(accountBalance >= _amount, "ERC20: burn amount exceeds balance");
        unchecked {
            balances[_account] = accountBalance - _amount;
        }
        totalSupply -= _amount;
    }

    function _approve(address _owner, address _spender, uint256 _amount) internal {
        require(_owner != address(0), "ERC20: approve from the zero address");
        require(_spender != address(0), "ERC20: approve to the zero address");
        _allowances[_owner][_spender] = _amount;
    }

    function WWWToken_name_ptr_string_memory_assign(string memory ARG0) internal returns (string storage RET0) {
        name = ARG0;
        RET0 = name;
        unchecked {
            if (!(false)) {
                emit AssertionFailed("0: ");
                assert(false);
            }
        }
    }
}