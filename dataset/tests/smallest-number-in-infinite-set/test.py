from solution import SmallestInfiniteSet
obj = SmallestInfiniteSet()
obj.addBack(2)
assert obj.popSmallest() == 1
assert obj.popSmallest() == 2
assert obj.popSmallest() == 3
obj.addBack(1)
assert obj.popSmallest() == 1
assert obj.popSmallest() == 4
assert obj.popSmallest() == 5
print("All tests passed for smallest-number-in-infinite-set!")
