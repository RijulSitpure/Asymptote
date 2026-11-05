import unittest
from solution import canWinDivisibleGame

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(canWinDivisibleGame(2))
        self.assertFalse(canWinDivisibleGame(3))
        self.assertTrue(canWinDivisibleGame(4))

if __name__ == '__main__':
    unittest.main()
