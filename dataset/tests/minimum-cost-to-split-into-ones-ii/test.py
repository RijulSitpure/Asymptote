import unittest
from solution import minCostToSplit

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minCostToSplit(1), 0)
        self.assertEqual(minCostToSplit(3), 3) # 2*1 + 1*1 = 3
        self.assertEqual(minCostToSplit(4), 6)

if __name__ == '__main__':
    unittest.main()
