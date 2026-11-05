import unittest
from solution import minSwaps

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minSwaps([0, 1, 0, 3, 12]), 2)
        self.assertEqual(minSwaps([1, 2, 3, 0]), 0)

if __name__ == '__main__':
    unittest.main()
