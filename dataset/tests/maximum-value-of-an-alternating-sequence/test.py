import unittest
from solution import maxAlternatingSum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxAlternatingSum([4, 2, 5, 3]), 7) # 4 - 2 + 5 = 7
        self.assertEqual(maxAlternatingSum([5, 6, 7, 8]), 8)

if __name__ == '__main__':
    unittest.main()
