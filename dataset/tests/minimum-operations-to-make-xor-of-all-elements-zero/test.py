import unittest
from solution import minOperationsToZeroXOR

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperationsToZeroXOR([1, 2, 3]), 0) # 1 ^ 2 ^ 3 = 0
        self.assertEqual(minOperationsToZeroXOR([1, 2, 4]), 1)
        self.assertEqual(minOperationsToZeroXOR([0]), 0)

if __name__ == '__main__':
    unittest.main()
