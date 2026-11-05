import unittest
from solution import sortVowelsByFrequency

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 'leetcode': vowels are 'e', 'e', 'o', 'e'. 'e': 3, 'o': 1.
        self.assertEqual(sortVowelsByFrequency("leetcode"), "leetcedo")

if __name__ == '__main__':
    unittest.main()
