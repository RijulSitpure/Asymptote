import unittest
from solution import reverseKSubarrays

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(reverseKSubarrays([1, 2, 3, 4, 5], 2), [2, 1, 4, 3, 5])
        self.assertEqual(reverseKSubarrays([1, 2, 3], 3), [3, 2, 1])

if __name__ == '__main__':
    unittest.main()
