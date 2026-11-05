import unittest
from solution import filterOccupiedIntervals

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(filterOccupiedIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]), [[1, 6], [8, 10], [15, 18]])
        self.assertEqual(filterOccupiedIntervals([[1, 4], [4, 5]]), [[1, 5]])

if __name__ == '__main__':
    unittest.main()
