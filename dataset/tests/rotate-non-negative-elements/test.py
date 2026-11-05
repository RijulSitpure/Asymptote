class Solution:
    def rotateNonNegative(self, nums: list[int], k: int) -> list[int]:
        indices = [i for i, x in enumerate(nums) if x >= 0]
        if not indices:
            return nums
        
        m = len(indices)
        k %= m
        vals = [nums[i] for i in indices]
        rotated = vals[-k:] + vals[:-k]
        
        res = list(nums)
        for idx, val in zip(indices, rotated):
            res[idx] = val
        return res

def run_tests():
    sol = Solution()
    # non-negative elements are [1, 2, 3] at indices 0, 2, 4. Rotate by 1 -> [3, 1, 2]
    assert sol.rotateNonNegative([1, -5, 2, -1, 3], 1) == [3, -5, 1, -1, 2]
    assert sol.rotateNonNegative([-1, -2], 1) == [-1, -2]
    print("All tests passed for 3819.")

if __name__ == "__main__":
    run_tests()
