import unittest
from solution import maxEqualAdjacentPairs

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 2, 1]: replace index 1 (2) with 1 -> [1, 1, 1] has 2 pairs
        self.assertEqual(maxEqualAdjacentPairs([1, 2, 1]), 2)
        # [1, 2, 3]: replace any element with adjacent -> 1 pair
        self.assertEqual(maxEqualAdjacentPairs([1, 2, 3]), 1)
        # [1, 1, 1]: already 2 pairs
        self.assertEqual(maxEqualAdjacentPairs([1, 1, 1]), 2)

if __name__ == '__main__':
    unittest.main()
