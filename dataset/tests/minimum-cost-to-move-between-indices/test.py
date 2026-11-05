import unittest
from solution import minCostToMove

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # nums = [1, 2, 10, 11]
        # closest(0) = 1 (cost 1). closest(1) = 0 (diff 1 vs 8).
        # moving 0 -> 1: cost 1
        res = minCostToMove([1, 2, 10, 11], [[0, 1], [0, 3], [1, 0]])
        self.assertEqual(res[0], 1)
        self.assertEqual(res[2], 1)

if __name__ == '__main__':
    unittest.main()
