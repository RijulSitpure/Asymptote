import unittest
from solution import firstUniqueEven

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(firstUniqueEven([4, 2, 4, 6, 8, 2]), 6)
        self.assertEqual(firstUniqueEven([2, 2, 4, 4]), -1)
        self.assertEqual(firstUniqueEven([1, 3, 5]), -1)

if __name__ == '__main__':
    unittest.main()
