export class Bucket {
    /**
     * @param bucketSize number of fingerprints allowed to be stored at once
     */
    constructor(bucketSize) {
        this.bucketSize = bucketSize;
        this.buckets = [];
        this.buckets = Array(this.bucketSize);
    }
    set(fingerprint) {
        if (this.isFull()) {
            return false;
        }
        const firstUndefinedElementIndex = this.buckets.findIndex(x => !x);
        this.buckets.splice(firstUndefinedElementIndex, 0, fingerprint);
        return true;
    }
    contains(fingerprint) {
        return !!this.buckets.find(x => x === fingerprint);
    }
    delete(fingerprint) {
        if (this.isEmpty()) {
            return false;
        }
        const foundIndex = this.buckets.findIndex(x => x === fingerprint);
        if (foundIndex === -1) {
            return false;
        }
        return !!this.buckets.splice(foundIndex, 1);
    }
    swap(fingerprint) {
        const randomIndexToSwap = Math.floor(Math.random() * this.buckets.length);
        [fingerprint, this.buckets[randomIndexToSwap]] = [this.buckets[randomIndexToSwap], fingerprint];
        return fingerprint;
    }
    isFull() {
        return this.buckets
            .filter(x => x)
            .length === this.bucketSize;
    }
    isEmpty() {
        return this.buckets.length === 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9idWNrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTTtJQUdKOztPQUVHO0lBQ0gsWUFBb0IsVUFBa0I7UUFBbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUx0QyxZQUFPLEdBQWEsRUFBRSxDQUFDO1FBTXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsR0FBRyxDQUFDLFdBQW1CO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRCxNQUFNLDBCQUEwQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLDBCQUEwQixFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVoRSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFFBQVEsQ0FBQyxXQUFtQjtRQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFtQjtRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQztRQUVsRSxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELElBQUksQ0FBQyxXQUFtQjtRQUN0QixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFaEcsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRU8sTUFBTTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTzthQUNoQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNkLE1BQU0sS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFFTyxPQUFPO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0YifQ==