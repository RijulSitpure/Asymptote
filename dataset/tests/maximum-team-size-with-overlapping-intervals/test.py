import unittest
from solution import maxTeamSize

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxTeamSize([[1, 3], [2, 5], [4, 6]]), 2)
        self.assertEqual(maxTeamSize([[1, 10], [2, 8], [3, 6]]), 3)

if __name__ == '__main__':
    unittest.main()
