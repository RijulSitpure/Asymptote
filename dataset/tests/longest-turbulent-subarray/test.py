from typing import List

class Solution:
    def maxTurbulenceSize(self, arr: List[int]) -> int:
        n = len(arr)
        if n <= 1:
            return n
        max_len = 1
        clen = 1
        prev_sign = 0
        for i in range(n - 1):
            sign = 1 if arr[i] > arr[i + 1] else (-1 if arr[i] < arr[i + 1] else 0)
            if sign == 0:
                clen = 1
            elif sign == -prev_sign:
                clen += 1
            else:
                clen = 2
            prev_sign = sign
            max_len = max(max_len, clen)
        return max_len

def test():
    sol = Solution()
    assert sol.maxTurbulenceSize([9,4,2,10,7,8,8,1,9]) == 5, "test 1 failed"
    assert sol.maxTurbulenceSize([4,8,12,16]) == 2, "test 2 failed"
    assert sol.maxTurbulenceSize([100]) == 1, "test 3 failed"
    print("✓ longest-turbulent-subarray passed")

if __name__ == "__main__":
    test()
