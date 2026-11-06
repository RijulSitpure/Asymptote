import unittest
from solution import countBipartiteIntersectingPairs

class TestSolution(unittest.TestCase):
    def test_basic(self):
        a = [[1, 3], [5, 7]]
        b = [[2, 6]]
        # [2,6] intersects with [1,3] and [5,7]. Total pairs = 2
        self.assertEqual(countBipartiteIntersectingPairs(a, b), 2)
        self.assertEqual(countBipartiteIntersectingPairs([[1, 2]], [[3, 4]]), 0)

if __name__ == '__main__':
    unittest.main()
