import unittest
from solution import rearrangeToAvoidPair

class TestSolution(unittest.TestCase):
    def test_basic(self):
        s = "ab"
        res = rearrangeToAvoidPair(s, "ab")
        self.assertEqual(res, "ba")
        self.assertNotIn("ab", res)

if __name__ == '__main__':
    unittest.main()
