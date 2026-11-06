import unittest
from solution import countRobotGroups

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countRobotGroups([[1, 2], [3, 1], [10, 2]]), 2)
        self.assertEqual(countRobotGroups([[1, 1], [4, 1], [7, 1]]), 3)
        self.assertEqual(countRobotGroups([[5, 5]]), 1)

if __name__ == '__main__':
    unittest.main()
