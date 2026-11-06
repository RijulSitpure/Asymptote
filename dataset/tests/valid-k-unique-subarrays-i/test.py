import unittest
from solution import countSubarraysWithKUnique

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countSubarraysWithKUnique([1, 2, 1, 2, 3], 2), 7)
        self.assertEqual(countSubarraysWithKUnique([1, 2, 1, 3, 4], 3), 3)

if __name__ == '__main__':
    unittest.main()
