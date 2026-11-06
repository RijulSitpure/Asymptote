import unittest
from solution import minIntervalsToCover

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # clips = [[0, 2], [4, 6], [8, 10], [1, 9], [1, 5], [5, 9]], target: 0 to 10
        # Pick [0, 2], then [1, 9], then [8, 10] -> 3 clips
        self.assertEqual(minIntervalsToCover([[0, 2], [4, 6], [8, 10], [1, 9], [1, 5], [5, 9]], 0, 10), 3)
        self.assertEqual(minIntervalsToCover([[0, 1], [6, 8]], 0, 5), -1)

if __name__ == '__main__':
    unittest.main()
