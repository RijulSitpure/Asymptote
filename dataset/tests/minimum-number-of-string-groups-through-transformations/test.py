import unittest
from solution import numSimilarGroups

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(numSimilarGroups(["tars", "rats", "arts", "star"]), 2)
        self.assertEqual(numSimilarGroups(["omv", "ovm"]), 1)

if __name__ == '__main__':
    unittest.main()
