import unittest
from solution import countSubarraysWithMatchingSumDigits

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 2, 3]: [1] (sum 1, digits 1), [2] (sum 2, digits 2), [3] (sum 3, digits 3),
        # [1, 2] (sum 3, digits 3), [2, 3] (sum 5, digits 5), [1, 2, 3] (sum 6, digits 6)
        # target_digit_sum = 3 -> [3] and [1, 2] -> 2
        self.assertEqual(countSubarraysWithMatchingSumDigits([1, 2, 3], 3), 2)
        self.assertEqual(countSubarraysWithMatchingSumDigits([5, 5], 1), 1) # [5, 5] sum 10, digit sum 1

if __name__ == '__main__':
    unittest.main()
