import unittest
from solution import longestSubarrayRestrictedPairSums

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # nums = [1, 4, 3, 2, 5], forbidden = 5:
        # [1, 4] sums to 5 (cut). [4, 3]=7, [3, 2]=5 (cut). [2, 5]=7. Longest = 2
        self.assertEqual(longestSubarrayRestrictedPairSums([1, 4, 3, 2, 5], 5), 2)
        self.assertEqual(longestSubarrayRestrictedPairSums([1, 2, 3], 10), 3)

if __name__ == '__main__':
    unittest.main()
