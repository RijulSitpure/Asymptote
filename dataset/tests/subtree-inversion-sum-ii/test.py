import unittest
from solution import subtreeInversionSum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # Tree: 0-1, nums = [-5, 10], k = 1.
        # Base sum is 5. If we invert node 0, tree becomes [5, -10] -> -5.
        # If we invert node 1, tree becomes [-5, -10] -> -15.
        # If we invert nothing, sum is 5.
        self.assertEqual(subtreeInversionSum([[0, 1]], [-5, 10], 1), 5)
        # Tree: 0-1, nums = [-5, -10], k = 1. Invert node 0 -> [5, 10] -> 15!
        self.assertEqual(subtreeInversionSum([[0, 1]], [-5, -10], 1), 15)

if __name__ == '__main__':
    unittest.main()
