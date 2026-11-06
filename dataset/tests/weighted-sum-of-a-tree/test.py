import unittest
from solution import weightedSumOfTree

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 1 at depth 1, 2 and 3 at depth 2 -> 1*1 + 2*2 + 3*2 = 1 + 4 + 6 = 11
        self.assertEqual(weightedSumOfTree([1, 2, 3]), 11)
        self.assertEqual(weightedSumOfTree([5]), 5)

if __name__ == '__main__':
    unittest.main()
