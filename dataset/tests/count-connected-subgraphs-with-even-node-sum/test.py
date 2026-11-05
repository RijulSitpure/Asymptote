import unittest
from solution import countConnectedSubgraphs

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 3 nodes in triangle: [0, 0, 0] -> all 7 connected subgraphs have even sum
        res = countConnectedSubgraphs([0, 0, 0], [[0, 1], [1, 2], [0, 2]])
        self.assertEqual(res, 7)

if __name__ == '__main__':
    unittest.main()
