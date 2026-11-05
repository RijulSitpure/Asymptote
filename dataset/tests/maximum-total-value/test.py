import unittest
from solution import maximumTotalValue

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maximumTotalValue([4, 1, 7, 2], 2), 11) # 7 + 4 = 11
        self.assertEqual(maximumTotalValue([5], 1), 5)

if __name__ == '__main__':
    unittest.main()
