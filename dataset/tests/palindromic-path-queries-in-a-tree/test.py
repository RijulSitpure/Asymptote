import unittest
from solution import canMakePalindromeQueries

class TestSolution(unittest.TestCase):
    def test_basic(self):
        n = 3
        edges = [[0, 1], [1, 2]]
        s = "aba"
        queries = [[0, 2], [0, 1]]
        self.assertEqual(canMakePalindromeQueries(n, edges, s, queries), [True, False])

if __name__ == '__main__':
    unittest.main()
