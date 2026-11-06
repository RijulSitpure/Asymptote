import unittest
from solution import simulateBombAndBoxes

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(simulateBombAndBoxes([['#', '-'], ['*', '-']]), [['-', '-'], ['*', '-']])
        self.assertEqual(simulateBombAndBoxes([['#'], ['-'], ['*']]), [['-'], ['-'], ['*']])

if __name__ == '__main__':
    unittest.main()
