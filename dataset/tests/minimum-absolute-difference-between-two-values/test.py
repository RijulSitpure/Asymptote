import unittest
from solution import minAbsoluteDifference

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minAbsoluteDifference([4, 2, 1, 3]), 1)
        self.assertEqual(minAbsoluteDifference([1, 10, 20]), 9)

if __name__ == '__main__':
    unittest.main()
