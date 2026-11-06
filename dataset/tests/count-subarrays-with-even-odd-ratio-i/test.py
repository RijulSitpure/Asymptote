import unittest
from solution import countEqualEvenOddSubarrays

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countEqualEvenOddSubarrays([1, 2, 3, 4]), 4) # [1, 2], [2, 3], [3, 4], [1, 2, 3, 4]
        self.assertEqual(countEqualEvenOddSubarrays([1, 3, 5]), 0)

if __name__ == '__main__':
    unittest.main()
