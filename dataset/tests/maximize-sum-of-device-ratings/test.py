import unittest
from solution import maxDeviceRatings

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxDeviceRatings([1, 2, 3, 1]), 4) # 1 + 3
        self.assertEqual(maxDeviceRatings([2, 7, 9, 3, 1]), 12) # 2 + 9 + 1
        self.assertEqual(maxDeviceRatings([-1, -2, -3]), 0)

if __name__ == '__main__':
    unittest.main()
