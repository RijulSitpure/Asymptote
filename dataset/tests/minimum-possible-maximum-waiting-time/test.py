import unittest
from solution import minMaxWaitingTime

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minMaxWaitingTime([7, 2, 5, 10, 8], 2), 18)
        self.assertEqual(minMaxWaitingTime([1, 2, 3, 4, 5], 2), 9)

if __name__ == '__main__':
    unittest.main()
