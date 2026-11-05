import unittest
from solution import Solution

class TestSolution(unittest.TestCase):
    def test_basic(self):
        s = Solution()
        self.assertEqual(s.maxXorSubarray([1, 2, 3], 2), 2) # [1, 2] -> 3 > 2; [2] -> 2; [3] -> 3
        self.assertEqual(s.maxXorSubarray([5, 2, 4, 6], 7), 7) # [5, 2] = 7

if __name__ == '__main__':
    unittest.main()
