import unittest
from solution import countShadowPairs

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countShadowPairs([4, 5, 6, 7]), 6) # all diffs are 4-0=4, 5-1=4, 6-2=4, 7-3=4 -> 4*3/2 = 6
        self.assertEqual(countShadowPairs([1, 1, 1]), 0)

if __name__ == '__main__':
    unittest.main()
