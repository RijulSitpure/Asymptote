import unittest
from solution import powerUpdatesI

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # nums = [2, 5], p = 2, queries = [[4, 2]] -> [16]
        self.assertEqual(powerUpdatesI([2, 5], 2, [[4, 2]]), [16])

if __name__ == '__main__':
    unittest.main()
