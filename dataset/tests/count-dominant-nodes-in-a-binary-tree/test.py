import unittest
from solution import countDominantNodes

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # Tree: 5 -> left: 2, right: 3 -> 5 > 2, 3 (dominant), 2 is leaf (dominant), 3 is leaf (dominant) -> 3
        self.assertEqual(countDominantNodes([5, 2, 3]), 3)
        # Tree: 1 -> left: 5 -> 1 is not dominant, 5 is dominant -> 1
        self.assertEqual(countDominantNodes([1, 5]), 1)

if __name__ == '__main__':
    unittest.main()
