import unittest
from solution import sumOfCompatibleNumbers

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(sumOfCompatibleNumbers(1, 10, 3), 18) # 3 + 6 + 9
        self.assertEqual(sumOfCompatibleNumbers(5, 5, 2), 0)
        self.assertEqual(sumOfCompatibleNumbers(4, 8, 4), 12)

if __name__ == '__main__':
    unittest.main()
