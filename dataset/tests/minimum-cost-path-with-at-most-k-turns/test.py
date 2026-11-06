import unittest
from solution import minCostPathWithKTurns

class TestSolution(unittest.TestCase):
    def test_basic(self):
        grid = [
            [1, 3, 1],
            [1, 5, 1],
            [4, 2, 1]
        ]
        # (0,0)->(0,1)->(0,2)->(1,2)->(2,2): cost 1+3+1+1+1 = 7, turns = 1 (right then down)
        self.assertEqual(minCostPathWithKTurns(grid, 1), 7)
        self.assertEqual(minCostPathWithKTurns([[5]], 0), 5)

if __name__ == '__main__':
    unittest.main()
