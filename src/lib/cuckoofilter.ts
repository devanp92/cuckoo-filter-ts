import {
  Hash
} from './hash';
import {
  Bucket
} from './bucket';
import {
  ICuckooFilter
} from './icuckoofilter';

export class CuckooFilter implements ICuckooFilter {
  numEntries: number = 0;
  buckets: Map<number, Bucket>;
  bucketSize: number;
  maxEviction: number;

  /**
   * @param maxEviction max number of kicks before giving up
   * @param bucketSize number of fingerprints each bucket can hold
   * @param numBuckets number of buckets the cuckoo filter holds
   * @param fpSize number of bits allowed for a fingerprint
   */
  constructor(maxEviction: number = 500, bucketSize: number = 4, private numBuckets: number, private fpSize: number) {
    this.maxEviction = maxEviction;
    this.bucketSize = bucketSize;
    this.buckets = new Map<number, Bucket>();

    for (let i = 0; i < this.numBuckets; i++) {
      this.buckets.set(i, new Bucket(this.bucketSize));
    }
  }

  /**
   * Set
   * Find two possible buckets to insert. If they insert, return early.
   * If the can't, swap fingerprints in random buckets until maxEviction.
   * @param item item to set
   */
  set(item: any): boolean {
    const {
      firstBucket,
      secondBucket,
      fingerprint,
      firstPossibleIndex,
      secondPossibleIndex
    } = this.getTwoPossibleBuckets(item);

    if (firstBucket.set(fingerprint) ||
      secondBucket.set(fingerprint)) {
      this.numEntries++;

      return true;
    }

    let randomFirstOrSecond = Math.floor(Math.random()) * 2 === 1 ?
      firstPossibleIndex :
      secondPossibleIndex;

    for (let i = 0; i < this.maxEviction; i++) {
      const randomBucket = this.buckets.get(randomFirstOrSecond);

      const swappedFingerprint = randomBucket.swap(fingerprint);

      randomFirstOrSecond = (randomFirstOrSecond ^ this.getHashedIndex(swappedFingerprint)) % this.numBuckets;

      if (randomBucket.set(swappedFingerprint)) {
        this.numEntries++;
        return true;
      }
    }

    return false;
  }

  /**
   * Contains
   * @param item item to find
   */
  contains(item: any): boolean {
    if (this.isEmpty()) {
      return false;
    }

    const {
      firstBucket,
      secondBucket,
      fingerprint
    } = this.getTwoPossibleBuckets(item);

    return firstBucket.contains(fingerprint) || secondBucket.contains(fingerprint);
  }

  /**
   * Find the two buckets containing the item.
   * If either buckets deletes the item, return true.
   * Otherwise, return false.
   * @param item item to delete
   */
  delete(item: any): boolean {
    if (this.isEmpty()) {
      return false;
    }

    const {
      firstBucket,
      secondBucket,
      fingerprint
    } = this.getTwoPossibleBuckets(item);

    if (firstBucket.delete(fingerprint) || secondBucket.delete(item)) {
      this.numEntries--;
      return true;
    }

    return false;
  }

  private getTwoPossibleBuckets(item: any): any {
    const fingerprint = Hash.getFingerprint(item, this.fpSize);
    const [firstPossibleIndex, secondPossibleIndex] = this.getTwoPossibleIndicies(item, fingerprint);

    const firstBucket = this.buckets.get(firstPossibleIndex);
    const secondBucket = this.buckets.get(secondPossibleIndex);

    return {
      firstBucket,
      secondBucket,
      fingerprint,
      firstPossibleIndex,
      secondPossibleIndex
    };
  }

  private getTwoPossibleIndicies(item: any, fingerprint: string): number[] {
    const first = this.getHashedIndex(item);
    const second = (first ^ this.getHashedIndex(fingerprint)) % this.numBuckets;

    return [first, second];
  }

  private getHashedIndex(item: any): number {
    return parseInt(Hash.hash(item)) % this.numBuckets;
  }
  private isEmpty() {
    return this.numEntries === 0;
  }
}
