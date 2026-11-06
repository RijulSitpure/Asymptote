import unittest
from solution import countScaledShadowPairs

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # nums = [2, 4, 6], k = 2 -> 2 - 0 = 2, 4 - 2 = 2, 6 - 4 = 2. All 3 match -> 3 pairs
        self.assertEqual(countScaledShadowPairs([2, 4, 6], 2), 3)
        self.assertEqual(countScaledShadowPairs([1, 2, 3], 0), 0)

if __name__ == '__main__':
    unittest.main()
