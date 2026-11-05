import unittest
from solution import mergeClose

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(mergeClose("abbaca"), "ca")
        self.assertEqual(mergeClose("azxxzy"), "ay")

if __name__ == '__main__':
    unittest.main()
