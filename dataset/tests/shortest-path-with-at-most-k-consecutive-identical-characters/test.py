import unittest
from solution import shortestPathWithConsecutiveLimit

class TestSolution(unittest.TestCase):
    def test_basic(self):
        g = [['a', 'a'], ['a', 'b']]
        self.assertEqual(shortestPathWithConsecutiveLimit(g, 2), 2) # (0,0) -> (1,0) 'a' streak 2 -> (1,1) 'b' streak 1 -> dist 2
        g2 = [['a', 'a'], ['a', 'a']]
        self.assertEqual(shortestPathWithConsecutiveLimit(g2, 2), -1) # path length 3 requires streak 3 > 2

if __name__ == '__main__':
    unittest.main()
