import unittest
from solution import minArraySum

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minArraySum([3, 6, 2]), 7)
        self.assertEqual(minArraySum([4, 2, 8, 3]), 9)

if __name__ == '__main__':
    unittest.main()
