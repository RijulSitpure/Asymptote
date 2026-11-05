import unittest
from solution import numberOfZigZagArrays

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # n = 3, range [1, 3] (m = 3: values 1, 2, 3)
        # Increasing then decreasing: (1, 3, 2), (1, 3, 1), (2, 3, 1), (2, 3, 2), (1, 2, 1) -> 5
        # Decreasing then increasing: (3, 1, 2), (3, 1, 3), (2, 1, 3), (2, 1, 2), (3, 2, 3) -> 5
        # Total = 10
        self.assertEqual(numberOfZigZagArrays(3, 1, 3), 10)

if __name__ == '__main__':
    unittest.main()
