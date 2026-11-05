import bisect

class Solution:
    def maxDistance(self, side: int, points: list[list[int]], k: int) -> int:
        nums = []
        for x, y in points:
            if y == 0:
                nums.append(x)
            elif x == side:
                nums.append(side + y)
            elif y == side:
                nums.append(2 * side + (side - x))
            else:
                nums.append(3 * side + (side - y))
        
        nums = sorted(list(set(nums)))
        n = len(nums)
        P = 4 * side
        arr = nums + [x + P for x in nums]

        def check(d: int) -> bool:
            limit = nums[0] + P // k
            for i in range(n):
                if nums[i] > limit:
                    break
                last = arr[i]
                valid = True
                for _ in range(k - 1):
                    idx = bisect.bisect_left(arr, last + d, i, i + n)
                    if idx >= i + n:
                        valid = False
                        break
                    last = arr[idx]
                if valid and (arr[i] + P - last >= d):
                    return True
            return False

        low, high = 1, side
        ans = 0
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans

def test_maximize_the_distance_between_points_on_a_square():
    sol = Solution()
    assert sol.maxDistance(2, [[0,2],[2,0],[2,2],[0,0]], 4) == 2
    assert sol.maxDistance(2, [[0,0],[1,2],[2,0],[2,2],[2,1]], 4) == 1
    assert sol.maxDistance(2, [[0,0],[0,1],[0,2],[1,2],[2,0],[2,2],[2,1]], 5) == 1

if __name__ == '__main__':
    test_maximize_the_distance_between_points_on_a_square()
    print('All tests passed.')
