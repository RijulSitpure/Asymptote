import unittest
from solution import minIncreases

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minIncreases([1, 1, 1]), 1) # index 1 needs 2 -> cost 1
        self.assertEqual(minIncreases([2, 5, 2]), 0) # already peak

if __name__ == '__main__':
    unittest.main()
