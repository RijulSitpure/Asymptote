import unittest
from solution import concatWithReverse

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(concatWithReverse([1, 2, 3]), [1, 2, 3, 3, 2, 1])
        self.assertEqual(concatWithReverse([1]), [1, 1])

if __name__ == '__main__':
    unittest.main()
