import unittest
from solution import countValidWordOccurrences

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # "a-b c a--b" -> "a-b", "c", "a", "b"
        res = countValidWordOccurrences(["a-b ", "c a--b"], ["a-b", "a", "b", "c", "z"])
        self.assertEqual(res, [1, 1, 1, 1, 0])

if __name__ == '__main__':
    unittest.main()
