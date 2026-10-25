class Solution:
    def minDifference(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        n = len(nums)
        pref = [[0] * 101 for _ in range(n + 1)]
        for i, x in enumerate(nums):
            for v in range(1, 101):
                pref[i + 1][v] = pref[i][v]
            pref[i + 1][x] += 1

        ans = []
        for l, r in queries:
            prev = -1
            min_diff = float('inf')
            for v in range(1, 101):
                if pref[r + 1][v] - pref[l][v] > 0:
                    if prev != -1:
                        min_diff = min(min_diff, v - prev)
                    prev = v
            ans.append(min_diff if min_diff != float('inf') else -1)

        return ans

def test():
    sol = Solution()
    assert sol.minDifference([1,3,4,8], [[0,1],[1,2],[2,3],[0,3]]) == [2,1,4,1]
    assert sol.minDifference([4,5,2,2,7,10], [[2,3],[0,2],[0,5],[3,5]]) == [-1,1,1,3]

if __name__ == '__main__':
    test()
