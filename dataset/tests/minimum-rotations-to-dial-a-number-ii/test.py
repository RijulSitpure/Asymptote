import unittest
from solution import minRotationsToDialModM

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # m = 20, target = [5, 18]: 0 -> 5 (5); 5 -> 18 (diff 13, 20-13=7). Total = 5 + 7 = 12
        self.assertEqual(minRotationsToDialModM([5, 18], 20), 12)
        self.assertEqual(minRotationsToDialModM([0, 0], 20), 0)

if __name__ == '__main__':
    unittest.main()
