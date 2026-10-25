class Solution:
    def numOfSubarrays(self, arr: list[int]) -> int:
        MOD = 10**9 + 7
        even = 1
        odd = 0
        cur = 0
        ans = 0
        for x in arr:
            cur += x
            if cur % 2 == 1:
                ans = (ans + even) % MOD
                odd += 1
            else:
                ans = (ans + odd) % MOD
                even += 1
        return ans

def test():
    sol = Solution()
    assert sol.numOfSubarrays([1,3,5]) == 4, "test 1 failed"
    assert sol.numOfSubarrays([2,4,6]) == 0, "test 2 failed"
    assert sol.numOfSubarrays([1,2,3,4,5,6,7]) == 16, "test 3 failed"
    print("✓ number-of-sub-arrays-with-odd-sum passed")

if __name__ == "__main__":
    test()
