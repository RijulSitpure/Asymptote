import unittest
from solution import minOperationsForKPeaks

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperationsForKPeaks([1, 1, 1], 1), 1)
        self.assertEqual(minOperationsForKPeaks([1, 4, 1, 1, 4, 1], 2), 0)

if __name__ == '__main__':
    unittest.main()
