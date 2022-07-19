//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTTrader{
    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256) public balances;

 event safeTransferFrom(
        address from,
        address receiver,
        uint256 tokenId,
        uint256 amount,
        uint256 timestamp
    );

    struct Listing {
        uint256 price;
        address seller;
    }

    function addListing(
        uint256 price,
        address contractAddr,
        uint256 tokenId
    ) public
     {
        // ERC721 token = ERC721(contractAddr);
        // require(
        //     token.balanceOf(msg.sender) > 0 ,
        //     "Caller must own given token"
        // );
        // require(
        //     token.isApprovedForAll(msg.sender, address(this)),
        //     "Contract must be approved"
        // );

        listings[contractAddr][tokenId] = Listing(price, msg.sender);
    }

    function purchase(
        uint256 tokenId,
        uint256 amount,
        uint256 price,
        address seller
    ) public payable {
        // Listing memory item = listings[contractAddr][tokenId];
        require(msg.value >= price * amount, "Insuffiecient balance");
        balances[seller] += msg.value;

        // ERC721 token = ERC721(contractAddr);
    emit safeTransferFrom(seller, msg.sender, tokenId, amount, block.timestamp);
    }

    function withdraw(uint256 amount, address payable destAddr) public {
        // require(amount <= balances[msg.sender], "Insufficient funds");
        destAddr.transfer(amount);
        balances[msg.sender] -= amount;
    }
}
