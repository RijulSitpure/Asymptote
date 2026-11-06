import unittest
from solution import largestPowerArray

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(largestPowerArray([1, 5, 3, 9, 8], 2), [5, 3, 1, 9, 8])
        self.assertEqual(largestPowerArray([1, 7, 6, 18, 2, 1], 3), [2, 7, 6, 18, 1, 1])

if __name__ == '__main__':
    unittest.main()
