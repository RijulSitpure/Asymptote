import unittest
from solution import trafficSignal

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(trafficSignal(0, 30, 5, 25), "Green")
        self.assertEqual(trafficSignal(32, 30, 5, 25), "Yellow")
        self.assertEqual(trafficSignal(40, 30, 5, 25), "Red")

if __name__ == '__main__':
    unittest.main()
