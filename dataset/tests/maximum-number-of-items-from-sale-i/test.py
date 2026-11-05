import unittest
from solution import maxSaleItemsI

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # items: [factor, price]. [[2, 10], [4, 5], [6, 5]], budget = 10.
        # buy item 0 (factor 2, price 10): unlocks item 1 (factor 4 % 2 == 0) and item 2 (factor 6 % 2 == 0).
        # total items: 3. Rem budget: 0 -> total 3 items!
        self.assertEqual(maxSaleItemsI([[2, 10], [4, 5], [6, 5]], 10), 3)

if __name__ == '__main__':
    unittest.main()
