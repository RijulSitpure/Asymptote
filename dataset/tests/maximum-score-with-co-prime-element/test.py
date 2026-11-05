import unittest
from solution import maxScoreWithCoPrimeElement

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxScoreWithCoPrimeElement([2, 3, 5, 7], 6), 12) # 5 + 7
        self.assertEqual(maxScoreWithCoPrimeElement([2, 4, 6], 2), 0)
        self.assertEqual(maxScoreWithCoPrimeElement([-3, -5], 2), -3)

if __name__ == '__main__':
    unittest.main()
