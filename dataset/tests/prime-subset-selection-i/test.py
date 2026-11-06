import unittest
from solution import numberOfGoodSubsets

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(numberOfGoodSubsets([4, 2, 3, 15]), 5)
        self.assertEqual(numberOfGoodSubsets([1, 2, 3, 4]), 6)

if __name__ == '__main__':
    unittest.main()
