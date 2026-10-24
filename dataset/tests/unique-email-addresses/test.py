from typing import List

class Solution:
    def numUniqueEmails(self, emails: List[str]) -> int:
        seen = set()
        for email in emails:
            local, domain = email.split("@")
            local = local.split("+")[0].replace(".", "")
            seen.add(f"{local}@{domain}")
        return len(seen)

def test():
    sol = Solution()
    e1 = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
    assert sol.numUniqueEmails(e1) == 2, "test 1 failed"
    e2 = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
    assert sol.numUniqueEmails(e2) == 3, "test 2 failed"
    print("✓ unique-email-addresses passed")

if __name__ == "__main__":
    test()
