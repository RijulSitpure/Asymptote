import unittest
from solution import numberOfPairs

class TestSolution(unittest.TestCase):
    def test_basic(self):
        res = numberOfPairs([1, 2], [3, 4], [[2, 5], [1, 0, 0, 2], [2, 5]])
        self.assertEqual(res, [2, 1])

if __name__ == '__main__':
    unittest.main()
