import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './MetaCoin.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Transfer: new LogEvent<([_from: string, _to: string, _value: ethers.BigNumber] & {_from: string, _to: string, _value: ethers.BigNumber})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    sendCoin: new Func<[receiver: string, amount: ethers.BigNumber], {receiver: string, amount: ethers.BigNumber}, boolean>(
        abi, '0x90b98a11'
    ),
    getBalanceInEth: new Func<[addr: string], {addr: string}, ethers.BigNumber>(
        abi, '0x7bd703e8'
    ),
    getBalance: new Func<[addr: string], {addr: string}, ethers.BigNumber>(
        abi, '0xf8b2cb4f'
    ),
}

export class Contract extends ContractBase {

    getBalanceInEth(addr: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getBalanceInEth, [addr])
    }

    getBalance(addr: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getBalance, [addr])
    }
}
