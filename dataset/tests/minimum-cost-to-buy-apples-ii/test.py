import unittest
from solution import minCostToBuyApples

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 2 shops: shop 0 price 10, shop 1 price 1. Road (0, 1) cost 1, tax 2.
        # From 0: buy at 0 -> 10. Buy at 1: empty cost 1, price 1, return cost 1*2=2 -> total 4!
        # From 1: buy at 1 -> 1.
        res = minCostToBuyApples(2, [10, 1], [[0, 1, 1, 2]])
        self.assertEqual(res, [4, 1])

if __name__ == '__main__':
    unittest.main()
