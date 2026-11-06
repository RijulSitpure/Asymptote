import unittest
from solution import countSubarraysWithDistantSums

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 5, 2], threshold 3: total 6.
        # [1, 5] diff 4 >= 3; [5, 2] diff 3 >= 3; [1, 5, 2] diff 4 >= 3. Total distant = 3
        self.assertEqual(countSubarraysWithDistantSums([1, 5, 2], 3), 3)
        self.assertEqual(countSubarraysWithDistantSums([1, 2, 3], 5), 0)

if __name__ == '__main__':
    unittest.main()
