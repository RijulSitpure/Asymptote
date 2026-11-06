import unittest
from solution import minElevatorRounds

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minElevatorRounds([1, 2, 3, 4, 5], 2), 3)
        self.assertEqual(minElevatorRounds([1, 2], 5), 1)

if __name__ == '__main__':
    unittest.main()
