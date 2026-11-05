class Solution:
    def countCenteredSubarrays(self, nums: list[int]) -> int:
        n = len(nums)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + nums[i]
        
        count = 0
        for c in range(n):
            max_r = min(c, n - 1 - c)
            for r in range(max_r + 1):
                length = 2 * r + 1
                sub_sum = pref[c + r + 1] - pref[c - r]
                if sub_sum == length * nums[c]:
                    count += 1
        return count

def run_tests():
    sol = Solution()
    # [1, 2, 3]: length 1 centered: [1], [2], [3] (3). Length 3: [1, 2, 3] sum=6 = 3 * 2 (1). Total = 4.
    assert sol.countCenteredSubarrays([1, 2, 3]) == 4
    assert sol.countCenteredSubarrays([5]) == 1
    print("All tests passed for 3804.")

if __name__ == "__main__":
    run_tests()
