import unittest
from solution import maxPairStrengthGCD

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [2, 4, 6]: pairs (2, 4)->2*6=12; (2, 6)->2*8=16; (4, 6)->2*10=20
        self.assertEqual(maxPairStrengthGCD([2, 4, 6]), 20)
        self.assertEqual(maxPairStrengthGCD([3, 5]), 8) # gcd(3,5)=1 * 8 = 8

if __name__ == '__main__':
    unittest.main()
