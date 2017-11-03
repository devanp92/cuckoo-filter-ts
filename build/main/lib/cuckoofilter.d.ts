import { Bucket } from './bucket';
import { ICuckooFilter } from './icuckoofilter';
export declare class CuckooFilter implements ICuckooFilter {
    private numBuckets;
    private fpSize;
    numEntries: number;
    buckets: Map<number, Bucket>;
    bucketSize: number;
    maxEviction: number;
    /**
     * @param maxEviction max number of kicks before giving up
     * @param bucketSize number of fingerprints each bucket can hold
     * @param numBuckets number of buckets the cuckoo filter holds
     * @param fpSize number of bits allowed for a fingerprint
     */
    constructor(maxEviction: number, bucketSize: number, numBuckets: number, fpSize: number);
    /**
     * Set
     * Find two possible buckets to insert. If they insert, return early.
     * If the can't, swap fingerprints in random buckets until maxEviction.
     * @param item item to set
     */
    set(item: any): boolean;
    /**
     * Contains
     * @param item item to find
     */
    contains(item: any): boolean;
    /**
     * Find the two buckets containing the item.
     * If either buckets deletes the item, return true.
     * Otherwise, return false.
     * @param item item to delete
     */
    delete(item: any): boolean;
    private getTwoPossibleBuckets(item);
    private getTwoPossibleIndicies(item, fingerprint);
    private getHashedIndex(item);
    private isEmpty();
}
