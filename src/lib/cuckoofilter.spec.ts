import {
  CuckooFilter
} from 'cuckoo-filter-ts';
import {
  test
} from 'ava';

let cf;
test.beforeEach(t => {
  cf = new CuckooFilter(500, 4, 10, 10);
});

test('cuckoo filter', t => {
  t.is(500, cf.maxEviction);
  t.is(0, cf.numEntries);
});

test('cuckoo filter get possible indices', t => {
  const buckets = Array(10)
    .fill(0)
    .map((x, i) => i);

  const [first, second] = cf.getTwoPossibleIndicies({}, 'fingerprint');

  t.true(buckets.some(x => x === first));
  t.true(buckets.some(x => x === second));
});

test('cuckoo filter set', t => {
  t.true(cf.set({
    prop: 'some property'
  }));

  t.is(1, cf.numEntries);
});

test('cuckoo filter contains', t => {
  cf.set({
    prop: 'some property'
  });

  t.true(cf.contains({
    prop: 'some property'
  }));
});

test('cuckoo filter does not contain', t => {
  t.false(cf.contains({
    prop: 'some property'
  }));

  cf.set({
    prop: 'some property'
  });

  t.false(cf.contains({
    prop: 'some other property'
  }));
});

test('cuckoo filter delete when empty', t => {
  t.false(cf.delete({
    prop: 'some property'
  }));
});

test('cuckoo filter delete with one element', t => {
  cf.set({
    prop: 'some property'
  });

  t.true(cf.delete({
    prop: 'some property'
  }));

  t.false(cf.contains({
    prop: 'some property'
  }));
});

test('cuckoo filter delete non existant property', t => {
  cf.set({
    prop: 'some property'
  });

  t.false(cf.delete({
    prop: 'some other property'
  }));
});
