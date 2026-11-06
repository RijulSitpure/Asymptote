import unittest
from solution import getLargestString

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(getLargestString("45320"), "45320")
        self.assertEqual(getLargestString("001"), "001")
        self.assertEqual(getLargestString("246"), "426")

if __name__ == '__main__':
    unittest.main()
