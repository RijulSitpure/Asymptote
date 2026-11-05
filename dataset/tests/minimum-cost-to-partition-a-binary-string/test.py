import unittest
from solution import minCostPartition

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minCostPartition("0101", 2), 0) # "01" (diff 0) + "01" (diff 0) = 0
        self.assertEqual(minCostPartition("111", 2), 3)

if __name__ == '__main__':
    unittest.main()
