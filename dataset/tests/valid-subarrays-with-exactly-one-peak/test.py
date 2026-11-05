import unittest
from solution import countSinglePeakSubarrays

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countSinglePeakSubarrays([1, 3, 2]), 2 * 2) # [1, 3, 2] has peak at 1. left: [0, 1] (2), right: [1, 2] (2) => 4
        self.assertEqual(countSinglePeakSubarrays([1, 2, 3]), 0)

if __name__ == '__main__':
    unittest.main()
