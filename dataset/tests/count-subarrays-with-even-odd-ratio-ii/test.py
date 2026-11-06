import unittest
from solution import countSubarraysWithEvenOddDiff

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countSubarraysWithEvenOddDiff([2, 4, 1], 1), 3) # [2], [4], [2, 4, 1] each has diff 1
        self.assertEqual(countSubarraysWithEvenOddDiff([1, 1], 0), 0)

if __name__ == '__main__':
    unittest.main()
