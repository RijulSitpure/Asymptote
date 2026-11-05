import unittest
from solution import smallestStableIndex

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(smallestStableIndex([1, 2, 3]), 0) # 1 <= all right
        self.assertEqual(smallestStableIndex([5, 4, 3]), -1)

if __name__ == '__main__':
    unittest.main()
