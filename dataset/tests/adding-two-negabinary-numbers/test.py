from typing import List

class Solution:
    def addNegabinary(self, arr1: List[int], arr2: List[int]) -> List[int]:
        i, j = len(arr1) - 1, len(arr2) - 1
        carry = 0
        res = []
        while i >= 0 or j >= 0 or carry != 0:
            s = carry
            if i >= 0:
                s += arr1[i]
                i -= 1
            if j >= 0:
                s += arr2[j]
                j -= 1
            res.append(s & 1)
            carry = -(s >> 1)
        while len(res) > 1 and res[-1] == 0:
            res.pop()
        return res[::-1]

def test():
    sol = Solution()
    assert sol.addNegabinary([1,1,1,1,1], [1,0,1]) == [1,0,0,0,0], "test 1 failed"
    assert sol.addNegabinary([0], [0]) == [0], "test 2 failed"
    assert sol.addNegabinary([0], [1]) == [1], "test 3 failed"
    print("✓ adding-two-negabinary-numbers passed")

if __name__ == "__main__":
    test()
