const mmh3 = require('murmurhash3');

export class Hash {
  static hash(data: any): string {
    return mmh3.murmur32Sync(JSON.stringify(data)).toString();
  }

  static getFingerprint(data: any, fingerprintSize: number): string {
    return this.hash(data).substring(0, fingerprintSize);
  }
}
