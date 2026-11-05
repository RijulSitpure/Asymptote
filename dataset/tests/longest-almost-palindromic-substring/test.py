import unittest
from solution import longestAlmostPalindrome

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(longestAlmostPalindrome("abacaba"), 7)
        self.assertEqual(longestAlmostPalindrome("abccbx"), 6) # abccba with 1 change
        self.assertEqual(longestAlmostPalindrome("abcdef"), 3) # e.g. "abc" -> change 'a' to 'c' => "cbc" (len 3)

if __name__ == '__main__':
    unittest.main()
