// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

// import { ICronUpkeep } from "./ICronUpkeep.sol";
import { CronUpkeep } from "../upkeeps/CronUpkeep.sol";

interface IKeeper {
    /**
     * @notice Called when the creator or admin update encodedCron
     */
    event EncodedCronUpdated(uint256 jobId, string encodedCron);
    /**
     * @notice Called when the factory or admin update cronUpkeep
     */
    event CronUpkeepUpdated(uint256 jobId, address cronUpkeep);

    /**
     * @notice Register the cron to the upkeep contract
     * @dev Callable by admin or creator or factory
     */
    function registerCronToUpkeep(CronUpkeep _cronUpkeep) external;

    /**
     * @notice Set the keeper address
     * @param _cronUpkeep the new keeper address
     * @dev Callable by admin or factory
     */
    function setCronUpkeep(CronUpkeep _cronUpkeep) external;

    /**
     * @notice Set the encoded cron
     * @param _encodedCron the new encoded cron as * * * * *
     * @dev Callable by admin or creator
     */
    function setEncodedCron(string memory _encodedCron) external;

    /**
     * @notice Pause the current keeper and associated keeper job
     * @dev Callable by admin or creator
     */
    function pauseKeeper() external;

    /**
     * @notice Unpause the current keeper and associated keeper job
     * @dev Callable by admin or creator
     */
    function unpauseKeeper() external;
}
