import unittest
from solution import longestSubarrayDivKWithOneNegation

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [4, 5, 0, -2, -3, 1], k = 5
        self.assertEqual(longestSubarrayDivKWithOneNegation([4, 5, 0, -2, -3, 1], 5), 6)
        self.assertEqual(longestSubarrayDivKWithOneNegation([1, 2], 5), 0)

if __name__ == '__main__':
    unittest.main()
