class Solution:
    def unhappyFriends(self, n: int, preferences: list[list[int]], pairs: list[list[int]]) -> int:
        rank = [[0] * n for _ in range(n)]
        for i in range(n):
            for r, friend in enumerate(preferences[i]):
                rank[i][friend] = r
        pair_of = {}
        for x, y in pairs:
            pair_of[x] = y
            pair_of[y] = x
        unhappy = 0
        for x in range(n):
            y = pair_of[x]
            is_unhappy = False
            for u in preferences[x]:
                if u == y:
                    break
                v = pair_of[u]
                if rank[u][x] < rank[u][v]:
                    is_unhappy = True
                    break
            if is_unhappy:
                unhappy += 1
        return unhappy

def test():
    sol = Solution()
    assert sol.unhappyFriends(4, [[1, 2, 3], [3, 2, 0], [3, 1, 0], [1, 2, 0]], [[0, 1], [2, 3]]) == 2, "test 1 failed"
    assert sol.unhappyFriends(2, [[1], [0]], [[1, 0]]) == 0, "test 2 failed"
    assert sol.unhappyFriends(4, [[1, 3, 2], [2, 3, 0], [1, 3, 0], [0, 2, 1]], [[1, 3], [0, 2]]) == 4, "test 3 failed"
    print("✓ count-unhappy-friends passed")

if __name__ == "__main__":
    test()
