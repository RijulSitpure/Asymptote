class Solution:
    def maxLength(self, ribbons: list[int], k: int) -> int:
        low, high = 1, max(ribbons)
        ans = 0

        while low <= high:
            mid = (low + high) // 2
            total = sum(r // mid for r in ribbons)
            if total >= k:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans

def test():
    sol = Solution()
    assert sol.maxLength([9,7,5], 3) == 5
    assert sol.maxLength([7,5,9], 4) == 4
    assert sol.maxLength([5,7,9], 22) == 0

if __name__ == '__main__':
    test()
