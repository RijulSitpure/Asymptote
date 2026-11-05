class Solution:
    def pathExistenceQueries(self, n: int, nums: list[int], maxDiff: int, queries: list[list[int]]) -> list[int]:
        sorted_pairs = sorted((nums[i], i) for i in range(n))
        sorted_nums = [p[0] for p in sorted_pairs]
        index_map = {p[1]: idx for idx, p in enumerate(sorted_pairs)}

        max_level = n.bit_length() + 1
        jump = [[0] * max_level for _ in range(n)]
        right = 0
        for i in range(n):
            while right + 1 < n and sorted_nums[right + 1] - sorted_nums[i] <= maxDiff:
                right += 1
            jump[i][0] = right
        for level in range(1, max_level):
            for i in range(n):
                jump[i][level] = jump[jump[i][level - 1]][level - 1]

        ans = []
        for q in queries:
            u, v = index_map[q[0]], index_map[q[1]]
            if u == v:
                ans.append(0)
                continue
            l, r = min(u, v), max(u, v)
            steps = 0
            for level in range(max_level - 1, -1, -1):
                if jump[l][level] < r:
                    l = jump[l][level]
                    steps += (1 << level)
            if jump[l][0] >= r:
                ans.append(steps + 1)
            else:
                ans.append(-1)
        return ans

def run_tests():
    s = Solution()
    assert s.pathExistenceQueries(3, [1, 3, 5], 2, [[0, 2]]) == [2]
    assert s.pathExistenceQueries(3, [1, 10, 20], 2, [[0, 2]]) == [-1]
    print("All tests passed for path-existence-queries-in-a-graph-ii")

if __name__ == '__main__':
    run_tests()
