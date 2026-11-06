import unittest
from solution import minOpsRotatedPalindromeOptimal

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOpsRotatedPalindromeOptimal("aab"), 0)
        self.assertEqual(minOpsRotatedPalindromeOptimal("abcd"), 2)

if __name__ == '__main__':
    unittest.main()
