import unittest
from solution import numUniqueEmails

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(numUniqueEmails(["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]), 2)
        self.assertEqual(numUniqueEmails(["a@leetcode.com","b@leetcode.com","c@leetcode.com"]), 3)

if __name__ == '__main__':
    unittest.main()
