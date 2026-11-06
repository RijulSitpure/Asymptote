import unittest
from solution import minOperationsToPalindromic

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperationsToPalindromic([12, 101, 23]), 2) # 12 -> 11 (1 op), 101 -> 101 (0), 23 -> 22 (1 op). Total = 2
        self.assertEqual(minOperationsToPalindromic([7, 8, 9]), 0) # all single-digits are already palindromic

if __name__ == '__main__':
    unittest.main()
