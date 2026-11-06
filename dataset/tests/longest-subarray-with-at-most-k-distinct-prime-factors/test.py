import unittest
from solution import longestSubarrayAtMostKPrimes

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [2, 4, 3, 9, 5], k = 2:
        # [2, 4, 3, 9] has prime factors {2, 3} (size 2 <= 2) -> length 4
        self.assertEqual(longestSubarrayAtMostKPrimes([2, 4, 3, 9, 5], 2), 4)
        self.assertEqual(longestSubarrayAtMostKPrimes([2, 3, 5], 1), 1)

if __name__ == '__main__':
    unittest.main()
