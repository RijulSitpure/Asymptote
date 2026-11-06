import unittest
from solution import calculateScore

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(calculateScore(5, 3), 4)
        self.assertEqual(calculateScore(2, 7), 3)

if __name__ == '__main__':
    unittest.main()
