class Solution:
    def canMakeSquare(self, grid: list[list[str]]) -> bool:
        for r in range(2):
            for c in range(2):
                black = 0
                for dr in range(2):
                    for dc in range(2):
                        if grid[r + dr][c + dc] == 'B':
                            black += 1
                if black != 2:
                    return True
        return False
