import unittest
from solution import lastVisitedCell

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # ["RR", "LL"]: (0,0) -> (0,1) -> (0,2 exits!). Last cell is [0, 1]
        self.assertEqual(lastVisitedCell(["RR", "LL"]), [0, 1])
        # Cycle: ["RD", "UL"]: (0,0)->(0,1)->(1,1)->(1,0)->(0,0 cycle). Last visited before cycle entry is [1, 0]
        self.assertEqual(lastVisitedCell(["RD", "UL"]), [1, 0])

if __name__ == '__main__':
    unittest.main()
