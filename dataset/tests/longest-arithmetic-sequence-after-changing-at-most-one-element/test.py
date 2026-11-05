import unittest
from solution import longestArithmeticSubarray

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(longestArithmeticSubarray([1, 2, 9, 4, 5]), 5) # change 9 to 3 -> [1, 2, 3, 4, 5]
        self.assertEqual(longestArithmeticSubarray([1, 3, 5, 7]), 4)

if __name__ == '__main__':
    unittest.main()
