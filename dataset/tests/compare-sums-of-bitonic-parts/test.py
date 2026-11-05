import unittest
from solution import compareSumsOfBitonicParts

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(compareSumsOfBitonicParts([1, 3, 5, 4, 2]), 1)
        self.assertEqual(compareSumsOfBitonicParts([1, 4, 5, 2]), 0)
        self.assertEqual(compareSumsOfBitonicParts([1, 3, 1]), -1)

if __name__ == '__main__':
    unittest.main()
