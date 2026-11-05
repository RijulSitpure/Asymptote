import unittest
from solution import countNonAdjacentSubsets

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 3 nodes: 0 -> 1, 0 -> 2. nums = [2, 4, 6], k = 2.
        # Valid non-adjacent subsets: {0}, {1}, {2}, {1, 2}.
        # All have even sums: {2}, {4}, {6}, {10}. All 4 valid!
        self.assertEqual(countNonAdjacentSubsets([-1, 0, 0], [2, 4, 6], 2), 4)

if __name__ == '__main__':
    unittest.main()
