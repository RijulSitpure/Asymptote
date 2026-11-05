import unittest
from solution import validDigitNumber

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(validDigitNumber(101, 0))
        self.assertFalse(validDigitNumber(232, 2))
        self.assertFalse(validDigitNumber(5, 1))

if __name__ == '__main__':
    unittest.main()
