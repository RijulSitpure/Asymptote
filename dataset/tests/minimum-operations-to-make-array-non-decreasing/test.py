import unittest
from solution import minOperations

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperations([3, 1, 2]), 2)
        self.assertEqual(minOperations([1, 2, 3]), 0)

if __name__ == '__main__':
    unittest.main()
