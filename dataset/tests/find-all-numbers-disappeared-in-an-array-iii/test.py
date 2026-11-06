import unittest
from solution import findDisappearedNumbers

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]), [5, 6])
        self.assertEqual(findDisappearedNumbers([1, 1]), [2])

if __name__ == '__main__':
    unittest.main()
