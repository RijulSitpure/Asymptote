import unittest
from solution import unfinishedTasksAfterShifts

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(unfinishedTasksAfterShifts([10, 5, 2], [7, 6, 5]), [3, 2, 0])
        self.assertEqual(unfinishedTasksAfterShifts([3], [5]), [0])

if __name__ == '__main__':
    unittest.main()
