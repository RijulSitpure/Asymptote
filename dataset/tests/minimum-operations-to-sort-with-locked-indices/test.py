import unittest
from solution import minOperations

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(minOperations([2, 1, 3], [0, 0, 1], 1), 1)
        self.assertEqual(minOperations([1, 2, 3], [1, 1, 1], 1), 0)
        self.assertEqual(minOperations([2, 3, 1], [0, 1, 0], 1), -1)

if __name__ == '__main__':
    unittest.main()
