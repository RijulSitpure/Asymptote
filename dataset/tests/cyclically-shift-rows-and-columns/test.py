import unittest
from solution import shiftGrid

class TestSolution(unittest.TestCase):
    def test_basic(self):
        grid = [
            [1, 2],
            [3, 4]
        ]
        # shift row 0 by 1 -> [2, 1], row 1 by 0 -> [3, 4]
        # shift col 0 by 1 -> col 0 gets [3, 2], col 1 gets [4, 1]
        res = shiftGrid(grid, [1, 0], [1, 0])
        self.assertEqual(res, [[3, 1], [2, 4]])

if __name__ == '__main__':
    unittest.main()
