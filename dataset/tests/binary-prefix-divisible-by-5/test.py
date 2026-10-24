from typing import List

class Solution:
    def prefixesDivBy5(self, nums: List[int]) -> List[bool]:
        cur = 0
        res = []
        for bit in nums:
            cur = (cur * 2 + bit) % 5
            res.append(cur == 0)
        return res

def test():
    sol = Solution()
    assert sol.prefixesDivBy5([0,1,1]) == [True, False, False], "test 1 failed"
    assert sol.prefixesDivBy5([1,1,1]) == [False, False, False], "test 2 failed"
    print("✓ binary-prefix-divisible-by-5 passed")

if __name__ == "__main__":
    test()
