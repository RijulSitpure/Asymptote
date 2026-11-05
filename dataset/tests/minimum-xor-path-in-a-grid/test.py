import unittest
from solution import minXorPath

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minXorPath([[1, 2], [3, 4]]), 6) # path (0,0)->(0,1)->(1,1): 1^2^4 = 7; or 1^3^4 = 6 => min is 6
        self.assertEqual(minXorPath([[5]]), 5)

if __name__ == '__main__':
    unittest.main()
