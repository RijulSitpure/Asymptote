import unittest
from solution import minInitialStrength

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minInitialStrength([2, 7, 4, 3], 4), 13) # total 16 - min(7, 4)=4 -> 12 + 1 = 13
        self.assertEqual(minInitialStrength([2, 5, 3, 4], 7), 10) # total 14 - min(5, 7)=5 -> 9 + 1 = 10

if __name__ == '__main__':
    unittest.main()
