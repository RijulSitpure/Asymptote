import unittest
from solution import countSmallerWithOppositeParity

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countSmallerWithOppositeParity([5, 2, 4, 1, 3]), [2, 1, 2, 0, 0])

if __name__ == '__main__':
    unittest.main()
