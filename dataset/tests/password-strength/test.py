import unittest
from solution import passwordStrength

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 'aA1!' -> 'a': 1, 'A': 2, '1': 3, '!': 5 -> 11
        self.assertEqual(passwordStrength("aA1!"), 11)

if __name__ == '__main__':
    unittest.main()
