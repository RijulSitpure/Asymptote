import unittest
from solution import maxPathIntersectionSum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        grid = [
            [1, 2],
            [3, 4],
            [5, 6]
        ]
        # row 0 sum: 3. row 2 sum: 11. row 1 max subarray: 7. Max is 11.
        self.assertEqual(maxPathIntersectionSum(grid), 11)

if __name__ == '__main__':
    unittest.main()
