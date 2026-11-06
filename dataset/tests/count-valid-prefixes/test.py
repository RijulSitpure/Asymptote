import unittest
from solution import countValidPrefixes

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # "apple":
        # 'a': v=1, c=0 (valid)
        # 'ap': v=1, c=1 (not valid)
        # 'app': v=1, c=2 (not)
        # 'appl': v=1, c=3 (not)
        # 'apple': v=2, c=3 (not) -> 1
        self.assertEqual(countValidPrefixes("apple"), 1)
        self.assertEqual(countValidPrefixes("aeiou"), 5)

if __name__ == '__main__':
    unittest.main()
