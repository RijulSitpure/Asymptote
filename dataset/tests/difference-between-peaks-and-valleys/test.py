import unittest
from solution import peakValleyDifference

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(peakValleyDifference([1, 5, 2, 4, 1, 3, 0]), 9)
        self.assertEqual(peakValleyDifference([-5, -6, -1, -2, 5, 3, 2]), 12)
        self.assertEqual(peakValleyDifference([6, 5, 2, 5, 5, 3, 6]), -5)

if __name__ == '__main__':
    unittest.main()
