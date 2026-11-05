from solution import NeighborSum
ns = NeighborSum([[0, 1, 2], [3, 4, 5], [6, 7, 8]])
assert ns.adjacentSum(1) == 6
assert ns.adjacentSum(4) == 16
assert ns.diagonalSum(4) == 16
assert ns.diagonalSum(8) == 4
print("All tests passed successfully.")
