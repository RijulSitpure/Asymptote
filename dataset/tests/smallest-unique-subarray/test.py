import unittest
from solution import smallestUniqueSubarray

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(smallestUniqueSubarray([3, 3, 3]), 3)
        self.assertEqual(smallestUniqueSubarray([2, 1, 2, 3, 3]), 1)

if __name__ == '__main__':
    unittest.main()
