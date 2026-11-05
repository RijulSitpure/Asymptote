import unittest
from solution import maxValidPairSum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxValidPairSum([34, 23, 1, 24, 75, 33, 54, 8], 60), 58) # 34 + 24 = 58
        self.assertEqual(maxValidPairSum([10, 20, 30], 15), -1)

if __name__ == '__main__':
    unittest.main()
