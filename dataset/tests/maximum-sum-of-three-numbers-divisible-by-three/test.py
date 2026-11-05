class Solution:
    def maxThreeSumDivisibleByThree(self, nums: list[int]) -> int:
        r0 = sorted([x for x in nums if x % 3 == 0], reverse=True)
        r1 = sorted([x for x in nums if x % 3 == 1], reverse=True)
        r2 = sorted([x for x in nums if x % 3 == 2], reverse=True)
        
        ans = -1
        if len(r0) >= 3:
            ans = max(ans, r0[0] + r0[1] + r0[2])
        if len(r1) >= 3:
            ans = max(ans, r1[0] + r1[1] + r1[2])
        if len(r2) >= 3:
            ans = max(ans, r2[0] + r2[1] + r2[2])
        if len(r0) >= 1 and len(r1) >= 1 and len(r2) >= 1:
            ans = max(ans, r0[0] + r1[0] + r2[0])
        return ans

def run_tests():
    sol = Solution()
    assert sol.maxThreeSumDivisibleByThree([3, 6, 5, 1, 8]) == 15
    assert sol.maxThreeSumDivisibleByThree([4]) == -1
    assert sol.maxThreeSumDivisibleByThree([1, 1, 1]) == 3
    print("All tests passed for 3780.")

if __name__ == "__main__":
    run_tests()
