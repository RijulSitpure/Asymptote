import unittest
from solution import maxProductPairWithSum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # target = 10, pairs: (2, 8) -> 16; (5, 5) -> 25
        self.assertEqual(maxProductPairWithSum([2, 5, 8, 5], 10), 25)
        self.assertEqual(maxProductPairWithSum([1, 2, 3], 10), -1)

if __name__ == '__main__':
    unittest.main()
