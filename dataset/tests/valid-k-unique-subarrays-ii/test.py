import unittest
from solution import validKUniqueSubarraysWithMinSum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(validKUniqueSubarraysWithMinSum([1, 2, 3, 4], 2, 5), 2) # [2, 3]=5, [3, 4]=7
        self.assertEqual(validKUniqueSubarraysWithMinSum([1, 1, 1], 1, 2), 3) # [1, 1], [1, 1], [1, 1, 1]

if __name__ == '__main__':
    unittest.main()
