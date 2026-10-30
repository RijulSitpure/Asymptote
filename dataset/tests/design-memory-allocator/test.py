from solution import Allocator
loc = Allocator(10)
assert loc.allocate(1, 1) == 0
assert loc.allocate(1, 2) == 1
assert loc.allocate(1, 3) == 2
assert loc.freeMemory(2) == 1
assert loc.allocate(3, 4) == 3
assert loc.allocate(1, 1) == 1
assert loc.allocate(1, 1) == 6
assert loc.freeMemory(1) == 3
assert loc.allocate(10, 2) == -1
assert loc.freeMemory(7) == 0
print('All tests passed for design-memory-allocator!')
