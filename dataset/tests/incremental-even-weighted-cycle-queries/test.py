import unittest
from solution import evenWeightedCycleQueries

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 3 nodes: edges (0,1,1), (1,2,1), (2,0,2) -> cycle sum 1+1+2=4 (even)
        self.assertEqual(evenWeightedCycleQueries(3, [[0, 1, 1], [1, 2, 1], [2, 0, 2]]), [False, False, True])

if __name__ == '__main__':
    unittest.main()
