from solution import NumberContainers
nc = NumberContainers()
assert nc.find(10) == -1
nc.change(2, 10)
nc.change(1, 10)
nc.change(3, 10)
nc.change(5, 10)
assert nc.find(10) == 1
nc.change(1, 20)
assert nc.find(10) == 2
print("All tests passed for design-a-number-container-system!")
