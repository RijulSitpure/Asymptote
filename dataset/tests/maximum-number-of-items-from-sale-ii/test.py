import unittest
from solution import maxSaleItemsII

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxSaleItemsII([[2, 10], [4, 5], [6, 5]], 10), 3)

if __name__ == '__main__':
    unittest.main()
