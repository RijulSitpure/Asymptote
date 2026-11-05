import unittest
from solution import countDigitAppearances

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countDigitAppearances(13, 1), 6) # 1, 10, 11 (two 1s), 12, 13 -> 6 ones
        self.assertEqual(countDigitAppearances(0, 1), 0)

if __name__ == '__main__':
    unittest.main()
