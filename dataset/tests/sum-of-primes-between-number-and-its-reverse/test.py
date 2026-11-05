import unittest
from solution import sumOfPrimes

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # n = 12, rev = 21 -> range [12, 21]. Primes: 13, 17, 19 -> sum = 49
        self.assertEqual(sumOfPrimes(12), 49)

if __name__ == '__main__':
    unittest.main()
