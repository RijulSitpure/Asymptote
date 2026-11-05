import unittest
from solution import longestBalancedSubstring

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(longestBalancedSubstring("0101"), 4)
        self.assertEqual(longestBalancedSubstring("0010"), 2)

if __name__ == '__main__':
    unittest.main()
