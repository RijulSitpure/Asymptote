class Solution:
    def findRotation(self, mat: list[list[int]], target: list[list[int]]) -> bool:
        for _ in range(4):
            if mat == target:
                return True
            mat = [list(row) for row in zip(*mat[::-1])]
        return False

def test():
    sol = Solution()
    assert sol.findRotation([[0,1],[1,0]], [[1,0],[0,1]]) is True
    assert sol.findRotation([[0,1],[1,1]], [[1,0],[0,1]]) is False
    assert sol.findRotation([[0,0,0],[0,1,0],[1,1,1]], [[1,1,1],[0,1,0],[0,0,0]]) is True

if __name__ == '__main__':
    test()
