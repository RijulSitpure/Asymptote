import unittest
from solution import maximizeSum

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(maximizeSum([123, 45], 1), 366)
        self.assertEqual(maximizeSum([10, 20], 2), 30)

if __name__ == '__main__':
    unittest.main()
