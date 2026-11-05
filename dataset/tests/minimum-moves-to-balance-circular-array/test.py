class Solution:
    def minMovesToBalance(self, nums: list[int]) -> int:
        n = len(nums)
        target = sum(nums) // n
        diff = [x - target for x in nums]
        
        pref = [0] * n
        cur = 0
        for i in range(n):
            cur += diff[i]
            pref[i] = cur
        
        pref.sort()
        med = pref[n // 2]
        return sum(abs(p - med) for p in pref)

def run_tests():
    sol = Solution()
    assert sol.minMovesToBalance([1, 2, 3]) == 1 # target 2: moves = 1
    assert sol.minMovesToBalance([3, 3, 3]) == 0
    assert sol.minMovesToBalance([0, 4]) == 2
    print("All tests passed for 3776.")

if __name__ == "__main__":
    run_tests()
