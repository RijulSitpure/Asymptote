from typing import List

class Solution:
    def countBattleships(self, board: List[List[str]]) -> int:
        count = 0
        m, n = len(board), len(board[0])
        for i in range(m):
            for j in range(n):
                if board[i][j] == "X":
                    if i > 0 and board[i - 1][j] == "X":
                        continue
                    if j > 0 and board[i][j - 1] == "X":
                        continue
                    count += 1
        return count

def test():
    sol = Solution()
    t1 = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]
    assert sol.countBattleships(t1) == 2, "test 1 failed"
    t2 = [["."]]
    assert sol.countBattleships(t2) == 0, "test 2 failed"
    print("✓ battleships-in-a-board passed")

if __name__ == "__main__":
    test()
