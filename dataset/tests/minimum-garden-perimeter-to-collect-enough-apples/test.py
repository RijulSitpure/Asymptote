class Solution:
    def minimumPerimeter(self, neededApples: int) -> int:
        low = 1
        high = 1_000_000
        ans = high
        
        while low <= high:
            mid = (low + high) // 2
            total = 2 * mid * (mid + 1) * (2 * mid + 1)
            if total >= neededApples:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
                
        return ans * 8

def test_minimum_perimeter():
    sol = Solution()
    assert sol.minimumPerimeter(1) == 8
    assert sol.minimumPerimeter(13) == 16
    assert sol.minimumPerimeter(1000000000) == 5040

