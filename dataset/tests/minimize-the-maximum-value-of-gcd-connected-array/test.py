import unittest
from solution import minimumMaxValue

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(minimumMaxValue(3, 1, 4), 6)
        self.assertEqual(minimumMaxValue(2, 0, 6), 8)

if __name__ == '__main__':
    unittest.main()
