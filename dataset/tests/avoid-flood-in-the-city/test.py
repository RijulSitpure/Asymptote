import bisect

class Solution:
    def avoidFlood(self, rains: list[int]) -> list[int]:
        n = len(rains)
        ans = [1] * n
        full = {}
        dry_days = []
        for i, lake in enumerate(rains):
            if lake == 0:
                dry_days.append(i)
            else:
                ans[i] = -1
                if lake in full:
                    prev_day = full[lake]
                    idx = bisect.bisect_right(dry_days, prev_day)
                    if idx == len(dry_days):
                        return []
                    dry_day = dry_days.pop(idx)
                    ans[dry_day] = lake
                full[lake] = i
        return ans

def test():
    sol = Solution()
    assert sol.avoidFlood([1,2,3,4]) == [-1,-1,-1,-1], "test 1 failed"
    assert sol.avoidFlood([1,2,0,0,2,1]) == [-1,-1,2,1,-1,-1], "test 2 failed"
    assert sol.avoidFlood([1,2,0,1,2]) == [], "test 3 failed"
    print("✓ avoid-flood-in-the-city passed")

if __name__ == "__main__":
    test()
