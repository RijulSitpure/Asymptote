import unittest
from solution import kthSmallestEven

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # nums = [2, 4, 6], evens are 2, 4, 6. If removed in [0, 2], remaining evens start at 8, 10, ...
        # k=1 -> 8, k=2 -> 10
        self.assertEqual(kthSmallestEven([2, 4, 6], [[0, 2, 1], [0, 2, 2]]), [8, 10])
        self.assertEqual(kthSmallestEven([1, 3, 5], [[0, 2, 1]]), [2])

if __name__ == '__main__':
    unittest.main()
