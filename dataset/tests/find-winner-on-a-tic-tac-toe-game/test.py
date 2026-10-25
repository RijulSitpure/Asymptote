class Solution:
    def tictactoe(self, moves: list[list[int]]) -> str:
        rows = [0] * 3
        cols = [0] * 3
        diag = anti_diag = 0
        
        for i, (r, c) in enumerate(moves):
            val = 1 if i % 2 == 0 else -1
            rows[r] += val
            cols[c] += val
            if r == c:
                diag += val
            if r + c == 2:
                anti_diag += val
                
            if abs(rows[r]) == 3 or abs(cols[c]) == 3 or abs(diag) == 3 or abs(anti_diag) == 3:
                return 'A' if val == 1 else 'B'
                
        return 'Draw' if len(moves) == 9 else 'Pending'

def test():
    sol = Solution()
    assert sol.tictactoe([[0,0],[2,0],[1,1],[2,1],[2,2]]) == "A", "test 1 failed"
    assert sol.tictactoe([[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]]) == "B", "test 2 failed"
    assert sol.tictactoe([[0,0],[1,1],[2,0],[1,0],[1,2],[2,1],[0,1],[0,2],[2,2]]) == "Draw", "test 3 failed"
    print("✓ find-winner-on-a-tic-tac-toe-game passed")

if __name__ == "__main__":
    test()
