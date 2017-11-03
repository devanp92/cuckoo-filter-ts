export interface IBucket {
  set(fingerprint: string): boolean;
  contains(fingerprint: string): boolean;
  delete(fingerprint: string): boolean;
  swap(fingerprint: string): string;
}
