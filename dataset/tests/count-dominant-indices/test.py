import unittest
from solution import countDominantIndices

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countDominantIndices([10, 2, 4, 1]), 2) # i=0: 10 > 7/3; i=2: 4 > 1/1
        self.assertEqual(countDominantIndices([1, 2, 3]), 0)

if __name__ == '__main__':
    unittest.main()
