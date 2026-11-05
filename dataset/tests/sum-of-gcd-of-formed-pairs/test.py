import unittest
from solution import sumOfGcdPairs

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(sumOfGcdPairs([2, 4, 6, 8]), math_gcd_check := 2 + 2) # [2, 8] -> 2; [4, 6] -> 2 => 4
        self.assertEqual(sumOfGcdPairs([3, 5]), 1)

if __name__ == '__main__':
    unittest.main()
