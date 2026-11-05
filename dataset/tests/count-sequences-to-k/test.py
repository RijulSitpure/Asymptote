import unittest
from solution import countSequences

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countSequences(2, 6, 7), 6) # (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)
        self.assertEqual(countSequences(1, 4, 3), 1)
        self.assertEqual(countSequences(2, 2, 5), 0)

if __name__ == '__main__':
    unittest.main()
