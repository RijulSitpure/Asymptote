import unittest
from solution import minOperations

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperations([1, 2, 3]), 0) # odd, even, odd
        self.assertEqual(minOperations([2, 4, 6]), 1) # make middle odd -> [2, 5, 6] (1 op)

if __name__ == '__main__':
    unittest.main()
