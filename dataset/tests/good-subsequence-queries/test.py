import unittest
from solution import goodSubsequenceQueries

class TestSolution(unittest.TestCase):
    def test_basic(self):
        nums = [1, 5, 2, 8, 3]
        queries = [[0, 4, 3], [1, 3, 5]]
        # q0: elements >= 3 in [0, 4]: 5, 8, 3 -> sum 16
        # q1: elements >= 5 in [1, 3]: 5, 8 -> sum 13
        self.assertEqual(goodSubsequenceQueries(nums, queries), [16, 13])

if __name__ == '__main__':
    unittest.main()
