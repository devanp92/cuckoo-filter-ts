import { Bucket } from './bucket';
export interface ICuckooFilter {
    buckets: Map<number, Bucket>;
    numEntries: number;
    bucketSize: number;
    maxEviction: number;
    set(item: any): boolean;
    contains(item: any): boolean;
    delete(item: any): boolean;
}
