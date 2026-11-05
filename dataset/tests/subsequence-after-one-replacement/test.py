import unittest
from solution import longestSubsequenceAfterOneReplacement

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 2, 5, 3, 5]: replace 3 with 6 -> [1, 2, 5, 6] len 4; or replace 5 (index 2) with 3? nums[1]=2, nums[3]=3, diff is 1 < 2
        # If replace 3 with 6 -> [1, 2, 5, 6] (len 4)
        self.assertEqual(longestSubsequenceAfterOneReplacement([1, 2, 5, 3, 5]), 4)
        self.assertEqual(longestSubsequenceAfterOneReplacement([1, 2, 3]), 3)

if __name__ == '__main__':
    unittest.main()
