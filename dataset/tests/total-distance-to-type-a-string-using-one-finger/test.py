import unittest
from solution import totalDistance

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(totalDistance("cake"), 8)
        self.assertEqual(totalDistance("ab"), 1)
        self.assertEqual(totalDistance("ag"), 1)

if __name__ == '__main__':
    unittest.main()
