import unittest
from solution import maxAlternatingSumWithDeletion

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [4, 2, 5, 3]: 4 - 2 + 5 = 7
        self.assertEqual(maxAlternatingSumWithDeletion([4, 2, 5, 3]), 7)
        self.assertEqual(maxAlternatingSumWithDeletion([1]), 1)

if __name__ == '__main__':
    unittest.main()
