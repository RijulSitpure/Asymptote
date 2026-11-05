import unittest
from solution import findVertexDegrees

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(findVertexDegrees(3, [[0, 1], [1, 2]]), [1, 2, 1])
        self.assertEqual(findVertexDegrees(4, [[0, 1], [0, 2], [0, 3]]), [3, 1, 1, 1])

if __name__ == '__main__':
    unittest.main()
