import unittest
from solution import longestResilientSubarray

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 5, 2, 3, 4], k = 1: drop at 5->2. Subarray [1, 5, 2, 3, 4] has 1 drop -> len 5
        self.assertEqual(longestResilientSubarray([1, 5, 2, 3, 4], 1), 5)
        self.assertEqual(longestResilientSubarray([5, 4, 3, 2, 1], 0), 1)

if __name__ == '__main__':
    unittest.main()
