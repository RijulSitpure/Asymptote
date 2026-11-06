import unittest
from solution import isThreeFibonacciSum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 1 + 1 + 1 = 3
        self.assertTrue(isThreeFibonacciSum(3))
        # 1 + 2 + 5 = 8 (or 2 + 3 + 3 = 8)
        self.assertTrue(isThreeFibonacciSum(8))
        # 0 cannot be formed
        self.assertFalse(isThreeFibonacciSum(0))

if __name__ == '__main__':
    unittest.main()
