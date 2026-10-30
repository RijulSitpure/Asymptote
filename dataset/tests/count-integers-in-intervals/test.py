from solution import CountIntervals
c = CountIntervals()
c.add(2, 3)
c.add(7, 10)
assert c.count() == 6
c.add(5, 8)
assert c.count() == 8
print("All tests passed for count-integers-in-intervals!")
