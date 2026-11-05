import unittest
from solution import maxAlternatingSubsequenceSum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # nums = [1, 5, 2, 6], k = 1: alternating 1 < 5 > 2 < 6 -> sum 14
        self.assertEqual(maxAlternatingSubsequenceSum([1, 5, 2, 6], 1), 14)
        # k = 2: indices 0 (1), 2 (2) -> 1 < 2 not alternating, single element 6
        self.assertEqual(maxAlternatingSubsequenceSum([1, 5, 2, 6], 2), 11)

if __name__ == '__main__':
    unittest.main()
