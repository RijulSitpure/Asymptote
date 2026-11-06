import unittest
from solution import elevatorTotalTravel

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(elevatorTotalTravel([3, 1, 4], 0), 3 + 2 + 3) # 8
        self.assertEqual(elevatorTotalTravel([5], 5), 0)

if __name__ == '__main__':
    unittest.main()
