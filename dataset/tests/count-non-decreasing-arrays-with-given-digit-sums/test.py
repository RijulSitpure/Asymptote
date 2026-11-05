import unittest
from solution import countArrays

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertGreater(countArrays([1, 2]), 0) # e.g. [1, 2], [1, 11], [10, 11]

if __name__ == '__main__':
    unittest.main()
