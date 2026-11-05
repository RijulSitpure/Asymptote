import unittest
from solution import rob

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(rob([1, 2, 3, 1]), 5)
        self.assertEqual(rob([2, 7, 9, 3, 1]), 17)

if __name__ == '__main__':
    unittest.main()
