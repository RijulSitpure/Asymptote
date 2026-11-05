import unittest
from solution import maxScore

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxScore([1, 2], [3, 4], 1), 8)
        self.assertEqual(maxScore([2, 3], [1, 4], 2), 14)

if __name__ == '__main__':
    unittest.main()
