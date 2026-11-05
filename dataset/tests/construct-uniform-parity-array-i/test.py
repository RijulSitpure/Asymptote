import unittest
from solution import canMakeUniformParity

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(canMakeUniformParity([2, 4, 6]))
        self.assertTrue(canMakeUniformParity([1, 2, 3]))

if __name__ == '__main__':
    unittest.main()
