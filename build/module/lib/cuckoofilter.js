import { Hash } from './hash';
import { Bucket } from './bucket';
export class CuckooFilter {
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
            this.buckets.set(i, new Bucket(this.bucketSize));
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
    getTwoPossibleIndicies(item, fingerprint) {
        const first = this.getHashedIndex(item);
        const second = (first ^ this.getHashedIndex(fingerprint)) % this.numBuckets;
        return [first, second];
    }
    getHashedIndex(item) {
        return parseInt(Hash.hash(item)) % this.numBuckets;
    }
    isEmpty() {
        return this.numEntries === 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vja29vZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jdWNrb29maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLElBQUksRUFDTCxNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQ0wsTUFBTSxFQUNQLE1BQU0sVUFBVSxDQUFDO0FBS2xCLE1BQU07SUFNSjs7Ozs7T0FLRztJQUNILFlBQVksY0FBc0IsR0FBRyxFQUFFLGFBQXFCLENBQUMsRUFBVSxVQUFrQixFQUFVLE1BQWM7UUFBMUMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFYakgsZUFBVSxHQUFXLENBQUMsQ0FBQztRQVlyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBRXpDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLElBQVM7UUFDWCxNQUFNLEVBQ0osV0FBVyxFQUNYLFlBQVksRUFDWixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNwQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUM5QixZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFbEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDM0Qsa0JBQWtCO1lBQ2xCLG1CQUFtQixDQUFDO1FBRXRCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFM0QsTUFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTFELG1CQUFtQixHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUV4RyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUSxDQUFDLElBQVM7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELE1BQU0sRUFDSixXQUFXLEVBQ1gsWUFBWSxFQUNaLFdBQVcsRUFDWixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFTO1FBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELE1BQU0sRUFDSixXQUFXLEVBQ1gsWUFBWSxFQUNaLFdBQVcsRUFDWixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8scUJBQXFCLENBQUMsSUFBUztRQUNyQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVqRyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFM0QsTUFBTSxDQUFDO1lBQ0wsV0FBVztZQUNYLFlBQVk7WUFDWixXQUFXO1lBQ1gsa0JBQWtCO1lBQ2xCLG1CQUFtQjtTQUNwQixDQUFDO0lBQ0osQ0FBQztJQUVPLHNCQUFzQixDQUFDLElBQVMsRUFBRSxXQUFtQjtRQUMzRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRTVFLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU8sY0FBYyxDQUFDLElBQVM7UUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNyRCxDQUFDO0lBQ08sT0FBTztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0YifQ==