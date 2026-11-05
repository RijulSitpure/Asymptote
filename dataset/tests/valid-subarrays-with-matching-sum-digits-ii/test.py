import unittest
from solution import countValidSubarraysWithMatchingDigits

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countValidSubarraysWithMatchingDigits([4, 5, 0, -2, -3, 1], 5), 7)
        self.assertEqual(countValidSubarraysWithMatchingDigits([5], 5), 1)

if __name__ == '__main__':
    unittest.main()
