class Solution:
    def reconstructMatrix(self, upper: int, lower: int, colsum: list[int]) -> list[list[int]]:
        n = len(colsum)
        row0 = [0] * n
        row1 = [0] * n
        
        for i in range(n):
            if colsum[i] == 2:
                row0[i] = 1
                row1[i] = 1
                upper -= 1
                lower -= 1
                
        for i in range(n):
            if colsum[i] == 1:
                if upper >= lower and upper > 0:
                    row0[i] = 1
                    upper -= 1
                elif lower > 0:
                    row1[i] = 1
                    lower -= 1
                else:
                    return []
                    
        if upper != 0 or lower != 0:
            return []
        return [row0, row1]

def test():
    sol = Solution()
    res1 = sol.reconstructMatrix(2, 1, [1, 1, 1])
    assert len(res1) == 2, "test 1 failed"
    assert sum(res1[0]) == 2 and sum(res1[1]) == 1, "test 1 sums failed"
    assert sol.reconstructMatrix(2, 3, [2, 2, 1, 1]) == [], "test 2 failed"
    print("✓ reconstruct-a-2-row-binary-matrix passed")

if __name__ == "__main__":
    test()
