class Solution:
    def minimumSize(self, nums: list[int], maxOperations: int) -> int:
        low, high = 1, max(nums)
        ans = high
        while low <= high:
            mid = (low + high) // 2
            ops = sum((x - 1) // mid for x in nums)
            if ops <= maxOperations:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def test():
    sol = Solution()
    assert sol.minimumSize([9], 2) == 3
    assert sol.minimumSize([2,4,8,2], 4) == 2
    assert sol.minimumSize([7,17], 2) == 7

    print("✓ minimum-limit-of-balls-in-a-bag passed")

if __name__ == '__main__':
    test()
