class Solution:
    def sortMatrix(self, grid: list[list[int]]) -> list[list[int]]:
        n = len(grid)
        diagonals = {}
        for i in range(n):
            for j in range(n):
                key = i - j
                if key not in diagonals:
                    diagonals[key] = []
                diagonals[key].append(grid[i][j])
                
        for k in diagonals:
            diagonals[k].sort(reverse=(k >= 0))
            
        for i in range(n):
            for j in range(n):
                grid[i][j] = diagonals[i - j].pop(0)
                
        return grid
