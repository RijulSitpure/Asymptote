import unittest
from solution import largestIntegerWithDigitSum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(largestIntegerWithDigitSum(3, 20), "992")
        self.assertEqual(largestIntegerWithDigitSum(2, 9), "90")
        self.assertEqual(largestIntegerWithDigitSum(2, 25), "")

if __name__ == '__main__':
    unittest.main()
