import unittest
from solution import hasUniqueMiddleElement

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(hasUniqueMiddleElement([1, 2, 3]))
        self.assertFalse(hasUniqueMiddleElement([2, 2, 2]))
        self.assertFalse(hasUniqueMiddleElement([1, 2]))

if __name__ == '__main__':
    unittest.main()
