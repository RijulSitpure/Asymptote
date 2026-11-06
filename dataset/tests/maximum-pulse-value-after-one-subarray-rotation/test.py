import unittest
from solution import maxValueAfterReverse

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxValueAfterReverse([2, 3, 1, 5, 4]), 10)
        self.assertEqual(maxValueAfterReverse([2, 4, 9, 24, 2, 1, 10]), 68)

if __name__ == '__main__':
    unittest.main()
