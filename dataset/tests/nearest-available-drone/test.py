import unittest
from solution import findNearestDrone

class TestSolution(unittest.TestCase):
    def test_basic(self):
        drones = [[0, 0], [5, 5], [2, 1]]
        target = [2, 2]
        self.assertEqual(findNearestDrone(drones, target), 2) # dist to (2, 1) is 1

if __name__ == '__main__':
    unittest.main()
