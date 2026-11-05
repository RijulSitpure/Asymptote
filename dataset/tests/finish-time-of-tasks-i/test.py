import unittest
from solution import minimumFinishTime

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minimumFinishTime([1, 2, 3, 4, 5], 2), 9) # [1, 2, 3] and [4, 5] -> 6 and 9
        self.assertEqual(minimumFinishTime([7, 2, 5, 10, 8], 2), 18)

if __name__ == '__main__':
    unittest.main()
