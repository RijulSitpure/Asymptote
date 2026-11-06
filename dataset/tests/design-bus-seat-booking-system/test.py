import unittest
from solution import BusBookingSystem

class TestSolution(unittest.TestCase):
    def test_basic(self):
        bus = BusBookingSystem(2, 2) # seats 1, 2, 3, 4
        self.assertEqual(bus.book(), 1)
        self.assertEqual(bus.book(), 2)
        self.assertTrue(bus.cancel(1))
        self.assertEqual(bus.book(), 1) # re-assigned 1
        self.assertEqual(bus.book(), 3)
        self.assertEqual(bus.book(), 4)
        self.assertEqual(bus.book(), -1) # full

if __name__ == '__main__':
    unittest.main()
