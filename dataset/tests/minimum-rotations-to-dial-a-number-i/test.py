import unittest
from solution import minRotationsToDial

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 0 -> 1 (1); 1 -> 9 (2); 9 -> 5 (4) -> 1 + 2 + 4 = 7
        self.assertEqual(minRotationsToDial("195"), 7)
        self.assertEqual(minRotationsToDial("0"), 0)

if __name__ == '__main__':
    unittest.main()
