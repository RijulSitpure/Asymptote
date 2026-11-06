import unittest
from solution import maxStationGap

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxStationGap([3, 6, 9, 1]), 3) # sorted [1, 3, 6, 9], gaps 2, 3, 3 -> 3
        self.assertEqual(maxStationGap([10]), 0)

if __name__ == '__main__':
    unittest.main()
