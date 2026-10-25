class Solution:
    def maximizeSweetness(self, sweetness: list[int], k: int) -> int:
        def can_divide(target: int) -> bool:
            pieces = 0
            cur = 0
            for s in sweetness:
                cur += s
                if cur >= target:
                    pieces += 1
                    cur = 0
            return pieces >= k + 1
            
        low = 1
        high = sum(sweetness) // (k + 1)
        ans = 1
        while low <= high:
            mid = (low + high) // 2
            if can_divide(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans

def test():
    sol = Solution()
    assert sol.maximizeSweetness([1, 2, 3, 4, 5, 6, 7, 8, 9], 5) == 6, "test 1 failed"
    assert sol.maximizeSweetness([5, 6, 7, 8, 9, 1, 2, 3, 4], 8) == 1, "test 2 failed"
    assert sol.maximizeSweetness([1, 2, 2, 1, 2, 2, 1, 2, 2], 2) == 5, "test 3 failed"
    print("✓ divide-chocolate passed")

if __name__ == "__main__":
    test()
