import unittest
from solution import minBishopMoves

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minBishopMoves(0, 0, 2, 2), 1)
        self.assertEqual(minBishopMoves(0, 0, 0, 2), 2)
        self.assertEqual(minBishopMoves(0, 0, 0, 1), -1)
        self.assertEqual(minBishopMoves(3, 3, 3, 3), 0)

if __name__ == '__main__':
    unittest.main()
