class Solution:
    def canDivideIntoSubsequences(self, nums: list[int], k: int) -> bool:
        max_freq = 0
        curr_freq = 0
        prev = None
        for x in nums:
            if x == prev:
                curr_freq += 1
            else:
                curr_freq = 1
                prev = x
            if curr_freq > max_freq:
                max_freq = curr_freq
        return len(nums) >= max_freq * k

def test():
    sol = Solution()
    assert sol.canDivideIntoSubsequences([1,2,2,3,3,4,4], 3) is True, "test 1 failed"
    assert sol.canDivideIntoSubsequences([5,6,6,7], 3) is False, "test 2 failed"
    print("✓ divide-array-into-increasing-sequences passed")

if __name__ == "__main__":
    test()
