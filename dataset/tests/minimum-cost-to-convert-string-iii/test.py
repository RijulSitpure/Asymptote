import unittest
from solution import minCostToConvertString

class TestSolution(unittest.TestCase):
    def test_basic(self):
        res = minCostToConvertString("abcd", "acbe", ["a", "b", "c", "c", "e", "d"], ["b", "c", "b", "e", "b", "e"], [2, 5, 5, 1, 2, 20])
        self.assertEqual(res, 28)
        self.assertEqual(minCostToConvertString("a", "b", [], [], []), -1)

if __name__ == '__main__':
    unittest.main()
