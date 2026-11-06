import unittest
from solution import minTotalCostToProcess

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 2, 3] -> reverse sort: [3, 2, 1] -> 1*3 + 2*2 + 3*1 = 3 + 4 + 3 = 10
        self.assertEqual(minTotalCostToProcess([1, 2, 3]), 10)
        self.assertEqual(minTotalCostToProcess([5]), 5)

if __name__ == '__main__':
    unittest.main()
