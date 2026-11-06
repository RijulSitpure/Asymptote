import unittest
from solution import mergeCloseCharacters

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(mergeCloseCharacters("deeedbbcccbdaa", 3), "aa")
        self.assertEqual(mergeCloseCharacters("abcd", 2), "abcd")

if __name__ == '__main__':
    unittest.main()
