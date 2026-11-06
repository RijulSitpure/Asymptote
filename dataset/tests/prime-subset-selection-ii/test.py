import unittest
from solution import maxPrimeSubsetSize

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [2, 3, 6]: 2 has {2}, 3 has {3}, 6 has {2, 3}. Subsets: {2, 3} (size 2), {6} (size 1). Max = 2
        self.assertEqual(maxPrimeSubsetSize([2, 3, 6]), 2)
        # 1s can always be included
        self.assertEqual(maxPrimeSubsetSize([1, 1, 5]), 3)

if __name__ == '__main__':
    unittest.main()
