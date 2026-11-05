import unittest
from solution import powerUpdatesII

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # nums = [2, 5], p = 2, queries = [[4, 2]]
        # insert 4 -> [2, 4, 5], 2nd largest is 4. p = 2^4 = 16.
        self.assertEqual(powerUpdatesII([2, 5], 2, [[4, 2]]), [16])

if __name__ == '__main__':
    unittest.main()
