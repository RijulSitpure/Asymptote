import unittest
from solution import countMonobitIntegers

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countMonobitIntegers(1, 10), 4) # 1, 2, 4, 8
        self.assertEqual(countMonobitIntegers(3, 7), 1)  # 4
        self.assertEqual(countMonobitIntegers(16, 16), 1)

if __name__ == '__main__':
    unittest.main()
