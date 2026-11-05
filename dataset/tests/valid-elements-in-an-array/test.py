import unittest
from solution import findValidElements

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(findValidElements([1, 2, 4, 2, 3, 2]), [1, 2, 4, 3, 2])
        self.assertEqual(findValidElements([5, 5, 5, 5]), [5, 5])

if __name__ == '__main__':
    unittest.main()
