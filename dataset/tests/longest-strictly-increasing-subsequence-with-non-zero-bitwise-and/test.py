import unittest
from solution import longestSubsequence

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(longestSubsequence([1, 2, 3, 4, 5]), 3)
        self.assertEqual(longestSubsequence([3, 5, 6, 7]), 3)
        self.assertEqual(longestSubsequence([2, 4, 8]), 1)

if __name__ == '__main__':
    unittest.main()
