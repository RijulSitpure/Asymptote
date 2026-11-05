import unittest
from solution import firstUniqueFrequency

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(firstUniqueFrequency([1, 1, 2, 3, 3, 4, 4]), 2) # freq of 2 is 1 (unique)
        self.assertEqual(firstUniqueFrequency([1, 2, 3]), -1) # all have freq 1

if __name__ == '__main__':
    unittest.main()
