import unittest
from solution import maxValidSplits

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxValidSplits([1, 1]), 1)
        self.assertEqual(maxValidSplits([2, 3, 1, 0]), 0) # total 6, pref: 2, 5, 6 -> 0
        self.assertEqual(maxValidSplits([0, 0, 0]), 2)

if __name__ == '__main__':
    unittest.main()
