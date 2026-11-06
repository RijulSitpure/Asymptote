import unittest
from solution import findTreeRoot

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 3 nodes: 0 -> 1, 0 -> 2. Root is 0
        self.assertEqual(findTreeRoot(3, [[0, 1], [0, 2]], [1, 2, 1]), 0)
        # 4 nodes: 2 -> 0, 2 -> 1, 1 -> 3. Root is 2
        self.assertEqual(findTreeRoot(4, [[2, 0], [2, 1], [1, 3]], [0, 0, 0, 0]), 2)

if __name__ == '__main__':
    unittest.main()
