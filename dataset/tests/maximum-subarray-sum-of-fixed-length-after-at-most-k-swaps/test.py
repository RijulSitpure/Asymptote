import unittest
from solution import maxSubarraySum

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(maxSubarraySum([1, -1, 0, 2], 2, 1), 3)
        self.assertEqual(maxSubarraySum([4, 3, 2, 4], 4, 2), 13)
        self.assertEqual(maxSubarraySum([-1, -2], 1, 0), -1)

if __name__ == '__main__':
    unittest.main()
