import unittest
from solution import minThresholdPath

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 3 nodes: 0 - 1 (wt 10), 1 - 2 (wt 5), k = 1.
        # If threshold is 5, edge (0, 1) has wt 10 > 5 (1 heavy edge <= k).
        self.assertEqual(minThresholdPath(3, [[0, 1, 10], [1, 2, 5]], 0, 2, 1), 5)
        # Disconnected
        self.assertEqual(minThresholdPath(3, [[0, 1, 10]], 0, 2, 1), -1)

if __name__ == '__main__':
    unittest.main()
