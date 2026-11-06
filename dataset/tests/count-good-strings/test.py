import unittest
from solution import countGoodStrings

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countGoodStrings(3, 3, 1, 1), 8)
        self.assertEqual(countGoodStrings(2, 3, 1, 2), 5)

if __name__ == '__main__':
    unittest.main()
