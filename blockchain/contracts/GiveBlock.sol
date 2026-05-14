// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GiveBlock {

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    struct FundUsage {
        string purpose;
        uint256 amount;
        uint256 timestamp;
    }

    Donation[] public donations;

    FundUsage[] public fundUsages;

    event DonationMade(
        address indexed donor,
        uint256 amount,
        uint256 timestamp
    );

    event FundUsageRecorded(
        string purpose,
        uint256 amount,
        uint256 timestamp
    );

    function donate() public payable {

        require(msg.value > 0, "Donation must be greater than 0");

        donations.push(
            Donation({
                donor: msg.sender,
                amount: msg.value,
                timestamp: block.timestamp
            })
        );

        emit DonationMade(
            msg.sender,
            msg.value,
            block.timestamp
        );
    }

    function recordFundUsage(
        string memory _purpose,
        uint256 _amount
    )
        public
        onlyAdmin
    {

        require(_amount > 0, "Amount must be greater than 0");

        fundUsages.push(
            FundUsage({
                purpose: _purpose,
                amount: _amount,
                timestamp: block.timestamp
            })
        );

        emit FundUsageRecorded(
            _purpose,
            _amount,
            block.timestamp
        );
    }

    function getDonations()
        public
        view
        returns (Donation[] memory)
    {
        return donations;
    }

    function getFundUsages()
        public
        view
        returns (FundUsage[] memory)
    {
        return fundUsages;
    }

    function getDonationCount()
        public
        view
        returns (uint256)
    {
        return donations.length;
    }

    function getFundUsageCount()
        public
        view
        returns (uint256)
    {
        return fundUsages.length;
    }
}
