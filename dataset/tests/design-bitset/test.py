from solution import Bitset

b = Bitset(5)
b.fix(3)
b.fix(1)
b.flip()
assert b.all() == False
b.unfix(0)
b.flip()
assert b.one() == True
b.unfix(0)
assert b.count() == 2
assert b.toString() == "01010"
print("All tests passed for design-bitset!")
