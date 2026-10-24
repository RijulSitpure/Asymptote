from collections import defaultdict
from typing import List

class Solution:
    def subdomainVisits(self, cpdomains: List[str]) -> List[str]:
        counts = defaultdict(int)
        for cp in cpdomains:
            count_str, domain = cp.split()
            count = int(count_str)
            parts = domain.split('.')
            for i in range(len(parts)):
                subdomain = ".".join(parts[i:])
                counts[subdomain] += count
        return [f"{count} {sub}" for sub, count in counts.items()]

def test():
    sol = Solution()
    res1 = set(sol.subdomainVisits(["9001 discuss.leetcode.com"]))
    exp1 = {"9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"}
    assert res1 == exp1, f"test 1 failed: {res1}"
    print("✓ subdomain-visit-count passed")

if __name__ == "__main__":
    test()
