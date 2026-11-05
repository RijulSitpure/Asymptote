class Solution:
    def countDistinctSubarrays(self, nums: list[int], k: int) -> int:
        n = len(nums)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + nums[i]
        distinct_subarrays = set()
        for i in range(n):
            for j in range(i, n):
                if (pref[j + 1] - pref[i]) % k == 0:
                    distinct_subarrays.add(tuple(nums[i:j + 1]))
        return len(distinct_subarrays)

def run_tests():
    sol = Solution()
    assert sol.countDistinctSubarrays([1, 2, 3, 4, 5], 5) == 4
    assert sol.countDistinctSubarrays([1, 4, 5], 5) == 3
    assert sol.countDistinctSubarrays([5], 5) == 1
    print("All tests passed for 3729.")

if __name__ == "__main__":
    run_tests()