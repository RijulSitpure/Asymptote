import unittest
from solution import maxSumOfMSubarraysVariable

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxSumOfMSubarraysVariable([1, 2, 3, 4], 2, 1), 10)
        self.assertEqual(maxSumOfMSubarraysVariable([-1, 5, 2, -2, 6], 2, 2), 11) # [5, 2] = 7 and [-2, 6] = 4 -> wait: [5, 2] and [6] (len 1 not allowed if min_len=2) -> [-2, 6] = 4, 7+4=11

if __name__ == '__main__':
    unittest.main()
