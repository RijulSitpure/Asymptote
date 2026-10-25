class Solution:
    def xorQueries(self, arr: list[int], queries: list[list[int]]) -> list[int]:
        pref = [0] * (len(arr) + 1)
        for i, x in enumerate(arr):
            pref[i + 1] = pref[i] ^ x
        return [pref[r + 1] ^ pref[l] for l, r in queries]

def test():
    sol = Solution()
    assert sol.xorQueries([1,3,4,8], [[0,1],[1,2],[0,3],[3,3]]) == [2,7,14,8], "test 1 failed"
    assert sol.xorQueries([4,8,2,10], [[2,3],[1,3],[0,0],[0,3]]) == [8,0,4,4], "test 2 failed"
    print("✓ xor-queries-of-a-subarray passed")

if __name__ == "__main__":
    test()
