import unittest
from solution import isAdjacentDiffAtMostTwo

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(isAdjacentDiffAtMostTwo("132"))
        self.assertFalse(isAdjacentDiffAtMostTwo("129"))

if __name__ == '__main__':
    unittest.main()
