import unittest
from solution import maxPointsActivated

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxPointsActivated([[1, 0], [0, 1]]), 3)
        self.assertEqual(maxPointsActivated([[1, 1], [1, 0]]), 4)

if __name__ == '__main__':
    unittest.main()
