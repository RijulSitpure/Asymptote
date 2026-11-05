import unittest
from solution import trimTrailingVowels

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(trimTrailingVowels("banana"), "banan")
        self.assertEqual(trimTrailingVowels("helloooo"), "hell")
        self.assertEqual(trimTrailingVowels("aeiou"), "")

if __name__ == '__main__':
    unittest.main()
