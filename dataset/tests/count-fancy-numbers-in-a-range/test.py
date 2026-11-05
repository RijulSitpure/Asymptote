import unittest
from solution import countFancy

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countFancy(1, 10), 10) # 1..9 (all fancy) + 10 (fancy: '1' != '0') -> 10
        self.assertEqual(countFancy(11, 11), 0) # 11 is not fancy ('1' == '1')
        self.assertEqual(countFancy(1, 12), 11) # 1..10 (10) + 12 (1) = 11

if __name__ == '__main__':
    unittest.main()
