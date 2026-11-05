import unittest
from solution import scoreDifference

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(scoreDifference([1, 5, 2]), -2)
        self.assertEqual(scoreDifference([1, 5, 233, 7]), 222)

if __name__ == '__main__':
    unittest.main()
