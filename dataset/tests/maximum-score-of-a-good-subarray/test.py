class Solution:
    def maximumScore(self, nums: list[int], k: int) -> int:
        n = len(nums)
        l, r = k, k
        min_val = nums[k]
        ans = min_val

        while l > 0 or r < n - 1:
            left_val = nums[l - 1] if l > 0 else -1
            right_val = nums[r + 1] if r < n - 1 else -1
            if left_val >= right_val:
                l -= 1
                min_val = min(min_val, nums[l])
            else:
                r += 1
                min_val = min(min_val, nums[r])
            ans = max(ans, min_val * (r - l + 1))

        return ans

def test():
    sol = Solution()
    assert sol.maximumScore([1,4,3,7,4,5], 3) == 15
    assert sol.maximumScore([5,5,4,5,4,1,1,1], 0) == 20

    print("✓ maximum-score-of-a-good-subarray passed")

if __name__ == '__main__':
    test()
