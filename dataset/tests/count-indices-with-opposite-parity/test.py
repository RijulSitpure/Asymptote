import unittest
from solution import countOppositeParity

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countOppositeParity([1, 2, 3, 4]), [2, 1, 1, 0])
        self.assertEqual(countOppositeParity([1]), [0])

if __name__ == '__main__':
    unittest.main()
