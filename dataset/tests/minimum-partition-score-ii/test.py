import unittest
from solution import minPartitionScore

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minPartitionScore([5, 1, 2, 1], 2), 25)
        self.assertEqual(minPartitionScore([1, 2, 3, 4], 1), 55)

if __name__ == '__main__':
    unittest.main()
