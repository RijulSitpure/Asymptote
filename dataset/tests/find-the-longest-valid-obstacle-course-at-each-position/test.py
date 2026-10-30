import bisect

class Solution:
    def longestObstacleCourseAtEachPosition(self, obstacles: list[int]) -> list[int]:
        tails = []
        ans = []
        for x in obstacles:
            idx = bisect.bisect_right(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
            ans.append(idx + 1)
        return ans

def test_longest_obstacle_course():
    sol = Solution()
    assert sol.longestObstacleCourseAtEachPosition([1, 2, 3, 2]) == [1, 2, 3, 3]
    assert sol.longestObstacleCourseAtEachPosition([2, 2, 1]) == [1, 2, 1]
    assert sol.longestObstacleCourseAtEachPosition([3, 1, 5, 6, 4, 2]) == [1, 1, 2, 3, 2, 2]

