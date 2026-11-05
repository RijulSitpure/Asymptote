import unittest
from solution import longestAlternatingSubarray

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(longestAlternatingSubarray([1, 2, 3, 4]), 4)
        self.assertEqual(longestAlternatingSubarray([1, 2, 2, 3]), 3)
        self.assertEqual(longestAlternatingSubarray([2, 4, 6]), 1)

if __name__ == '__main__':
    unittest.main()
