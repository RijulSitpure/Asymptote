class Solution:
    def minDays(self, bloomDay: list[int], m: int, k: int) -> int:
        if m * k > len(bloomDay):
            return -1
        def canMake(day):
            bouquets = 0
            flowers = 0
            for b in bloomDay:
                if b <= day:
                    flowers += 1
                    if flowers == k:
                        bouquets += 1
                        flowers = 0
                else:
                    flowers = 0
            return bouquets >= m
        low, high = min(bloomDay), max(bloomDay)
        ans = -1
        while low <= high:
            mid = (low + high) // 2
            if canMake(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def test():
    sol = Solution()
    assert sol.minDays([1,10,3,10,2], 3, 1) == 3, "test 1 failed"
    assert sol.minDays([1,10,3,10,2], 3, 2) == -1, "test 2 failed"
    assert sol.minDays([7,7,7,7,12,7,7], 2, 3) == 12, "test 3 failed"
    print("✓ minimum-number-of-days-to-make-m-bouquets passed")

if __name__ == "__main__":
    test()
