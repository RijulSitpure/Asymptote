import unittest
from solution import minOpsToSortBinaryString

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOpsToSortBinaryString("0011"), 0)
        self.assertEqual(minOpsToSortBinaryString("1010"), 1)

if __name__ == '__main__':
    unittest.main()
