import unittest
from solution import minGenerations

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # Target in initial points
        self.assertEqual(minGenerations([[0, 0, 0], [2, 2, 2]], [0, 0, 0]), 0)
        # Midpoint of [0, 0, 0] and [2, 2, 2] is [1, 1, 1] in gen 1
        self.assertEqual(minGenerations([[0, 0, 0], [2, 2, 2]], [1, 1, 1]), 1)

if __name__ == '__main__':
    unittest.main()
