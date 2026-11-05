import unittest
from solution import triangleAngles

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 3, 4, 5 right triangle -> 36.87, 53.13, 90.0
        res = triangleAngles(3, 4, 5)
        self.assertEqual(res, [36.87, 53.13, 90.0])
        self.assertEqual(triangleAngles(1, 1, 1), [60.0, 60.0, 60.0])
        self.assertEqual(triangleAngles(1, 2, 3), [])

if __name__ == '__main__':
    unittest.main()
