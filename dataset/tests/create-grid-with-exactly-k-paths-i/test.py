import unittest
from solution import countGridPaths

class TestSolution(unittest.TestCase):
    def test_basic(self):
        g = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
        self.assertEqual(countGridPaths(g), 2)
        g2 = [[0, 1], [0, 0]]
        self.assertEqual(countGridPaths(g2), 1)

if __name__ == '__main__':
    unittest.main()
