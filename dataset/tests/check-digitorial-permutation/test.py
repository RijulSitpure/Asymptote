import unittest
from solution import isDigitorialPermutation

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(isDigitorialPermutation(145)) # 1! + 4! + 5! = 145
        self.assertTrue(isDigitorialPermutation(541)) # anagram of 145
        self.assertFalse(isDigitorialPermutation(123))

if __name__ == '__main__':
    unittest.main()
