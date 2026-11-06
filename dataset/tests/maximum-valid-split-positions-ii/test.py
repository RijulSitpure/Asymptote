import unittest
from solution import waysToPartition

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(waysToPartition([2, -1, 2], 3), 1)
        self.assertEqual(waysToPartition([0, 0, 0], 1), 2)
        self.assertEqual(waysToPartition([22, 4, -25, -20, -15, 15, -16, 7, 19, -10, 0, -13, -14], -33), 4)

if __name__ == '__main__':
    unittest.main()
