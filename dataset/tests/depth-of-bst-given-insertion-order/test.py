import bisect

class Solution:
    def maxDepthBST(self, order: list[int]) -> int:
        inserted = []
        depth = {}
        max_d = 0

        for x in order:
            idx = bisect.bisect_left(inserted, x)
            pred_d = depth[inserted[idx - 1]] if idx > 0 else 0
            succ_d = depth[inserted[idx]] if idx < len(inserted) else 0
            d = 1 + max(pred_d, succ_d)
            depth[x] = d
            if d > max_d:
                max_d = d
            inserted.insert(idx, x)

        return max_d

def test():
    sol = Solution()
    assert sol.maxDepthBST([2,1,4,3]) == 3
    assert sol.maxDepthBST([2,1,3,4]) == 3
    assert sol.maxDepthBST([1,2,3,4]) == 4

if __name__ == '__main__':
    test()
