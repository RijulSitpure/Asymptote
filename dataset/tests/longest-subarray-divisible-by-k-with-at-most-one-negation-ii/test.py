import unittest
from solution import longestSubarrayDivKWithOneNegationII

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(longestSubarrayDivKWithOneNegationII([4, 5, 0, -2, -3, 1], 5), 6)
        self.assertEqual(longestSubarrayDivKWithOneNegationII([1, 2], 5), 0)

if __name__ == '__main__':
    unittest.main()
