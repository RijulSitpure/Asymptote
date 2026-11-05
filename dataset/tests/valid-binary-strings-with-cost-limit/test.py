import unittest
from solution import countValidBinaryStrings

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # n = 2, max_cost = 0: only alternating strings '01' and '10' have cost 0 -> 2
        self.assertEqual(countValidBinaryStrings(2, 0), 2)
        # n = 2, max_cost = 1: all 4 strings ('00', '01', '10', '11') have cost <= 1 -> 4
        self.assertEqual(countValidBinaryStrings(2, 1), 4)

if __name__ == '__main__':
    unittest.main()
