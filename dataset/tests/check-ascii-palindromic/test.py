import unittest
from solution import checkAsciiPalindromic

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(checkAsciiPalindromic("racecar"))
        self.assertFalse(checkAsciiPalindromic("hello"))

if __name__ == '__main__':
    unittest.main()
