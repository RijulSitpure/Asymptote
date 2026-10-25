class Solution:
    def rotateTheBox(self, box: list[list[str]]) -> list[list[str]]:
        m, n = len(box), len(box[0])
        for r in range(m):
            empty_slot = n - 1
            for c in range(n - 1, -1, -1):
                if box[r][c] == '*':
                    empty_slot = c - 1
                elif box[r][c] == '#':
                    box[r][c] = '.'
                    box[r][empty_slot] = '#'
                    empty_slot -= 1

        rotated = [[None] * m for _ in range(n)]
        for r in range(m):
            for c in range(n):
                rotated[c][m - 1 - r] = box[r][c]

        return rotated

def test():
    sol = Solution()
    b1 = [["#",".","#"]]
    assert sol.rotateTheBox(b1) == [["."],["#"],["#"]]
    b2 = [["#",".","*","."],["#","#","*","."]]
    assert sol.rotateTheBox(b2) == [["#","."],["#","#"],["*","*"],[".","."]]

if __name__ == '__main__':
    test()
