import unittest
from solution import firstMatchingChar

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(firstMatchingChar("abacaba"), 0) # 'a' == 'a'
        self.assertEqual(firstMatchingChar("abcba"), 0)
        self.assertEqual(firstMatchingChar("abcde"), 2) # 'c' == 'c' (center of odd string)

if __name__ == '__main__':
    unittest.main()
