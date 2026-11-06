import unittest
from solution import countSubarrays

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(countSubarrays([1, 4, 7, 3], 1, 5), 4)
        self.assertEqual(countSubarrays([2, 3, 4], 1, 5), 6)
        self.assertEqual(countSubarrays([6, 7], 1, 5), 0)

if __name__ == '__main__':
    unittest.main()
