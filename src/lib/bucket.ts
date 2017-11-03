import {
  IBucket
} from './ibucket';

export class Bucket implements IBucket {
  buckets: string[] = [];

  /**
   * @param bucketSize number of fingerprints allowed to be stored at once
   */
  constructor(private bucketSize: number) {
    this.buckets = Array(this.bucketSize);
  }

  set(fingerprint: string): boolean {
    if (this.isFull()) {
      return false;
    }

    const firstUndefinedElementIndex = this.buckets.findIndex(x => !x);
    this.buckets.splice(firstUndefinedElementIndex, 0, fingerprint);

    return true;
  }

  contains(fingerprint: string): boolean {
    return !!this.buckets.find(x => x === fingerprint);
  }

  delete(fingerprint: string): boolean {
    if (this.isEmpty()) {
      return false;
    }

    const foundIndex = this.buckets.findIndex(x => x === fingerprint);

    if (foundIndex === -1) {
      return false;
    }

    return !!this.buckets.splice(foundIndex, 1);
  }

  swap(fingerprint: string): string {
    const randomIndexToSwap = Math.floor(Math.random() * this.buckets.length);
    [fingerprint, this.buckets[randomIndexToSwap]] = [this.buckets[randomIndexToSwap], fingerprint];

    return fingerprint;
  }

  private isFull(): boolean {
    return this.buckets
      .filter(x => x)
      .length === this.bucketSize;
  }

  private isEmpty(): boolean {
    return this.buckets.length === 0;
  }
}
