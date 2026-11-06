import unittest
from solution import minimumTotalPrice

class TestSolution(unittest.TestCase):
    def test_basic(self):
        edges = [[0, 1], [1, 2], [1, 3]]
        price = [2, 4, 6, 8]
        trips = [[0, 3], [2, 1]]
        self.assertEqual(minimumTotalPrice(4, edges, price, trips), 16)

if __name__ == '__main__':
    unittest.main()
