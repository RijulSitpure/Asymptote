import unittest
from solution import maxSubarraySumAfterSwaps

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, -2, 3], k = 1: subarray [1, -2, 3] sum 2; swap -2 with empty -> inside [3] sum 3; subarray [1, -2] swap -2 with 3 -> [1, 3] sum 4
        self.assertEqual(maxSubarraySumAfterSwaps([1, -2, 3], 1), 4)
        self.assertEqual(maxSubarraySumAfterSwaps([-1, -2, -3], 1), -1)

if __name__ == '__main__':
    unittest.main()
