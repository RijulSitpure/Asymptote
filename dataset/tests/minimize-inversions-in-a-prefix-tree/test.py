import unittest
from solution import minInversionsPrefixTree

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [2, 1]: 2 = 10_2, 1 = 01_2. If swapped bit 1, becomes [0, 1] ordered -> 0 inversions
        self.assertEqual(minInversionsPrefixTree([2, 1]), 0)
        self.assertEqual(minInversionsPrefixTree([1, 2, 3]), 0)

if __name__ == '__main__':
    unittest.main()
