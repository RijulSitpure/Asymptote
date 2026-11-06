import unittest
from solution import countEvenlyGoodIntegers

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 2-digit numbers: 1 even, 1 odd. Total: 10 to 99 has 50 with 1 even & 1 odd.
        # Below 20: 10, 12, 14, 16, 18 (5)
        self.assertEqual(countEvenlyGoodIntegers(20), 5)
        self.assertEqual(countEvenlyGoodIntegers(9), 0)

if __name__ == '__main__':
    unittest.main()
