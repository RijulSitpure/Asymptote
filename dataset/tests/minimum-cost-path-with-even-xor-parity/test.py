import unittest
from solution import minActivationCost

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(minActivationCost([[0, 1, 10]], [2, 1]), 10)
        self.assertEqual(minActivationCost([[0, 1, 5], [1, 2, 5]], [0, 0, 0]), 10)

if __name__ == '__main__':
    unittest.main()
