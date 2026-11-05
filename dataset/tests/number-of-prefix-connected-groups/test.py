import unittest
from solution import prefixConnectedGroups

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(prefixConnectedGroups(["apple", "apply", "banana"], 3), 2) # "app", "ban"
        self.assertEqual(prefixConnectedGroups(["car", "cat", "card"], 2), 1) # "ca"

if __name__ == '__main__':
    unittest.main()
