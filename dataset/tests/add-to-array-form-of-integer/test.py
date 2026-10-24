from typing import List

class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        res = []
        i = len(num) - 1
        while i >= 0 or k > 0:
            if i >= 0:
                k += num[i]
                i -= 1
            res.append(k % 10)
            k //= 10
        return res[::-1]

def test():
    sol = Solution()
    assert sol.addToArrayForm([1,2,0,0], 34) == [1,2,3,4], "test 1 failed"
    assert sol.addToArrayForm([2,7,4], 181) == [4,5,5], "test 2 failed"
    assert sol.addToArrayForm([2,1,5], 806) == [1,0,2,1], "test 3 failed"
    print("✓ add-to-array-form-of-integer passed")

if __name__ == "__main__":
    test()
