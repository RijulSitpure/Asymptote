from typing import List

class Solution:
    def subarrayBitwiseORs(self, arr: List[int]) -> int:
        res = set()
        cur = set()
        for x in arr:
            cur = {x | y for y in cur} | {x}
            res |= cur
        return len(res)

def test():
    sol = Solution()
    assert sol.subarrayBitwiseORs([0]) == 1, "test 1 failed"
    assert sol.subarrayBitwiseORs([1, 1, 2]) == 3, "test 2 failed"
    assert sol.subarrayBitwiseORs([1, 2, 4]) == 6, "test 3 failed"
    print("✓ bitwise-ors-of-subarrays passed")

if __name__ == "__main__":
    test()
