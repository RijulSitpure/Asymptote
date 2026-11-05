import unittest
from solution import multiSourceFloodFill

class TestSolution(unittest.TestCase):
    def test_basic(self):
        res = multiSourceFloodFill(3, 3, [[0, 0, 1], [2, 2, 2]])
        self.assertEqual(res[0][0], 1)
        self.assertEqual(res[2][2], 2)
        # Collision at (1, 1): dist is 2 from both, color 2 wins
        self.assertEqual(res[1][1], 2)

if __name__ == '__main__':
    unittest.main()
