import unittest
from solution import countWaysToFormTarget

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countWaysToFormTarget("acca", "bbbb", "aba"), 2)
        self.assertEqual(countWaysToFormTarget("a", "b", "c"), 0)

if __name__ == '__main__':
    unittest.main()
