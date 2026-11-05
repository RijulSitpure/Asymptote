import unittest
from solution import maxSumOfMSubarrays

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxSumOfMSubarrays([1, 2, 1, 2, 6, 7, 5, 1], 2, 2), 20) # [2, 6] (8) + [7, 5] (12) = 20
        self.assertEqual(maxSumOfMSubarrays([1, 2, 3], 1, 2), 5) # [2, 3] = 5

if __name__ == '__main__':
    unittest.main()
