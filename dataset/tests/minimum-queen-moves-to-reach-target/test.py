import unittest
from solution import minQueenMoves

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # queen (1,1), target (1,5), obstacle (1,3) -> blocked, takes 2 moves
        self.assertEqual(minQueenMoves(1, 1, 1, 5, 1, 3), 2)
        # queen (1,1), target (1,5), obstacle (2,3) -> not blocked, takes 1 move
        self.assertEqual(minQueenMoves(1, 1, 1, 5, 2, 3), 1)
        # already there
        self.assertEqual(minQueenMoves(2, 2, 2, 2, 0, 0), 0)

if __name__ == '__main__':
    unittest.main()
