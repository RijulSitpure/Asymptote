import unittest
from solution import maxManhattanDistance

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxManhattanDistance("NESW"), 2) # after NE: (1, 1) -> 2
        self.assertEqual(maxManhattanDistance("NNN"), 3)
        self.assertEqual(maxManhattanDistance(""), 0)

if __name__ == '__main__':
    unittest.main()
