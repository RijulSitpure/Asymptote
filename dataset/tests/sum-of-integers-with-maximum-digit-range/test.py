import unittest
from solution import sumWithMaxDigitRange

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 19 has spread 9 - 1 = 8; 28 has spread 8 - 2 = 6; 91 has spread 8 -> 19 + 91 = 110
        self.assertEqual(sumWithMaxDigitRange([19, 28, 91]), 110)
        self.assertEqual(sumWithMaxDigitRange([11, 22]), 33) # spreads are 0

if __name__ == '__main__':
    unittest.main()
