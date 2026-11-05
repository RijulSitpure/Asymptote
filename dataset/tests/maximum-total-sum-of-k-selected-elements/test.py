import unittest
from solution import maxTotalSumKSelected

class TestSolution(unittest.TestCase):
    def test_basic(self):
        g = [[1, 2], [3, 4], [5, 1]]
        self.assertEqual(maxTotalSumKSelected(g, 2), 9) # maxes: 2, 4, 5 -> top 2: 5 + 4 = 9
        self.assertEqual(maxTotalSumKSelected(g, 1), 5)

if __name__ == '__main__':
    unittest.main()
