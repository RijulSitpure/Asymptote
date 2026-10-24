from typing import List
from collections import Counter

class Solution:
    def rearrangeBarcodes(self, barcodes: List[int]) -> List[int]:
        counts = Counter(barcodes)
        sorted_items = sorted(counts.items(), key=lambda x: -x[1])
        n = len(barcodes)
        res = [0] * n
        idx = 0
        for code, freq in sorted_items:
            for _ in range(freq):
                if idx >= n:
                    idx = 1
                res[idx] = code
                idx += 2
        return res

def test():
    sol = Solution()
    res1 = sol.rearrangeBarcodes([1,1,1,2,2,2])
    for i in range(len(res1) - 1):
        assert res1[i] != res1[i + 1], "adjacent equal in test 1"
    print("✓ distant-barcodes passed")

if __name__ == "__main__":
    test()
