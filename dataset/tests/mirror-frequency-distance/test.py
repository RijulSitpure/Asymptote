import unittest
from solution import mirrorFrequencyDistance

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(mirrorFrequencyDistance("az"), 0) # 'a':1, 'z':1 -> diff 0
        self.assertEqual(mirrorFrequencyDistance("aa"), 2) # 'a':2, 'z':0 -> diff 2
        self.assertEqual(mirrorFrequencyDistance("abc"), 3)

if __name__ == '__main__':
    unittest.main()
