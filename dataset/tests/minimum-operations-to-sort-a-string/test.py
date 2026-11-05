import unittest
from solution import minOperationsToSort

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperationsToSort("cba"), 2) # keep 'a' or 'b' or 'c', move 2
        self.assertEqual(minOperationsToSort("abc"), 0)
        self.assertEqual(minOperationsToSort("bca"), 1) # keep "bc", move 'a' to front

if __name__ == '__main__':
    unittest.main()
