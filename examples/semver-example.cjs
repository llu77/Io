// load the whole API at once in a single object
const semver = require('semver')

// or just load the bits you need
// all of them listed here, just pick and choose what you want

// classes
const SemVer = require('semver/classes/semver')
const Comparator = require('semver/classes/comparator')
const Range = require('semver/classes/range')

// functions for working with versions
const semverParse = require('semver/functions/parse')
const semverValid = require('semver/functions/valid')
const semverClean = require('semver/functions/clean')
const semverInc = require('semver/functions/inc')
const semverDiff = require('semver/functions/diff')
const semverMajor = require('semver/functions/major')
const semverMinor = require('semver/functions/minor')
const semverPatch = require('semver/functions/patch')
const semverPrerelease = require('semver/functions/prerelease')
const semverCompare = require('semver/functions/compare')
const semverRcompare = require('semver/functions/rcompare')
const semverCompareLoose = require('semver/functions/compare-loose')
const semverCompareBuild = require('semver/functions/compare-build')
const semverSort = require('semver/functions/sort')
const semverRsort = require('semver/functions/rsort')

// low-level comparators between versions
const semverGt = require('semver/functions/gt')
const semverLt = require('semver/functions/lt')
const semverEq = require('semver/functions/eq')
const semverNeq = require('semver/functions/neq')
const semverGte = require('semver/functions/gte')
const semverLte = require('semver/functions/lte')
const semverCmp = require('semver/functions/cmp')
const semverCoerce = require('semver/functions/coerce')

// working with ranges
const semverSatisfies = require('semver/functions/satisfies')
const semverMaxSatisfying = require('semver/ranges/max-satisfying')
const semverMinSatisfying = require('semver/ranges/min-satisfying')
const semverToComparators = require('semver/ranges/to-comparators')
const semverMinVersion = require('semver/ranges/min-version')
const semverValidRange = require('semver/ranges/valid')
const semverOutside = require('semver/ranges/outside')
const semverGtr = require('semver/ranges/gtr')
const semverLtr = require('semver/ranges/ltr')
const semverIntersects = require('semver/ranges/intersects')
const semverSimplifyRange = require('semver/ranges/simplify')
const semverRangeSubset = require('semver/ranges/subset')

// Example usage
console.log('Semver Examples:\n')

// Using the full API
console.log('1. Using full API:')
console.log('  semver.valid("1.2.3"):', semver.valid('1.2.3'))
console.log('  semver.inc("1.2.3", "major"):', semver.inc('1.2.3', 'major'))
console.log()

// Using individual functions
console.log('2. Using individual functions:')
console.log('  semverValid("1.2.3"):', semverValid('1.2.3'))
console.log('  semverMajor("1.2.3"):', semverMajor('1.2.3'))
console.log('  semverMinor("1.2.3"):', semverMinor('1.2.3'))
console.log('  semverPatch("1.2.3"):', semverPatch('1.2.3'))
console.log()

// Comparisons
console.log('3. Version comparisons:')
console.log('  semverGt("2.0.0", "1.0.0"):', semverGt('2.0.0', '1.0.0'))
console.log('  semverLt("1.0.0", "2.0.0"):', semverLt('1.0.0', '2.0.0'))
console.log('  semverEq("1.0.0", "1.0.0"):', semverEq('1.0.0', '1.0.0'))
console.log()

// Working with ranges
console.log('4. Working with ranges:')
console.log('  semverSatisfies("1.2.3", "1.x"):', semverSatisfies('1.2.3', '1.x'))
console.log('  semverValidRange(">=1.0.0 <2.0.0"):', semverValidRange('>=1.0.0 <2.0.0'))
console.log()

// Sorting
console.log('5. Sorting versions:')
const versions = ['1.0.0', '3.0.0', '2.0.0', '1.5.0']
console.log('  Original:', versions)
console.log('  Sorted:', semverSort(versions))
console.log('  Reverse sorted:', semverRsort(versions))
console.log()

// Using classes
console.log('6. Using SemVer class:')
const version = new SemVer('1.2.3-beta.1+build.123')
console.log('  Version:', version.version)
console.log('  Major:', version.major)
console.log('  Minor:', version.minor)
console.log('  Patch:', version.patch)
console.log('  Prerelease:', version.prerelease)
console.log('  Build:', version.build)
