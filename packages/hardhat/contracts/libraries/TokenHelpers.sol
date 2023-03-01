// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/**
 * @title The token helpers library
 * @notice TODO
 * @dev this is the internal version of the library, which mean that it should only be used for internal purpose
 * by the same name.
 */
library TokenHelpers {
    /**
     * @notice Called when a transfert have failed
     */
    event FailedTransfer(address receiver, uint256 amount);

    /**
     * @notice Transfert funds
     * @param _receiver the receiver address
     * @param _amount the amount to transfert
     * @dev TODO NEXT VERSION use SafeERC20 library from OpenZeppelin
     */
    function safeTransfert(address _receiver, uint256 _amount) public onlyIfEnoughtBalance(_amount) {
        (bool success, ) = _receiver.call{ value: _amount }("");

        if (!success) {
            emit FailedTransfer(_receiver, _amount);
            require(false, "Transfer failed.");
        }
    }

    /**
     * @notice Transfert ERC20 token
     * @param contractAddress the ERC20 contract address
     * @param _from the address that will send the funds
     * @param _to the receiver for the funds
     * @param _amount the amount to send
     * @dev Callable by admin or factory
     */
    function transfertERC20(address contractAddress, address _from, address _to, uint256 _amount) public {
        bool success = IERC20(contractAddress).transferFrom(_from, _to, _amount);
        if (!success) require(false, "Amount transfert failed");
    }

    /**
     * @notice Transfert ERC721 token
     * @param contractAddress the ERC721 contract address
     * @param _from the address that will send the funds
     * @param _to the receiver for the funds
     * @param _tokenId the token id
     * @dev Callable by admin or factory
     */
    function transfertERC721(address contractAddress, address _from, address _to, uint256 _tokenId) public {
        ERC721(contractAddress).transferFrom(_from, _to, _tokenId);
    }

    /**
     * @notice Get the list of token ERC721
     * @param _token the token address to check
     * @param _account the account to check
     * @return _tokenIds list of token ids for account
     * @dev Callable by admin
     */
    function getERC721TokenIds(address _token, address _account) public view returns (uint[] memory _tokenIds) {
        uint[] memory tokensOfOwner = new uint[](ERC721(_token).balanceOf(_account));
        uint i;

        for (i = 0; i < tokensOfOwner.length; i++) {
            tokensOfOwner[i] = ERC721Enumerable(_token).tokenOfOwnerByIndex(_account, i);
        }
        return (tokensOfOwner);
    }

    /**
     * @notice Get the account balance for given token ERC20
     * @param _token the token address to check
     * @param _account the account to check
     * @return _balance balance for account
     * @dev Callable by admin
     */
    function getERC20Balance(address _token, address _account) public view returns (uint256 _balance) {
        return IERC20(_token).balanceOf(_account);
    }

    /**
     * @notice Modifier that ensure that treasury fee are not too high
     */
    modifier onlyIfEnoughtBalance(uint256 _amount) {
        require(address(this).balance >= _amount, "Not enough in contract balance");
        _;
    }
}
