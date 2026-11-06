import unittest
from solution import canReachInEvenKnightMoves

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(canReachInEvenKnightMoves([0, 0], [1, 1])) # both sum even
        self.assertFalse(canReachInEvenKnightMoves([0, 0], [1, 2])) # 0 vs 3 (different parity)

if __name__ == '__main__':
    unittest.main()
