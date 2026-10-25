class Solution:
    def queensAttacktheKing(self, queens: list[list[int]], king: list[int]) -> list[list[int]]:
        q_set = {(r, c) for r, c in queens}
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
        res = []
        for dr, dc in dirs:
            r, c = king[0] + dr, king[1] + dc
            while 0 <= r < 8 and 0 <= c < 8:
                if (r, c) in q_set:
                    res.append([r, c])
                    break
                r += dr
                c += dc
        return res

def test():
    sol = Solution()
    q1 = [[0,1],[1,0],[4,0],[0,4],[3,3],[2,4]]
    res1 = sol.queensAttacktheKing(q1, [0, 0])
    assert sorted(res1) == [[0, 1], [1, 0], [3, 3]], "test 1 failed"
    print("✓ queens-that-can-attack-the-king passed")

if __name__ == "__main__":
    test()
