import moment from "moment-timezone";

class CryptoClock {
  private ethBlockTime: number;
  private currentBlock: number;

  constructor(currentBlock: number) {
    this.ethBlockTime = 13.5;
    this.currentBlock = currentBlock; // Average Ethereum block time in seconds
  }

  convertTimeToEthBlock(time: string, timeZone: string): number {
    const currentTime = moment().tz(timeZone);
    const targetTime = moment.tz(time, timeZone);
    const timeDiff = targetTime.diff(currentTime, "seconds");
    const blockDiff = Math.floor(timeDiff / this.ethBlockTime);
    const currentBlock = this.currentBlock;
    const targetBlock = currentBlock + blockDiff;
    return targetBlock;
  }

  convertEthBlocksToTime(ethBlocks: number, timeZone: string): string {
    const ethSeconds = ethBlocks * this.ethBlockTime;
    const currentTime = moment().tz(timeZone);
    const targetTime = currentTime.add(ethSeconds, "seconds");
    return targetTime.format();
  }
}

export default CryptoClock;
