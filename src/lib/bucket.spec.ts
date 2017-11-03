import {
  Bucket
} from 'cuckoo-filter-ts';
import {
  test
} from 'ava';

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
