import bisect

class Solution:
    def makeArrayIncreasing(self, arr1: list[int], arr2: list[int]) -> int:
        arr2 = sorted(set(arr2))
        dp = {-1: 0}
        
        for x in arr1:
            nxt = {}
            for val, ops in dp.items():
                if x > val:
                    nxt[x] = min(nxt.get(x, float('inf')), ops)
                idx = bisect.bisect_right(arr2, val)
                if idx < len(arr2):
                    rep = arr2[idx]
                    nxt[rep] = min(nxt.get(rep, float('inf')), ops + 1)
            dp = nxt
            if not dp:
                return -1
        return min(dp.values())

def test():
    sol = Solution()
    assert sol.makeArrayIncreasing([1, 5, 3, 6, 7], [1, 3, 2, 4]) == 1, "test 1 failed"
    assert sol.makeArrayIncreasing([1, 5, 3, 6, 7], [4, 3, 1]) == 2, "test 2 failed"
    assert sol.makeArrayIncreasing([1, 5, 3, 6, 7], [1, 6, 3, 3]) == -1, "test 3 failed"
    print("✓ make-array-strictly-increasing passed")

if __name__ == "__main__":
    test()
