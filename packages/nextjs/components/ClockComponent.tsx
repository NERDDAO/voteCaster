; import axios from 'axios';
import moment from 'moment-timezone';

class CryptoClock {
    private ethBlockTime: number;

    constructor() {
        this.ethBlockTime = 13.5; // Average Ethereum block time in seconds
    }

    async getEthBlockNumber(): Promise<number> {
        try {
            const response = await axios.get('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber');
            return parseInt(response.data.result, 16);
        } catch (error) {
            throw new Error('Failed to fetch Ethereum block number');
        }
    }

    async convertTimeToEthBlock(time: string, timeZone: string): Promise<number> {
        const currentTime = moment().tz(timeZone);
        const targetTime = moment.tz(time, timeZone);
        const timeDiff = targetTime.diff(currentTime, 'seconds');
        const blockDiff = Math.floor(timeDiff / this.ethBlockTime);
        const currentBlock = await this.getEthBlockNumber();
        const targetBlock = currentBlock + blockDiff;
        return targetBlock;
    }

    convertEthBlocksToTime(ethBlocks: number, timeZone: string): string {
        const ethSeconds = ethBlocks * this.ethBlockTime;
        const currentTime = moment().tz(timeZone);
        const targetTime = currentTime.add(ethSeconds, 'seconds');
        return targetTime.format();
    }
}

export default CryptoClock;
