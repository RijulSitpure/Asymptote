import unittest
from solution import minOperations

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperations([1, 2, 8], 7), 1) # split 8 -> 4, 4, then 4 -> 2, 2. Target 7 = 4 + 2 + 1
        self.assertEqual(minOperations([1, 32, 1, 2], 12), 2)
        self.assertEqual(minOperations([1, 32, 1], 35), -1)

if __name__ == '__main__':
    unittest.main()
