import unittest
from solution import countKthRoots

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # Range [1, 10], k = 2: 1^2=1, 2^2=4, 3^2=9 -> 3
        self.assertEqual(countKthRoots(1, 10, 2), 3)
        self.assertEqual(countKthRoots(5, 8, 2), 0)

if __name__ == '__main__':
    unittest.main()
