import unittest
from solution import distinctGatePathsToLCA

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 0 - 1, 0 - 2
        edges = [[0, 1], [0, 2]]
        self.assertEqual(distinctGatePathsToLCA(3, edges, 1, 2), 2) # 1->0->2: 1 + 1 = 2
        self.assertEqual(distinctGatePathsToLCA(3, edges, 1, 0), 1)

if __name__ == '__main__':
    unittest.main()
