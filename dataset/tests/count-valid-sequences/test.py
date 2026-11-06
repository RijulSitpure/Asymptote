import unittest
from solution import countValidSequences

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countValidSequences(1), 3) # [0], [1], [2]
        self.assertEqual(countValidSequences(2), 7) # 00, 01, 10, 11, 12, 21, 22 -> 7

if __name__ == '__main__':
    unittest.main()
