import unittest
from solution import minElevatorCost

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [2, 5, 7], capacity 2 -> batch [7, 5] cost 2*7=14; batch [2] cost 2*2=4 -> 18
        self.assertEqual(minElevatorCost([2, 5, 7], 2), 18)

if __name__ == '__main__':
    unittest.main()
