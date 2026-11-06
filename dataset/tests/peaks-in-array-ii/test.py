import unittest
from solution import countPeaks

class TestSolution(unittest.TestCase):
    def test_basic(self):
        nums = [3, 1, 4, 2, 5]
        # index 2 (value 4) is peak (1 < 4 > 2)
        queries = [[1, 0, 4], [2, 1, 6], [1, 0, 4]]
        # query 1: range [0, 4] peak at 2 -> 1
        # update: nums[1] = 6 -> [3, 6, 4, 2, 5]: index 1 is peak (3 < 6 > 4), index 2 is not peak (6 > 4 > 2)
        # query 2: range [0, 4] peak at 1 -> 1
        self.assertEqual(countPeaks(nums, queries), [1, 1])

if __name__ == '__main__':
    unittest.main()
