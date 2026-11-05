import unittest
from solution import minEnergy

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # intervals: [1, 3], [2, 4] -> merged [1, 4] (len 4). brightness = 2 -> 8
        self.assertEqual(minEnergy(5, 2, [[1, 3], [2, 4]]), 8)

if __name__ == '__main__':
    unittest.main()
