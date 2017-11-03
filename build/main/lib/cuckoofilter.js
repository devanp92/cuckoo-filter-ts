"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = require("./hash");
const bucket_1 = require("./bucket");
class CuckooFilter {
    /**
     * @param maxEviction max number of kicks before giving up
     * @param bucketSize number of fingerprints each bucket can hold
     * @param numBuckets number of buckets the cuckoo filter holds
     * @param fpSize number of bits allowed for a fingerprint
     */
    constructor(maxEviction = 500, bucketSize = 4, numBuckets, fpSize) {
        this.numBuckets = numBuckets;
        this.fpSize = fpSize;
        this.numEntries = 0;
        this.maxEviction = maxEviction;
        this.bucketSize = bucketSize;
        this.buckets = new Map();
        for (let i = 0; i < this.numBuckets; i++) {
            this.buckets.set(i, new bucket_1.Bucket(this.bucketSize));
        }
    }
    /**
     * Set
     * Find two possible buckets to insert. If they insert, return early.
     * If the can't, swap fingerprints in random buckets until maxEviction.
     * @param item item to set
     */
    set(item) {
        const { firstBucket, secondBucket, fingerprint, firstPossibleIndex, secondPossibleIndex } = this.getTwoPossibleBuckets(item);
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
    contains(item) {
        if (this.isEmpty()) {
            return false;
        }
        const { firstBucket, secondBucket, fingerprint } = this.getTwoPossibleBuckets(item);
        return firstBucket.contains(fingerprint) || secondBucket.contains(fingerprint);
    }
    /**
     * Find the two buckets containing the item.
     * If either buckets deletes the item, return true.
     * Otherwise, return false.
     * @param item item to delete
     */
    delete(item) {
        if (this.isEmpty()) {
            return false;
        }
        const { firstBucket, secondBucket, fingerprint } = this.getTwoPossibleBuckets(item);
        if (firstBucket.delete(fingerprint) || secondBucket.delete(item)) {
            this.numEntries--;
            return true;
        }
        return false;
    }
    getTwoPossibleBuckets(item) {
        const fingerprint = hash_1.Hash.getFingerprint(item, this.fpSize);
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
    getTwoPossibleIndicies(item, fingerprint) {
        const first = this.getHashedIndex(item);
        const second = (first ^ this.getHashedIndex(fingerprint)) % this.numBuckets;
        return [first, second];
    }
    getHashedIndex(item) {
        return parseInt(hash_1.Hash.hash(item)) % this.numBuckets;
    }
    isEmpty() {
        return this.numEntries === 0;
    }
}
exports.CuckooFilter = CuckooFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vja29vZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jdWNrb29maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FFZ0I7QUFDaEIscUNBRWtCO0FBS2xCO0lBTUU7Ozs7O09BS0c7SUFDSCxZQUFZLGNBQXNCLEdBQUcsRUFBRSxhQUFxQixDQUFDLEVBQVUsVUFBa0IsRUFBVSxNQUFjO1FBQTFDLGVBQVUsR0FBVixVQUFVLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBWGpILGVBQVUsR0FBVyxDQUFDLENBQUM7UUFZckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUV6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEdBQUcsQ0FBQyxJQUFTO1FBQ1gsTUFBTSxFQUNKLFdBQVcsRUFDWCxZQUFZLEVBQ1osV0FBVyxFQUNYLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDcEIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7WUFDOUIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVB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