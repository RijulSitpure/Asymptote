import unittest
from solution import smallestStrictlyStableIndex

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(smallestStrictlyStableIndex([1, 2, 3]), 0)
        self.assertEqual(smallestStrictlyStableIndex([2, 2, 2]), -1) # equal values not strictly stable

if __name__ == '__main__':
    unittest.main()
