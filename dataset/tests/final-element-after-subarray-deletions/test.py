import unittest
from solution import finalElement

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(finalElement([1, 2, 3, 4, 5, 6, 7, 8, 9]), 6)
        self.assertEqual(finalElement([42]), 42)
        self.assertEqual(finalElement([1, 2]), 2)

if __name__ == '__main__':
    unittest.main()
