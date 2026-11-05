import unittest
from solution import constructUniquePathGrid

class TestSolution(unittest.TestCase):
    def test_basic(self):
        g = constructUniquePathGrid(2, 2)
        self.assertEqual(g, [[0, 0], [1, 0]])
        g3 = constructUniquePathGrid(3, 3)
        self.assertEqual(g3[0], [0, 0, 0])
        self.assertEqual(g3[1], [1, 1, 0])
        self.assertEqual(g3[2], [1, 1, 0])

if __name__ == '__main__':
    unittest.main()
