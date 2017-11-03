import { IBucket } from './ibucket';
export declare class Bucket implements IBucket {
    private bucketSize;
    buckets: string[];
    /**
     * @param bucketSize number of fingerprints allowed to be stored at once
     */
    constructor(bucketSize: number);
    set(fingerprint: string): boolean;
    contains(fingerprint: string): boolean;
    delete(fingerprint: string): boolean;
    swap(fingerprint: string): string;
    private isFull();
    private isEmpty();
}
