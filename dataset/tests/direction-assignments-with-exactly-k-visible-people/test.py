import unittest
from solution import visiblePeopleWays

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(visiblePeopleWays(3, 2), 3) # [1,3,2], [2,1,3], [2,3,1]
        self.assertEqual(visiblePeopleWays(3, 3), 1) # [1,2,3]
        self.assertEqual(visiblePeopleWays(3, 1), 2) # [3,1,2], [3,2,1]

if __name__ == '__main__':
    unittest.main()
