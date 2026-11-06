import unittest
from solution import minMergedInteger

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(minMergedInteger([1, 2, 3, 4]), 12)
        self.assertEqual(minMergedInteger([5, 6, 2, 1]), 21)

if __name__ == '__main__':
    unittest.main()
