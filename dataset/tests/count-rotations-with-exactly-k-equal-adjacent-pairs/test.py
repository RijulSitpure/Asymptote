import unittest
from solution import countRotationsWithKAdjacentPairs

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 2, 2, 1] rotations:
        # [1, 2, 2, 1] -> 1 pair (2, 2)
        # [2, 2, 1, 1] -> 2 pairs (2,2) and (1,1)
        # [2, 1, 1, 2] -> 1 pair (1, 1)
        # [1, 1, 2, 2] -> 2 pairs (1,1) and (2,2)
        self.assertEqual(countRotationsWithKAdjacentPairs([1, 2, 2, 1], 1), 2)
        self.assertEqual(countRotationsWithKAdjacentPairs([1, 2, 2, 1], 2), 2)
        self.assertEqual(countRotationsWithKAdjacentPairs([1, 2, 3], 0), 3)

if __name__ == '__main__':
    unittest.main()
