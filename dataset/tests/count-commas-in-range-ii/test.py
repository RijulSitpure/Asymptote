import unittest
from solution import countCommasInRange

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countCommasInRange(1000, 1002), 3)
        self.assertEqual(countCommasInRange(1, 999), 0)

if __name__ == '__main__':
    unittest.main()
