import unittest
from solution import smallestPair

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(smallestPair([1, 1, 2, 3, 3]), [1, 2]) # 1 has freq 2, 2 has freq 1
        self.assertEqual(smallestPair([1, 2, 3]), [-1, -1])

if __name__ == '__main__':
    unittest.main()
