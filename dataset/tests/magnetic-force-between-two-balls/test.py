class Solution:
    def maxDistance(self, position: list[int], m: int) -> int:
        position.sort()
        def canPlace(d):
            count = 1
            last = position[0]
            for p in position[1:]:
                if p - last >= d:
                    count += 1
                    last = p
                    if count == m:
                        return True
            return False
        low, high = 1, position[-1] - position[0]
        ans = 1
        while low <= high:
            mid = (low + high) // 2
            if canPlace(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans

def test():
    sol = Solution()
    assert sol.maxDistance([1,2,3,4,7], 3) == 3, "test 1 failed"
    assert sol.maxDistance([5,4,3,2,1,1000000000], 2) == 999999999, "test 2 failed"
    print("✓ magnetic-force-between-two-balls passed")

if __name__ == "__main__":
    test()
