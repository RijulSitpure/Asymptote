import unittest
from solution import maxFixedPoints

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [0, 2, 1, 2] -> fixed point 0 at index 0, delete element 2, array is [0, 1, 2] -> 3 fixed points!
        self.assertEqual(maxFixedPoints([0, 2, 1, 2]), 3)

if __name__ == '__main__':
    unittest.main()
