import unittest
from solution import minPartitionScore

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minPartitionScore([1, 4, 3, 2], 2), 7)
        self.assertEqual(minPartitionScore([5, 5, 5], 3), 5)

if __name__ == '__main__':
    unittest.main()
