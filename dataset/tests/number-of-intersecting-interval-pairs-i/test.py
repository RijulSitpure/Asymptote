import unittest
from solution import countIntersectingIntervalPairs

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 4], [2, 5], [6, 8]: [1,4] & [2,5] intersect. [6, 8] is disjoint with both. Total = 1
        self.assertEqual(countIntersectingIntervalPairs([[1, 4], [2, 5], [6, 8]]), 1)
        self.assertEqual(countIntersectingIntervalPairs([[1, 2], [3, 4]]), 0)

if __name__ == '__main__':
    unittest.main()
