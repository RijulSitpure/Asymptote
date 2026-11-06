import unittest
from solution import maxTwoNonOverlappingSquaresArea

class TestSolution(unittest.TestCase):
    def test_basic(self):
        g = [
            [1, 1],
            [1, 1],
            [1, 0]
        ]
        # row 0-1 has 2x2 square (area 4), row 2 has 1x1 square (area 1) -> 5
        self.assertEqual(maxTwoNonOverlappingSquaresArea(g), 5)

if __name__ == '__main__':
    unittest.main()
