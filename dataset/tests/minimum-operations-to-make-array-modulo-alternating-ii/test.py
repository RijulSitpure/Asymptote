import unittest
from solution import minOperationsII

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperationsII([2, 3], 3), 0)
        self.assertEqual(minOperationsII([3, 3], 3), 1)

if __name__ == '__main__':
    unittest.main()
