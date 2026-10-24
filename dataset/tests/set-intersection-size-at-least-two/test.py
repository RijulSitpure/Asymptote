from typing import List

class Solution:
    def intersectionSizeTwo(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: (x[1], -x[0]))
        p1, p2 = -1, -1
        ans = 0

        for s, e in intervals:
            if s > p2:
                p1 = e - 1
                p2 = e
                ans += 2
            elif s > p1:
                p1 = p2
                p2 = e
                ans += 1

        return ans

def test():
    sol = Solution()
    assert sol.intersectionSizeTwo([[1, 3], [1, 4], [2, 5], [3, 5]]) == 3, "test 1 failed"
    assert sol.intersectionSizeTwo([[1, 2], [2, 3], [2, 4], [4, 5]]) == 5, "test 2 failed"
    print("✓ set-intersection-size-at-least-two passed")

if __name__ == "__main__":
    test()
