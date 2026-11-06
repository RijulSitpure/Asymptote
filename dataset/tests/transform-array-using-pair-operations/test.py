import unittest
from solution import minTransformOperations

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minTransformOperations([1, 0, 5]), 3) # target 2 -> diff from 5 is 3
        self.assertEqual(minTransformOperations([0, 3, 0]), 2) # target 1 -> diff from 3 is 2
        self.assertEqual(minTransformOperations([0, 2, 0]), -1)

if __name__ == '__main__':
    unittest.main()
