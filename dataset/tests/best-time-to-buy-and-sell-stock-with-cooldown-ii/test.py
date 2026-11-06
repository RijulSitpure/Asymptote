import unittest
from solution import maxProfitWithCooldown

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxProfitWithCooldown([1, 2, 3, 0, 2], 1), 3) # buy 1, sell 2 (profit 1); cd 1 day; buy 0, sell 2 (profit 2) -> total 3
        self.assertEqual(maxProfitWithCooldown([1], 1), 0)

if __name__ == '__main__':
    unittest.main()
