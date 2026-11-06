import unittest
from solution import minOpsRotatedPalindrome

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOpsRotatedPalindrome("aab"), 0) # rotated "aba" has 0 ops
        self.assertEqual(minOpsRotatedPalindrome("abc"), 1)

if __name__ == '__main__':
    unittest.main()
