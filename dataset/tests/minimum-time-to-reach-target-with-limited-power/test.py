import unittest
from solution import minTimeToReachTarget

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 0 -> 1: time 5, power 2
        edges = [[0, 1, 5, 2]]
        self.assertEqual(minTimeToReachTarget(2, edges, 2), 5)
        self.assertEqual(minTimeToReachTarget(2, edges, 1), -1)

if __name__ == '__main__':
    unittest.main()
