from collections import defaultdict

class Solution:
    def groupThePeople(self, groupSizes: list[int]) -> list[list[int]]:
        buckets = defaultdict(list)
        res = []
        for i, sz in enumerate(groupSizes):
            buckets[sz].append(i)
            if len(buckets[sz]) == sz:
                res.append(buckets.pop(sz))
        return res

def test():
    sol = Solution()
    res1 = sol.groupThePeople([3,3,3,3,3,1,3])
    assert len(res1) == 3, "test 1 failed"
    print("✓ group-the-people-given-the-group-size-they-belong-to passed")

if __name__ == "__main__":
    test()
