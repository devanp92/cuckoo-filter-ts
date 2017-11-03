"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mmh3 = require('murmurhash3');
class Hash {
    static hash(data) {
        return mmh3.murmur32Sync(JSON.stringify(data)).toString();
    }
    static getFingerprint(data, fingerprintSize) {
        return this.hash(data).substring(0, fingerprintSize);
    }
}
exports.Hash = Hash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUVwQztJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBUztRQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBUyxFQUFFLGVBQXVCO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdkQsQ0FBQztDQUNGO0FBUkQsb0JBUUMifQ==