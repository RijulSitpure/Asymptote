import unittest
from solution import minCostAlternatingPath

class TestSolution(unittest.TestCase):
    def test_basic(self):
        res = minCostAlternatingPath(3, [[0, 1], [1, 2]], [])
        self.assertEqual(res, [0, 1, -1]) # 0->1 red, 1->2 has no blue edge -> unreachable

if __name__ == '__main__':
    unittest.main()
