// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import { Keeper } from "../keepers/Keeper.sol";

/**
 * @title The Keeper helpers library
 * @notice TODO
 * @dev this is the internal version of the library, which mean that it should only be used for internal purpose
 * by the same name.
 */
library KeeperHelpers {
    /**
     * @notice Create a new keeper
     * @param _cronUpkeep the new keeper address
     * @param _encodedCron the encodedCron
     * @param _handler the function to call
     * @return _keeper the keeper address
     */
    function createKeeper(
        address _cronUpkeep,
        string memory _encodedCron,
        string memory _handler
    ) public returns (address _keeper) {
        Keeper keeper = new Keeper(address(_cronUpkeep), _handler, _encodedCron);
        return address(keeper);
    }
}
