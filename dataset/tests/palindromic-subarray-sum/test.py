import unittest
from solution import countPalindromicSubarraySums

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 2, 1]: [1] (1), [2] (2), [1] (1), [1, 2] (3), [2, 1] (3), [1, 2, 1] (4)
        # All sums are single digits {1, 2, 3, 4}, which are all palindromic -> 6
        self.assertEqual(countPalindromicSubarraySums([1, 2, 1]), 6)
        self.assertEqual(countPalindromicSubarraySums([10]), 0) # 10 is not palindromic

if __name__ == '__main__':
    unittest.main()
