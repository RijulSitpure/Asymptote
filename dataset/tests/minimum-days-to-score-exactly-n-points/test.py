import unittest
from solution import minDaysToScore

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minDaysToScore(10), 4) # 10 -> 9 -> 3 -> 1 -> 0 or 10 -> 5 -> 4 -> 2 -> 1
        self.assertEqual(minDaysToScore(6), 3)  # 6 -> 2 -> 1 -> 0
        self.assertEqual(minDaysToScore(1), 1)

if __name__ == '__main__':
    unittest.main()
