import unittest
from solution import RideSharingSystem

class TestSolution(unittest.TestCase):
    def test_basic(self):
        sys = RideSharingSystem()
        sys.addDriver(1, 0, 0)
        sys.addDriver(2, 5, 5)
        self.assertEqual(sys.requestRide(101, 1, 1), 1)
        self.assertEqual(sys.requestRide(102, 1, 1), 2)
        sys.completeRide(101, 10, 10)
        self.assertEqual(sys.requestRide(103, 9, 9), 1)

if __name__ == '__main__':
    unittest.main()
