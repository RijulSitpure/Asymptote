import unittest
from solution import minMovesToBalanceCircularArray

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minMovesToBalanceCircularArray([1, 2, 3]), 1)
        self.assertEqual(minMovesToBalanceCircularArray([1, 1, 1]), 0)
        self.assertEqual(minMovesToBalanceCircularArray([1, 2]), -1) # odd sum

if __name__ == '__main__':
    unittest.main()
