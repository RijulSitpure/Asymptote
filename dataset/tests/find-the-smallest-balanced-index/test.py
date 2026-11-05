import unittest
from solution import findMiddleIndex

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(findMiddleIndex([2, 3, -1, 8, 4]), 3) # left: 4, right: 4
        self.assertEqual(findMiddleIndex([1, -1, 4]), 2)
        self.assertEqual(findMiddleIndex([2, 5]), -1)

if __name__ == '__main__':
    unittest.main()
