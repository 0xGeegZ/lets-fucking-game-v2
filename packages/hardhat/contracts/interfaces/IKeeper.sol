// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

interface IKeeper {
    /**
     * @notice Called when the creator or admin call registerCronToUpkeep
     */
    event CronUpkeepRegistered(uint256 jobId, address cronUpkeep);
    /**
     * @notice Called when the creator or admin update encodedCron
     */
    event EncodedCronUpdated(uint256 jobId, string encodedCron);
    /**
     * @notice Called when the factory or admin update cronUpkeep
     */
    event CronUpkeepUpdated(uint256 jobId, address cronUpkeep);

    /**
     * @notice Return cronUpkeep
     * @dev Callable by only by owner
     */
    function getCronUpkeep() external view returns (address _cronUpkeep);

    /**
     * @notice Return encodedCron
     * @dev Callable by only by owner
     */
    function getEncodedCron() external view returns (string memory _encodedCron);

    /**
     * @notice Return handler
     * @dev Callable by only by owner
     */
    function getHandler() external view returns (string memory _handler);

    /**
     * @notice Register the cron to the upkeep contract
     * @dev Callable by only by owner
     */
    function registerCronToUpkeep() external;

    /**
     * @notice Register the cron to the upkeep contract
     * @dev Callable by only by owner
     */
    function registerCronToUpkeep(address _target) external;

    /**
     * @notice Set the keeper address
     * @param _cronUpkeep the new keeper address
     * @dev Callable by only by owner
     */
    function setCronUpkeep(address _cronUpkeep) external;

    /**
     * @notice Set the encoded cron
     * @param _encodedCron the new encoded cron as * * * * *
     * @dev Callable by only by owner
     */
    function setEncodedCron(string memory _encodedCron) external;

    /**
     * @notice Pause the current keeper and associated keeper job
     * @dev Callable by only by owner
     */
    function pauseKeeper() external;

    /**
     * @notice Unpause the current keeper and associated keeper job
     * @dev Callable by only by owner
     */
    function unpauseKeeper() external;

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) external;
}
