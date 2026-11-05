import unittest
from solution import countSubarrays

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countSubarrays([1, 3, 2], 2), 6) # all subarrays valid
        self.assertEqual(countSubarrays([1, 10, 2], 2), 3) # [1], [10], [2]

if __name__ == '__main__':
    unittest.main()
