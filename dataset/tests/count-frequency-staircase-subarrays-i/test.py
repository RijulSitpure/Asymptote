import unittest
from solution import countStaircase

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(countStaircase([1, 2, 2]), 4)
        self.assertEqual(countStaircase([1]), 1)

if __name__ == '__main__':
    unittest.main()
