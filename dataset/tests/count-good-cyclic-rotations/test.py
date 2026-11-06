import unittest
from solution import countGoodCyclicRotations

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countGoodCyclicRotations([3, 4, 5, 1, 2]), 5)
        self.assertEqual(countGoodCyclicRotations([2, 1, 3, 4]), 2)

if __name__ == '__main__':
    unittest.main()
