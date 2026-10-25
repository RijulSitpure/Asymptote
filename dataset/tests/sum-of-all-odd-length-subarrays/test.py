class Solution:
    def sumOddLengthSubarrays(self, arr: list[int]) -> int:
        n = len(arr)
        ans = 0
        for i, x in enumerate(arr):
            total_subarrays = (i + 1) * (n - i)
            odd_subarrays = (total_subarrays + 1) // 2
            ans += x * odd_subarrays
        return ans

def test():
    sol = Solution()
    assert sol.sumOddLengthSubarrays([1,4,2,5,3]) == 58, "test 1 failed"
    assert sol.sumOddLengthSubarrays([1,2]) == 3, "test 2 failed"
    assert sol.sumOddLengthSubarrays([10,11,12]) == 66, "test 3 failed"
    print("✓ sum-of-all-odd-length-subarrays passed")

if __name__ == "__main__":
    test()
