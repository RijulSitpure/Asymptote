import unittest
from solution import mergeAdjacent

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(mergeAdjacent([2, 2, 4]), [8])
        self.assertEqual(mergeAdjacent([1, 2, 3]), [1, 2, 3])
        self.assertEqual(mergeAdjacent([3, 3, 6, 12]), [24])

if __name__ == '__main__':
    unittest.main()
