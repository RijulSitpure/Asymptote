import unittest
from solution import maxSubarraySumMultiplier

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, -2, 3], multiplier = -1: 1 + (-2)*(-1) + 3 = 1 + 2 + 3 = 6
        self.assertEqual(maxSubarraySumMultiplier([1, -2, 3], -1), 6)
        self.assertEqual(maxSubarraySumMultiplier([2, 3], 2), 10) # (2+3)*2 = 10

if __name__ == '__main__':
    unittest.main()
