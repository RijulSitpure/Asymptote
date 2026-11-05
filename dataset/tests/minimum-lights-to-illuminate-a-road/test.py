import unittest
from solution import minLightsToIlluminateRoad

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minLightsToIlluminateRoad(10, [[0, 5], [4, 10]]), 2)
        self.assertEqual(minLightsToIlluminateRoad(10, [[0, 3], [5, 10]]), -1)
        self.assertEqual(minLightsToIlluminateRoad(5, [[0, 6]]), 1)

if __name__ == '__main__':
    unittest.main()
