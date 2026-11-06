import unittest
from solution import uniquePathsWithObstaclesCount

class TestSolution(unittest.TestCase):
    def test_basic(self):
        g = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
        self.assertEqual(uniquePathsWithObstaclesCount(g), 2)
        g2 = [[0, 0], [0, 0]]
        self.assertEqual(uniquePathsWithObstaclesCount(g2), 2)

if __name__ == '__main__':
    unittest.main()
