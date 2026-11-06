import unittest
from solution import maxEqualRowsAfterFlips

class TestSolution(unittest.TestCase):
    def test_basic(self):
        m = [[0, 1], [1, 1]]
        self.assertEqual(maxEqualRowsAfterFlips(m), 1)
        m2 = [[0, 1], [1, 0]]
        self.assertEqual(maxEqualRowsAfterFlips(m2), 2)

if __name__ == '__main__':
    unittest.main()
