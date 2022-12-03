/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "ERC677Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC677Token__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Basic",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Basic__factory>;
    getContractFactory(
      name: "ERC677",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC677__factory>;
    getContractFactory(
      name: "ERC677Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC677Receiver__factory>;
    getContractFactory(
      name: "LinkToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkToken__factory>;
    getContractFactory(
      name: "BasicToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BasicToken__factory>;
    getContractFactory(
      name: "StandardToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StandardToken__factory>;
    getContractFactory(
      name: "AutomationBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AutomationBase__factory>;
    getContractFactory(
      name: "ConfirmedOwner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConfirmedOwner__factory>;
    getContractFactory(
      name: "ConfirmedOwnerWithProposal",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConfirmedOwnerWithProposal__factory>;
    getContractFactory(
      name: "AutomationCompatibleInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AutomationCompatibleInterface__factory>;
    getContractFactory(
      name: "OwnableInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableInterface__factory>;
    getContractFactory(
      name: "Cron",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Cron__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "Factory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Factory__factory>;
    getContractFactory(
      name: "GameFactoryV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameFactoryV2__factory>;
    getContractFactory(
      name: "GameV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameV2__factory>;
    getContractFactory(
      name: "CronUpkeepInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CronUpkeepInterface__factory>;
    getContractFactory(
      name: "GameInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameInterface__factory>;
    getContractFactory(
      name: "GameV1Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameV1Interface__factory>;
    getContractFactory(
      name: "IChild",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IChild__factory>;
    getContractFactory(
      name: "ICronUpkeep",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICronUpkeep__factory>;
    getContractFactory(
      name: "IKeeper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IKeeper__factory>;
    getContractFactory(
      name: "Multicall3",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Multicall3__factory>;
    getContractFactory(
      name: "CronUpkeep",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CronUpkeep__factory>;
    getContractFactory(
      name: "Keeper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Keeper__factory>;
    getContractFactory(
      name: "GameFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameFactory__factory>;
    getContractFactory(
      name: "GameV1",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameV1__factory>;

    getContractAt(
      name: "ERC677Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC677Token>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Basic",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Basic>;
    getContractAt(
      name: "ERC677",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC677>;
    getContractAt(
      name: "ERC677Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC677Receiver>;
    getContractAt(
      name: "LinkToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkToken>;
    getContractAt(
      name: "BasicToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BasicToken>;
    getContractAt(
      name: "StandardToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StandardToken>;
    getContractAt(
      name: "AutomationBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AutomationBase>;
    getContractAt(
      name: "ConfirmedOwner",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConfirmedOwner>;
    getContractAt(
      name: "ConfirmedOwnerWithProposal",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConfirmedOwnerWithProposal>;
    getContractAt(
      name: "AutomationCompatibleInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AutomationCompatibleInterface>;
    getContractAt(
      name: "OwnableInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableInterface>;
    getContractAt(
      name: "Cron",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Cron>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Proxy>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "Factory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Factory>;
    getContractAt(
      name: "GameFactoryV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameFactoryV2>;
    getContractAt(
      name: "GameV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameV2>;
    getContractAt(
      name: "CronUpkeepInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CronUpkeepInterface>;
    getContractAt(
      name: "GameInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameInterface>;
    getContractAt(
      name: "GameV1Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameV1Interface>;
    getContractAt(
      name: "IChild",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IChild>;
    getContractAt(
      name: "ICronUpkeep",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICronUpkeep>;
    getContractAt(
      name: "IKeeper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IKeeper>;
    getContractAt(
      name: "Multicall3",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Multicall3>;
    getContractAt(
      name: "CronUpkeep",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CronUpkeep>;
    getContractAt(
      name: "Keeper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Keeper>;
    getContractAt(
      name: "GameFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameFactory>;
    getContractAt(
      name: "GameV1",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameV1>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
