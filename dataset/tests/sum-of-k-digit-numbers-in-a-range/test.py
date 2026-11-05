import unittest
from solution import sumKDigitNumbers

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(sumKDigitNumbers(5, 12, 1), 5 + 6 + 7 + 8 + 9) # 35
        self.assertEqual(sumKDigitNumbers(5, 12, 2), 10 + 11 + 12) # 33
        self.assertEqual(sumKDigitNumbers(1, 9, 2), 0)

if __name__ == '__main__':
    unittest.main()
