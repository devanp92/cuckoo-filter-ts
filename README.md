# Cuckoo Filter

Typescript implementation of a Cuckoo Filter.

### Introduction

A [Cuckoo Filter](https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf) is a probabilistic data structure that is used for set membership. It is built with the fundamentals of a [Bloom Filter](https://en.wikipedia.org/wiki/Bloom_filter) though offers four advantages over the Bloom Filter (as cited in the documented paper):

1. Dynamic `add` and `delete`
2. Faster lookup time
3. Easier to implement
4. Uses less space (if the target false positive rate is less than 3%)

### Description

A Cuckoo Filter is comprised of a `n` of buckets where each bucket can store `m` `k`-bit sized fingprints. When inserting an object into the filter, it firsts creates a fingerprint, using [MurmurHash3](https://en.wikipedia.org/wiki/MurmurHash), then determines two buckets the fingerprint can be stored in. If either one of the buckets has space, it will be inserted into one of the two. If not, it will evict fingerprints and swap them with different buckets. This process can occur up to a configurable number of times.

Similar to a Bloom Filter, the Cuckoo Filter will determine if an object **might** be stored or is **definitely not** stored. There can be an issue with the aforementioned fourth advantage, where an existing fingerprint is inserted into the filter.

### Installing

```
yarn
```

## Running the tests

```
yarn run build
yarn run unit
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/devanp92/cuckoo-filter-ts/blob/master/LICENSE) file for details

## Acknowledgments

* Authors of [Cuckoo Filter](https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf)
