import unittest
from solution import minFlips

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minFlips([0, 1, 0]), 3)
        self.assertEqual(minFlips([1, 1, 1]), 0)
        self.assertEqual(minFlips([1, 0, 1]), 2)

if __name__ == '__main__':
    unittest.main()
