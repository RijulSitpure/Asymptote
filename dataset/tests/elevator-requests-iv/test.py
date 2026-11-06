import unittest
from solution import minElevatorTrips

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minElevatorTrips([4, 8, 1, 5], 10), 2) # [8, 1] (9) and [5, 4] (9) -> 2 rides
        self.assertEqual(minElevatorTrips([5, 5, 5], 5), 3)

if __name__ == '__main__':
    unittest.main()
