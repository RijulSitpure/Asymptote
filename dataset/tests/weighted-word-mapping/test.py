import unittest
from solution import sortWordsByWeight

class TestSolution(unittest.TestCase):
    def test_basic(self):
        weights = [i + 1 for i in range(26)]
        self.assertEqual(sortWordsByWeight(["b", "a", "c"], weights), ["a", "b", "c"])
        self.assertEqual(sortWordsByWeight(["ba", "ab"], weights), ["ab", "ba"])

if __name__ == '__main__':
    unittest.main()
