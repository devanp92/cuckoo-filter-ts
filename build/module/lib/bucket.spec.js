import { Bucket } from 'cuckoo-filter-ts';
import { test } from 'ava';
let bucket;
test.beforeEach(t => {
    bucket = new Bucket(4);
});
test('bucket construction', t => {
    t.is(0, bucket.buckets.filter(x => x).length);
});
test('bucket set', t => {
    t.true(bucket.set('some fingerprint'));
    t.is(1, bucket.buckets.filter(x => x).length);
    const fp = bucket.buckets[0];
    t.is('some fingerprint', fp);
});
test('bucket contains', t => {
    bucket.set('some fingerprint');
    t.true(bucket.contains('some fingerprint'));
});
test('bucket set when full', t => {
    t.true(bucket.set('fp 1'));
    t.true(bucket.set('fp 2'));
    t.true(bucket.set('fp 3'));
    t.true(bucket.set('fp 4'));
    t.false(bucket.set('fp 5'));
});
test('bucket delete when empty', t => {
    t.is(0, bucket.buckets.filter(x => x).length);
    t.false(bucket.delete('some fingerprint'));
});
test('bucket delete fingerprint', t => {
    t.is(0, bucket.buckets.filter(x => x).length);
    bucket.set('some fingerprint');
    t.true(bucket.delete('some fingerprint'));
    t.is(0, bucket.buckets.filter(x => x).length);
});
test('bucket swap', t => {
    Array(4)
        .fill(0)
        .forEach((x, i) => bucket.set(`fingerprint ${i}`));
    t.is(4, bucket.buckets.filter(x => x).length);
    const fp = 'fingerprint 1';
    // `fp` could possibly swap with itself
    while (true) {
        const newFp = bucket.swap(fp);
        if (newFp !== fp) {
            t.not('fingerprint 1', newFp);
            break;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVja2V0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2J1Y2tldC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxNQUFNLEVBQ1AsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQ0wsSUFBSSxFQUNMLE1BQU0sS0FBSyxDQUFDO0FBRWIsSUFBSSxNQUFNLENBQUM7QUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDZixNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUV2QyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFOUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQy9CLENBQUMs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